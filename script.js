document.addEventListener("DOMContentLoaded", function () {

    // FAQ
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", function () {
            const isActive = item.classList.contains("active");

            faqItems.forEach(function (faq) {
                faq.classList.remove("active");
            });

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });


    // CHECKOUTS
    const checkoutLinks = {
        mensal: "https://pay.cakto.com.br/jwyi27m_714880",
        bimestral: "https://pay.cakto.com.br/3jxp7vp",
        trimestral: "https://pay.cakto.com.br/b5e8edp"
    };

    const checkoutButtons = document.querySelectorAll(".checkout-link");

    checkoutButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const plan = button.getAttribute("data-plan");
            const checkout = checkoutLinks[plan];

            if (checkout) {
                window.location.href = checkout;
            }
        });
    });


    // ANIMAÇÃO AO ROLAR
    const animatedElements = document.querySelectorAll(
        ".beneficio-card, .step-card, .plan-card, .testimonial-card, .faq-item"
    );

    animatedElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach(function (element) {
        observer.observe(element);
    });


    // HEADER AO ROLAR
    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // LINKS INTERNOS
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            let headerHeight = 0;

            if (header) {
                headerHeight = header.offsetHeight;
            }

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        });
    });

});