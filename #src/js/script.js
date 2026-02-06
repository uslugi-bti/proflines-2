document.addEventListener("DOMContentLoaded", function () {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
        document.querySelectorAll('.mission-hero, .services__img, .principles').forEach(el => {
            el.style.pointerEvents = 'none';
        });
        document.querySelectorAll('.mission-hero__img, .mission-hero-img__img, .services-img__icon, .principles__badge').forEach(el => {
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }

    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const openSubMenu = document.querySelector(".header-bottom__item>span");
    const heightServices = document.querySelector(".header-bottom__services");

    openSubMenu.addEventListener("click", function () {
        if (heightServices.classList.contains("open")) {
            heightServices.classList.remove("open");
            openSubMenu.classList.remove("open");
        } else {
            heightServices.classList.add("open");
            openSubMenu.classList.add("open");
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".header-bottom__item>span") && !event.target.closest(".header-bottom__services")) {
            heightServices.classList.remove("open");
            openSubMenu.classList.remove("open");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.which == 27) {
            heightServices.classList.remove("open");
            openSubMenu.classList.remove("open");
        }
    });

    const searchBody = document.querySelector(".header-bottom-search__body");
    const searchButton = document.querySelector(".header-bottom__search>button");

    searchButton.addEventListener("click", function () {
        if (searchBody.classList.contains("open")) {
            searchBody.classList.remove("open");
            searchBody.reset();
        } else {
            searchBody.classList.add("open");
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".header-bottom-search__body") && !event.target.closest(".header-bottom__search>button")) {
            searchBody.classList.remove("open");
            searchBody.reset();
        }
    });

    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const headerSidebar = document.querySelector(".header-sidebar");
    const headerMenu = document.querySelector(".header-bottom__menu");
    const headerList = document.querySelector(".header-bottom__list");

    headerMenu.addEventListener("click", function () {
        body.classList.toggle("lock");
        header.classList.toggle("active");
        headerSidebar.classList.toggle("active");
        headerList.classList.toggle("active");
        headerMenu.classList.toggle("active");
    });

    headerSidebar.addEventListener("click", function (event) {
        if (!event.target.closest(".header-sidebar__body")) {
            body.classList.remove("lock");
            header.classList.remove("active");
            headerSidebar.classList.remove("active");
            headerList.classList.remove("active");
            headerMenu.classList.remove("active");
        }
    });

    const sidebarItems = document.querySelectorAll(".header-sidebar__item");
    const headerBottomItems = document.querySelector(".header-bottom__items");
    const sidebarNav = document.querySelector(".header-sidebar__body");

    function moveSidebarItems() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (viewport_width <= 767) {
            for (let i = 0; i < sidebarItems.length; i++) {
                headerBottomItems.insertBefore(sidebarItems[i], headerBottomItems.children[headerBottomItems.children.length + i]);
            }
        } else {
            for (let i = 0; i < sidebarItems.length; i++) {
                sidebarNav.insertBefore(sidebarItems[i], sidebarNav.children[i]);
            }
        }
    }
    moveSidebarItems();
    window.addEventListener("resize", moveSidebarItems);

    function colorHeader() {
        if (window.scrollY > 70) {
            header.classList.add("color");
        } else {
            header.classList.remove("color");
        }
    }
    colorHeader();
    window.addEventListener("scroll", colorHeader);
    window.addEventListener("resize", colorHeader);

    const breadcrump = document.querySelector(".breadcrump");

    function breadcrumpPadding() {
        let headerHeight = header.clientHeight;
        breadcrump.style.paddingTop = headerHeight + 15 + "px";
    }
    breadcrumpPadding();
    window.addEventListener("resize", breadcrumpPadding);

    if (document.querySelector(".services")) {
        const servicesItems = document.querySelectorAll(".services .columns__item");
        const servicesButton = document.querySelector(".services__button > button");
        const servicesButtonTextBefore = servicesButton.innerHTML;
        const servicesButtonTextAfter = servicesButton.id;
        const servicesCount = Number(document.querySelector(".services__body").dataset.count);

        function hideServices() {
            for (let i = servicesCount; i < servicesItems.length; i++) {
                servicesItems[i].style.display = "none";
            }
        }

        function showServices() {
            for (let i = 0; i < servicesItems.length; i++) {
                servicesItems[i].style.display = "block";
            }
        }
        hideServices();
        servicesButton.addEventListener("click", function () {
            if (servicesButton.classList.contains("show")) {
                hideServices();
                servicesButton.innerHTML = servicesButtonTextBefore;
                servicesButton.classList.remove("show");
            } else {
                showServices();
                servicesButton.innerHTML = servicesButtonTextAfter;
                servicesButton.classList.add("show");
            }
        });
    }

    if (document.querySelector('.portfolio__body.swiper')) {
        const swiper = new Swiper('.portfolio__body.swiper', {
            slidesPerView: 'auto',
            spaceBetween: 32,
            centeredSlides: false,
            loop: true,
            speed: 600,
            grabCursor: true,
            resistance: false,
            resistanceRatio: 0,
            watchOverflow: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: false,
            longSwipes: true,
            longSwipesRatio: 0.3,
            longSwipesMs: 300,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                320: {
                    spaceBetween: 16,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 100,
                },
                768: {
                    spaceBetween: 32,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 200,
                },
                1024: {
                    spaceBetween: 32,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 300,
                }
            }
        });

        const swiperContainer = document.querySelector('.portfolio__body');

        swiperContainer.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();

                if (e.deltaX > 0) {
                    swiper.slideNext();
                } else {
                    swiper.slidePrev();
                }
            }
        }, { passive: false });

        swiperContainer.addEventListener('touchmove', (e) => {
            if (Math.abs(e.touches[0].clientX - e.touches[1]?.clientX || 0) > 10) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    if (document.querySelector(".team")) {
        const teamPoints = document.querySelectorAll(".team-img__point");
        const teamPointButtons = document.querySelectorAll(".team-img__point > button");
        const teamPointBadges = document.querySelectorAll(".team-img__badge");
        const teamImg = document.querySelector(".team__img");

        function checkBadgePosition(badge, point) {
            const imgRect = teamImg.getBoundingClientRect();
            const pointRect = point.getBoundingClientRect();

            const pointLeftPercent = parseFloat(point.style.left);
            const pointLeftPx = (pointLeftPercent / 100) * imgRect.width;

            const badgeWidth = teamPointBadges[0].clientWidth;

            if (pointLeftPx + badgeWidth > imgRect.width) {
                badge.classList.add('right-aligned');
            } else {
                badge.classList.remove('right-aligned');
            }
        }

        function initBadgePositions() {
            for (let i = 0; i < teamPointBadges.length; i++) {
                checkBadgePosition(teamPointBadges[i], teamPoints[i]);
            }
        }

        initBadgePositions();

        for (let i = 0; i < teamPointBadges.length; i++) {
            teamPointButtons[i].addEventListener("click", function () {
                if (teamPointBadges[i].classList.contains("open")) {
                    teamPointBadges[i].classList.remove("open");
                    teamPoints[i].style.zIndex = "2";
                } else {
                    checkBadgePosition(teamPointBadges[i], teamPoints[i]);

                    for (let i = 0; i < teamPointBadges.length; i++) {
                        teamPointBadges[i].classList.remove("open");
                        teamPoints[i].style.zIndex = "2";
                    }
                    teamPointBadges[i].classList.add("open");
                    teamPoints[i].style.zIndex = "5";
                }
            });
        }

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".team-img__point > button") && !event.target.closest(".team-img__badge")) {
                for (let i = 0; i < teamPointBadges.length; i++) {
                    teamPointBadges[i].classList.remove("open");
                    teamPoints[i].style.zIndex = "2";
                }
            }
        });

        window.addEventListener('resize', initBadgePositions);
    }

    if (document.querySelector(".faq__body")) {
        const showAllButton = document.querySelector('.faq__button button');
        const faqColumns = document.querySelectorAll('.faq__column');
        const allFaqItems = document.querySelectorAll('.faq__item');

        if (document.querySelector(".faq__button")) {
            const showAllButtonBefore = showAllButton.textContent;
            const showAllButtonAfter = showAllButton.id;

            const itemsPerColumn = [];
            faqColumns.forEach(column => {
                const items = column.querySelectorAll('.faq__item');
                itemsPerColumn.push(items);
            });

            itemsPerColumn.forEach(items => {
                items.forEach((item, index) => {
                    if (index >= 3) {
                        item.style.display = 'none';
                    }
                });
            });

            showAllButton.textContent = showAllButtonBefore;
            let isExpanded = false;

            function toggleFaqVisibility() {
                if (!isExpanded) {
                    allFaqItems.forEach(item => {
                        item.style.display = 'block';
                    });
                    showAllButton.textContent = showAllButtonAfter;
                    isExpanded = true;
                } else {
                    itemsPerColumn.forEach(items => {
                        items.forEach((item, index) => {
                            if (index >= 3) {
                                item.style.display = 'none';
                            } else {
                                item.style.display = 'block';
                            }
                        });
                    });
                    showAllButton.textContent = showAllButtonBefore;
                    isExpanded = false;
                }
            }

            showAllButton.addEventListener('click', toggleFaqVisibility);
        }

        allFaqItems.forEach(item => {
            const title = item.querySelector('.faq-item__title');
            const text = item.querySelector('.faq-item__text');
            
            if (title && text) {
                title.addEventListener('click', function() {
                    this.classList.toggle('open');
                    text.classList.toggle('open');
                });
            }
        });
    }

    if (document.querySelector(".roi")) {
        const budget = document.getElementById('budget');
        const cpc = document.getElementById('cpc');
        const cr = document.getElementById('cr');
        const aov = document.getElementById('aov');

        const budgetVal = document.getElementById('budgetVal');
        const cpcVal = document.getElementById('cpcVal');
        const crVal = document.getElementById('crVal');
        const aovVal = document.getElementById('aovVal');

        const clicksEl = document.getElementById('clicks');
        const convEl = document.getElementById('conversions');
        const revenueEl = document.getElementById('revenue');
        const roiEl = document.getElementById('roi');

        function updateRangeFill(range) {
            const min = range.min ? range.min : 0;
            const max = range.max ? range.max : 100;
            const value = range.value;

            const percent = ((value - min) / (max - min)) * 100;
            range.style.backgroundSize = percent + '% 100%';
        }

        function calculate() {
            const budgetValue = +budget.value;
            const cpcValue = +cpc.value;
            const crValue = +cr.value / 100;
            const aovValue = +aov.value;

            const clicks = Math.floor(budgetValue / cpcValue);
            const conversions = Math.floor(clicks * crValue);
            const revenue = conversions * aovValue;
            const roi = ((revenue - budgetValue) / budgetValue) * 100;

            budgetVal.textContent = `${budgetValue.toLocaleString()} €`;
            cpcVal.textContent = `€${cpcValue.toFixed(2)}`;
            crVal.textContent = `${cr.value}%`;
            aovVal.textContent = `${aovValue.toLocaleString()} €`;

            clicksEl.textContent = clicks.toLocaleString();
            convEl.textContent = conversions.toLocaleString();
            revenueEl.textContent = `${revenue.toLocaleString()} €`;
            roiEl.textContent = `${roi >= 0 ? '+' : ''}${Math.round(roi)}%`;
        }

        document.querySelectorAll('.roi input[type="range"]').forEach(range => {
            updateRangeFill(range);
            range.addEventListener('input', () => {
                updateRangeFill(range);
                calculate();
            });
        });

        calculate();
    }


    const footerText = document.querySelector(".footer-bottom__text");
    const footerButton = document.querySelector(".footer-bottom__button > button");
    const footerButtonTextBefore = footerButton.innerHTML;
    const footerButtonTextAfter = footerButton.id;

    footerButton.addEventListener("click", function () {
        if (footerButton.classList.contains("open")) {
            footerButton.classList.remove("open");
            footerText.classList.remove("open");
            footerButton.innerHTML = footerButtonTextBefore;
        } else {
            footerButton.classList.add("open");
            footerText.classList.add("open");
            footerButton.innerHTML = footerButtonTextAfter;
        }
    });

    if (document.querySelector(".services__img")) {
        const servicesImg = document.querySelector(".services__img");
        const servicesImgWrapper = document.querySelector(".services-img__parallax-container");

        function servicesImgPadding() {
            let headerHeight = header.clientHeight;
            let paddingValue = headerHeight - 40;

            servicesImg.style.paddingTop = paddingValue + "px";
            servicesImgWrapper.style.height = "calc(100% - " + paddingValue + "px)";
        }

        servicesImgPadding();
        window.addEventListener("resize", servicesImgPadding);

        if (servicesImg && !isTouchDevice) {
            let mouseX = 0;
            let mouseY = 0;
            let currentX = 0;
            let currentY = 0;

            function animateParallax() {
                currentX += (mouseX - currentX) * 0.1;
                currentY += (mouseY - currentY) * 0.1;

                const icons = servicesImg.querySelectorAll('.services-img__icon');

                if (icons.length >= 3) {
                    icons[0].style.transform = `translate(${currentX * 10}px, ${currentY * 10}px) rotate(-10deg)`;
                    icons[1].style.transform = `translate(${currentX * -8}px, ${currentY * 8}px) rotate(15deg)`;
                    icons[2].style.transform = `translate(${currentX * 6}px, ${currentY * -6}px) rotate(-10deg)`;
                }

                requestAnimationFrame(animateParallax);
            }

            servicesImg.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();

                mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            });

            servicesImg.addEventListener('mouseleave', function () {
                mouseX = 0;
                mouseY = 0;
            });

            animateParallax();
        }
    }

    function heightServicesHeight() {
        let currentHeight = header.clientHeight + 15;

        heightServices.style.maxHeight = "calc(100vh - " + currentHeight + "px)";
    }

    heightServicesHeight();
    window.addEventListener("resize", heightServicesHeight);

    if (document.querySelector(".portfolio__cover")) {
        const portfolioCover = document.querySelector(".portfolio__cover");
        const container = document.querySelector(".container");

        function portfolioCoverWidth() {
            let width = (window.innerWidth - container.clientWidth) / 2;
            portfolioCover.style.width = width + "px";
        }

        portfolioCoverWidth();
        window.addEventListener("resize", portfolioCoverWidth);
    }

    if (document.querySelector(".technical")) {
        const listItems = document.querySelectorAll('.technical-list__item');
        const contentSections = document.querySelectorAll('.technical-content__body');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const correspondingItem = document.querySelector(`.technical-list__item a[href="#${id}"]`)?.parentElement;

                if (correspondingItem) {
                    if (entry.isIntersecting) {
                        listItems.forEach(item => item.classList.remove('active'));
                        correspondingItem.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        contentSections.forEach(section => observer.observe(section));

        const handleScroll = function () {
            const scrollPosition = window.scrollY + 100;

            let currentSection = null;
            contentSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section;
                }
            });

            if (currentSection) {
                const id = currentSection.getAttribute('id');
                const correspondingItem = document.querySelector(`.technical-list__item a[href="#${id}"]`)?.parentElement;

                if (correspondingItem) {
                    listItems.forEach(item => item.classList.remove('active'));
                    correspondingItem.classList.add('active');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    const missionHeroBlocks = document.querySelectorAll('.mission-hero');

    if (missionHeroBlocks.length && !isTouchDevice) {
        function initParallaxBlock(missionHero) {
            const mainImage = missionHero.querySelector('.mission-hero__img');
            const parallaxImages = missionHero.querySelectorAll('.mission-hero-img__img');

            const settings = {
                mainImageIntensity: 0.05,
                elementsIntensity: 0.15,
                maxMovement: 30
            };

            function handleMouseMove(e) {
                const rect = missionHero.getBoundingClientRect();

                const mouseX = (e.clientX - rect.left) / rect.width * 2 - 1;
                const mouseY = (e.clientY - rect.top) / rect.height * 2 - 1;

                const clampedX = Math.max(-1, Math.min(1, mouseX));
                const clampedY = Math.max(-1, Math.min(1, mouseY));

                if (mainImage) {
                    const moveX = clampedX * settings.maxMovement * settings.mainImageIntensity;
                    const moveY = clampedY * settings.maxMovement * settings.mainImageIntensity;
                    mainImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                }

                parallaxImages.forEach((img, index) => {
                    const intensityMultiplier = 0.8 + (index * 0.1);
                    const elementIntensity = settings.elementsIntensity * intensityMultiplier;

                    const directionX = index % 2 === 0 ? 1 : -1;
                    const directionY = index % 3 === 0 ? 1 : -1;

                    const moveX = clampedX * settings.maxMovement * elementIntensity * directionX;
                    const moveY = clampedY * settings.maxMovement * elementIntensity * directionY;

                    img.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                });
            }

            function handleMouseLeave() {
                if (mainImage) {
                    mainImage.style.transform = 'translate3d(0, 0, 0)';
                    mainImage.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
                }

                parallaxImages.forEach(img => {
                    img.style.transform = 'translate3d(0, 0, 0)';
                    img.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
                });

                setTimeout(() => {
                    if (mainImage) {
                        mainImage.style.transition = 'transform 0.3s ease-out';
                    }
                    parallaxImages.forEach(img => {
                        img.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    });
                }, 700);
            }

            missionHero.addEventListener('mousemove', handleMouseMove);
            missionHero.addEventListener('mouseleave', handleMouseLeave);

            return {
                destroy: function () {
                    missionHero.removeEventListener('mousemove', handleMouseMove);
                    missionHero.removeEventListener('mouseleave', handleMouseLeave);

                    if (mainImage) {
                        mainImage.style.transform = 'translate3d(0, 0, 0)';
                    }
                    parallaxImages.forEach(img => {
                        img.style.transform = 'translate3d(0, 0, 0)';
                    });
                }
            };
        }

        const parallaxInstances = [];

        missionHeroBlocks.forEach((block, index) => {
            const instance = initParallaxBlock(block);
            parallaxInstances.push(instance);

            block.dataset.parallaxInitialized = 'true';
            block.dataset.parallaxIndex = index;
        });

        window.destroyAllParallax = function () {
            parallaxInstances.forEach(instance => {
                if (instance && typeof instance.destroy === 'function') {
                    instance.destroy();
                }
            });
        };

        window.reinitParallax = function () {
            destroyAllParallax();
            missionHeroBlocks.forEach((block, index) => {
                const instance = initParallaxBlock(block);
                parallaxInstances[index] = instance;
            });
        };
    }

    function initParallaxBlockPrinciples(block, settings) {
        if (!block || isTouchDevice) return;

        const elements = block.querySelectorAll(settings.elementsSelector);

        function handleMouseMove(e) {
            const rect = block.getBoundingClientRect();

            const mouseX = (e.clientX - rect.left) / rect.width * 2 - 1;
            const mouseY = (e.clientY - rect.top) / rect.height * 2 - 1;

            const clampedX = Math.max(-1, Math.min(1, mouseX));
            const clampedY = Math.max(-1, Math.min(1, mouseY));

            elements.forEach((element, index) => {
                const intensity = settings.intensity * (0.8 + (index * 0.1));
                const directionX = index % 2 === 0 ? 1 : -1;
                const directionY = index % 3 === 0 ? 1 : -1;

                const moveX = clampedX * settings.maxMovement * intensity * directionX;
                const moveY = clampedY * settings.maxMovement * intensity * directionY;

                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        }

        function handleMouseLeave() {
            elements.forEach(element => {
                element.style.transform = 'translate3d(0, 0, 0)';
                element.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
            });

            setTimeout(() => {
                elements.forEach(element => {
                    element.style.transition = settings.transition;
                });
            }, 700);
        }

        block.addEventListener('mousemove', handleMouseMove);
        block.addEventListener('mouseleave', handleMouseLeave);
    }

    if (!isTouchDevice) {
        document.querySelectorAll('.principles').forEach(block => {
            initParallaxBlockPrinciples(block, {
                elementsSelector: '.principles__badge',
                intensity: 0.15,
                maxMovement: 30,
                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            });
        });
    }

    class HeroAnimation {
        constructor() {
            this.heroSection = document.querySelector('.service-hero');
            this.graphElement = document.querySelector('.service-hero-img__img');
            this.heroImgContainer = document.querySelector('.service-hero__img');
            this.isAnimationComplete = false;
            this.isAnimating = false;
            this.currentY = 120;
            this.targetY = 120;
            this.lastTimestamp = 0;
            this.scrollThreshold = 30;
            this.scrollAccumulated = 0;
            this.animationSpeed = 0.003;
            
            this.init();
        }

        init() {
            if (!this.heroSection || !this.graphElement) return;

            this.graphElement.style.transform = `translate(-50%, ${this.currentY}%)`;
            this.graphElement.style.transition = 'transform 0.05s linear';

            window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
            window.addEventListener('touchmove', this.onTouch.bind(this), { passive: false });

            this.checkVisibility();
            window.addEventListener('scroll', this.checkVisibility.bind(this));
            requestAnimationFrame(this.animate.bind(this));
        }

        animate(timestamp) {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const deltaTime = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;

            if (this.isAnimating && !this.isAnimationComplete) {
                if (this.targetY < this.currentY) {
                    const diff = this.currentY - this.targetY;
                    let speed = this.animationSpeed;
                    
                    if (diff < 20) {
                        speed = this.animationSpeed * 1.5;
                    }
                    
                    this.currentY -= diff * speed * deltaTime;
                    
                    if (this.currentY < 1) {
                        this.currentY = 0;
                        this.finishAnimation();
                    } else {
                        this.graphElement.style.transform = `translate(-50%, ${this.currentY}%)`;
                    }
                }
            }
            
            requestAnimationFrame(this.animate.bind(this));
        }

        checkVisibility() {
            if (this.isAnimationComplete) return;
            const rect = this.heroSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

            if (isVisible && !this.isAnimationComplete && !this.isAnimating) {
                this.isAnimating = true;
                document.body.classList.add('body-scroll-lock');
            }
        }

        onWheel(e) {
            if (!this.isAnimating || this.isAnimationComplete) return;
            e.preventDefault();
            e.stopPropagation();

            this.scrollAccumulated += Math.abs(e.deltaY);
            
            if (this.scrollAccumulated >= this.scrollThreshold) {
                this.targetY = 0;
                this.scrollAccumulated = 0;
            }
        }

        onTouch(e) {
            if (!this.isAnimating || this.isAnimationComplete) return;
            e.preventDefault();

            if (e.touches.length === 1 && this.lastTouchY) {
                const currentY = e.touches[0].clientY;
                const delta = Math.abs(this.lastTouchY - currentY);
                
                this.scrollAccumulated += delta;
                
                if (this.scrollAccumulated >= this.scrollThreshold) {
                    this.targetY = 0;
                    this.scrollAccumulated = 0;
                }
                
                this.lastTouchY = currentY;
            } else if (e.touches.length === 1) {
                this.lastTouchY = e.touches[0].clientY;
            }
        }

        finishAnimation() {
            this.isAnimationComplete = true;
            this.isAnimating = false;
            this.targetY = 0;

            this.graphElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            this.graphElement.style.transform = 'translate(-50%, 0%)';
            this.graphElement.classList.add('active');
            this.heroImgContainer.classList.add('active');

            setTimeout(() => {
                document.body.classList.remove('body-scroll-lock');
                window.removeEventListener('wheel', this.onWheel);
                window.removeEventListener('touchmove', this.onTouch);
                window.removeEventListener('scroll', this.checkVisibility);
            }, 600);
        }
    }

    new HeroAnimation();

    if (document.querySelector(".expertise-nums")) {
        const blockTitles = document.querySelectorAll(".expertise-nums-item__title span");
        const blockColumns = document.querySelectorAll(".expertise-nums__item");
        const arrTexts = [];
        const animationDone = [];

        for (let i = 0; i < blockTitles.length; i++) {
            var blockTitlesText = Number(blockTitles[i].id);
            arrTexts.push(blockTitlesText);
            animationDone.push(false);
        }

        var animateCounter = function (element, endValue) {
            let startValue = 0;
            let duration = 1500;
            let startTime;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;

                if (progress < 1) {
                    const value = Math.floor(startValue + (endValue - startValue) * progress);
                    element.textContent = value;
                    requestAnimationFrame(step);
                } else {
                    element.textContent = endValue;
                }
            }

            requestAnimationFrame(step);
        };

        var increment = function () {
            for (let i = 0; i < blockColumns.length; i++) {
                var blockColumnTop = blockColumns[i].getBoundingClientRect().top;
                var koef = 2;

                if (blockColumnTop < window.innerHeight - (blockColumns[i].clientHeight / koef) && blockColumnTop > 0 && !animationDone[i]) {
                    blockTitles[i].classList.add("active");
                    animateCounter(blockTitles[i], arrTexts[i]);
                    animationDone[i] = true;
                }
            }
        }

        window.addEventListener("load", increment);
        window.addEventListener("scroll", increment);
    }

    if (document.querySelector('.table')) {
        const tableBody = document.querySelector('.table-container');
        const tableHeader = document.querySelector('.table-header');

        const buttonTableInfo = document.querySelectorAll(".table__table span#info");
        const tableInfoBody = document.querySelectorAll(".table__table .table-info");

        for (let i = 0; i < tableInfoBody.length; i++) {
            buttonTableInfo[i].addEventListener("click", function () {
                if (buttonTableInfo[i].classList.contains("active")) {
                    buttonTableInfo[i].classList.remove("active");
                    tableInfoBody[i].classList.remove("open");
                } else {
                    for (let i = 0; i < tableInfoBody.length; i++) {
                        buttonTableInfo[i].classList.remove("active");
                        tableInfoBody[i].classList.remove("open");
                    }
                    buttonTableInfo[i].classList.add("active");
                    tableInfoBody[i].classList.add("open");
                }
            })
        }

        for (let i = 0; i < tableInfoBody.length; i++) {
            tableInfoBody[i].addEventListener("click", function (event) {
                if (!event.target.closest(".table-info__body")) {
                    for (let i = 0; i < tableInfoBody.length; i++) {
                        buttonTableInfo[i].classList.remove("active");
                        tableInfoBody[i].classList.remove("open");
                    }
                }
            });
        }

        document.addEventListener("keydown", function (event) {
            if (event.which == 27) {
                for (let i = 0; i < tableInfoBody.length; i++) {
                    buttonTableInfo[i].classList.remove("active");
                    tableInfoBody[i].classList.remove("open");
                }
            }
        });

        function updateHeaderPosition() {
            const rect = tableBody.getBoundingClientRect();
            const headerHeight = tableHeader.offsetHeight;
            const tableHeight = tableBody.offsetHeight;

            let offset = -rect.top;

            tableBody.style.paddingTop = headerHeight + "px";

            if (offset < 0) offset = 0;

            const maxOffset = tableHeight - headerHeight;
            if (offset > maxOffset) offset = maxOffset;

            tableHeader.style.transform = `translateY(${offset}px)`;

            if (offset > 0 && offset < maxOffset) {
                tableHeader.classList.add('sticky-active');
                tableHeader.style.top = (header.offsetHeight - 20) + "px";
            } else {
                tableHeader.classList.remove('sticky-active');
                tableHeader.style.top = "0px";
            }
        }

        window.addEventListener('scroll', updateHeaderPosition);
        window.addEventListener('resize', updateHeaderPosition);

        updateHeaderPosition();

        const tableItems = document.querySelectorAll(".table__table tbody tr");
        const tableButton = document.querySelector(".table__button > button");

        if (tableButton) {
            const tableButtonTextBefore = tableButton.innerHTML;
            const tableButtonTextAfter = tableButton.id;
            const tableCount = 15;

            function hideServices() {
                for (let i = tableCount; i < tableItems.length; i++) {
                    tableItems[i].style.display = "none";
                }
            }

            function showServices() {
                for (let i = 0; i < tableItems.length; i++) {
                    tableItems[i].style.display = "table-row";
                }
            }
            hideServices();
            tableButton.addEventListener("click", function () {
                if (tableButton.classList.contains("show")) {
                    hideServices();
                    tableButton.innerHTML = tableButtonTextBefore;
                    tableButton.classList.remove("show");
                } else {
                    showServices();
                    tableButton.innerHTML = tableButtonTextAfter;
                    tableButton.classList.add("show");
                }
            });
        }
    }

    if (document.querySelector(".refund-terminal")) {
        const lines = [
            { el: "line-1", text: "refund create --order ORD-2026-0412 --full" },
            { el: "line-2", text: "refund_id: RF-81273" },
            { el: "line-3", text: "amount: 100.00 USD" }
        ];

        let lineIndex = 0;
        let charIndex = 0;

        function resetTerminal() {
            lines.forEach(line => {
                document.getElementById(line.el).textContent = "";
            });
            lineIndex = 0;
            charIndex = 0;
        }

        function typeLine() {
            if (lineIndex >= lines.length) {
                setTimeout(() => {
                    resetTerminal();
                    typeLine();
                }, 2000);
                return;
            }

            const current = lines[lineIndex];
            const element = document.getElementById(current.el);

            if (charIndex < current.text.length) {
                element.textContent += current.text.charAt(charIndex);
                charIndex++;
                setTimeout(typeLine, 40);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeLine, 500);
            }
        }

        typeLine();
    }

    if (document.querySelector(".qa__menu")) {
        const menuItems = document.querySelectorAll('.qa-menu__list a');
        const sections = document.querySelectorAll('section[id], div[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    menuItems.forEach(item => {
                        item.parentElement.classList.remove('active');
                        
                        if (item.getAttribute('href') === `#${id}`) {
                            item.parentElement.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-100px 0px -50% 0px'
        });
        
        sections.forEach(section => {
            if (section.getAttribute('id')) {
                observer.observe(section);
            }
        });
    }
});