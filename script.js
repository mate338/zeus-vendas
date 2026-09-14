document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");


    // =====================================================
    // HEADER AO ROLAR
    // =====================================================

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 24) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // =====================================================
    // MENU MOBILE
    // =====================================================

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mobileMenu.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    // =====================================================
    // FAQ
    // =====================================================

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) {
            return;
        }


        question.addEventListener("click", function () {

            const wasActive =
                item.classList.contains("active");


            faqItems.forEach(function (otherItem) {

                const otherQuestion =
                    otherItem.querySelector(
                        ".faq-question"
                    );

                const otherAnswer =
                    otherItem.querySelector(
                        ".faq-answer"
                    );


                otherItem.classList.remove("active");


                if (otherQuestion) {

                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (otherAnswer) {

                    otherAnswer.style.maxHeight = null;

                }

            });


            if (!wasActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    // =====================================================
    // ANIMAÇÕES AO ROLAR
    // =====================================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -30px 0px"
                }

            );


        revealElements.forEach(
            function (element, index) {

                element.style.transitionDelay =
                    Math.min(index % 4, 3) *
                        55 +
                    "ms";

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(function (element) {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    // =====================================================
    // LINKS INTERNOS / SCROLL SUAVE
    // =====================================================

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    link.getAttribute("href");


                if (!href || href === "#") {
                    return;
                }


                const target =
                    document.querySelector(href);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const top =
                    target
                        .getBoundingClientRect()
                        .top +
                    window.pageYOffset -
                    headerHeight -
                    14;


                window.scrollTo({
                    top: top,
                    behavior: "smooth"
                });

            }
        );

    });

});