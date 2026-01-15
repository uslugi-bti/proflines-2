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

    function moveSidebarItems() {}
});