document.addEventListener("DOMContentLoaded", function () {
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

    const openSubMenu = document.querySelectorAll(".header-bottom__item>span");
    const subMenu = document.querySelectorAll(".header-bottom__subitems");

    for (let i = 0; i < subMenu.length; i++) {
        openSubMenu[i].addEventListener("click", function () {
            if (openSubMenu[i].classList.contains("open")) {
                openSubMenu[i].classList.remove("open");
                subMenu[i].classList.remove("open");
            } else {
                for (let i = 0; i < subMenu.length; i++) {
                    openSubMenu[i].classList.remove("open");
                    subMenu[i].classList.remove("open");
                }
                openSubMenu[i].classList.add("open");
                subMenu[i].classList.add("open");
            }
        });
    }

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".header-bottom__subitems") && !event.target.closest(".header-bottom__item>span")) {
            for (let i = 0; i < subMenu.length; i++) {
                openSubMenu[i].classList.remove("open");
                subMenu[i].classList.remove("open");
            }
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

        function hideServices() {
            for (let i = 3; i < servicesItems.length; i++) {
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

            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

            loop: true,
        });
    }

    if (document.querySelector(".team")) {
        const teamPoints = document.querySelectorAll(".team-img__point");
        const teamPointButtons = document.querySelectorAll(".team-img__point > button");
        const teamPointBadges = document.querySelectorAll(".team-img__badge");
        const teamImg = document.querySelector(".team__img");

        function checkBadgePosition(badge, point) {
            const imgRect = teamImg.getBoundingClientRect();
            const pointRect = point.getBoundingClientRect();
            
            // Вычисляем позицию точки в пикселях
            const pointLeftPercent = parseFloat(point.style.left);
            const pointLeftPx = (pointLeftPercent / 100) * imgRect.width;
            
            // Ширина плашки в пикселях
            const badgeWidth = teamPointBadges[0].clientWidth;
            
            // Проверяем, выходит ли плашка за правый край
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
        const faqItemHead = document.querySelectorAll(".faq-item__title");
        const faqItemBody = document.querySelectorAll(".faq-item__text");

        for (let i = 0; i < faqItemBody.length; i++) {
            faqItemHead[i].addEventListener("click", function () {
                if (faqItemHead[i].classList.contains("open")) {
                    faqItemHead[i].classList.remove("open");
                    faqItemBody[i].classList.remove("open");
                } else {
                    faqItemHead[i].classList.add("open");
                    faqItemBody[i].classList.add("open");
                }
            });
        }
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
});