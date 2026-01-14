let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

const cheerio = require('gulp-cheerio');
const he = require("he");
let fs = require("fs");

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        video: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        video: source_folder + "/img/**/*.{mp4,webm,mov,avi}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        video: source_folder + "/img/**/*.{mp4,webm,mov,avi}",
    },
    clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    svgSprite = require("gulp-svg-sprite"),
    fonter = require("gulp-fonter-2");

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(
            cheerio(function ($) {
                $('[data-gallery]').each(function () {
                    const folderName = $(this).attr('data-gallery');
                    const fullPath = `${source_folder}/img/${folderName}`;

                    if (!fs.existsSync(fullPath)) {
                        console.warn(`❗ Галерея '${folderName}' не найдена по пути: ${fullPath}`);
                        return;
                    }

                    const files = fs.readdirSync(fullPath).filter(file =>
                        /\.(jpe?g|png|svg|webp|gif|ico)$/i.test(file) &&
                        !file.startsWith('.') && file.trim() !== ''
                    );

                    files.forEach(file => {
                        if (!file || typeof file !== 'string') {
                            console.warn(`⚠️ Пропущен невалидный файл:`, file);
                            return;
                        }

                        const relativePath = `img/${folderName}/${file}`;
                        if (!relativePath || relativePath.includes('undefined') || relativePath.includes('null')) {
                            console.warn(`⚠️ Пропущен файл с некорректным именем: ${relativePath}`);
                            return;
                        }

                        const encodedPath = encodeURI(relativePath);
                        const $img = $('<img>')
                            .attr('src', encodedPath)
                            .attr('alt', file);

                        $(this).prepend($img);
                        console.log(`✅ Добавляется изображение: ${relativePath}`);
                    });
                });

                $('body *').each(function () {
                    const el = $(this);
                    if (el.children().length === 0 && el.html().trim() !== '') {
                        try {
                            el.html(he.decode(el.html()));
                        } catch (err) {
                            console.warn(`⚠️ Ошибка декодирования: ${el.html().slice(0, 30)}...`);
                        }
                    }
                });
            })
        )
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(browsersync.stream())
        .pipe(group_media())
        .pipe(autoprefixer({ grid: true, overrideBrowserslist: ["last 5 versions"], cascade: true }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(webp({ quality: 70, preserveMetadata: true, metadata: "all" }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    return src(path.src.fonts)
        .pipe(fonter({ formats: ['woff', 'woff2'] }))
        .pipe(dest(path.build.fonts));
}

function videos() {
    return src(path.src.video)
        .pipe(dest(path.build.video))
        .pipe(browsersync.stream());
}

gulp.task('otf2ttf', function () {
    return gulp.src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({ formats: ['ttf'] }))
        .pipe(dest(source_folder + '/fonts/'));
});

gulp.task('svgSprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg"
                }
            }
        }))
        .pipe(dest(path.build.img));
});

function fontsStyle() {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.')[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        });
    }
}

function cb() { }

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.video], videos);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, videos, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;