/* ========================================
   AMBIL ELEMEN HTML
======================================== */

const body = document.body;
const themeButton = document.querySelector("#toggleTheme");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");
const formKontak = document.querySelector("#formKontak");
const formMessage = document.querySelector("#formMessage");
const yearElement = document.querySelector("#year");
const navbar = document.querySelector(".navbar");

/* ========================================
   TAHUN FOOTER
======================================== */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* ========================================
   DARK MODE
======================================== */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");

    if (themeButton) {
        themeButton.textContent = "☀️";
    }
} else {
    body.classList.remove("dark-mode");

    if (themeButton) {
        themeButton.textContent = "🌙";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        const isDarkMode = body.classList.contains("dark-mode");

        themeButton.textContent = isDarkMode ? "☀️" : "🌙";

        localStorage.setItem(
            "portfolio-theme",
            isDarkMode ? "dark" : "light"
        );
    });
}

/* ========================================
   MENU MOBILE
======================================== */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu" : "Buka menu"
        );
    });
}

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("open");

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Buka menu");
        }
    });
});

/* ========================================
   NAVBAR SAAT SCROLL
======================================== */

window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* ========================================
   ANIMASI REVEAL SAAT SCROLL
======================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

/* ========================================
   NAV LINK AKTIF SESUAI SECTION
======================================== */

const sections = document.querySelectorAll("section, header");

const sectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                navItems.forEach(function (link) {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + currentId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(function (section) {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

/* ========================================
   FORM KONTAK
======================================== */

if (formKontak) {
    formKontak.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.querySelector("#namaInput").value.trim();
        const email = document.querySelector("#emailInput").value.trim();
        const pesan = document.querySelector("#pesanInput").value.trim();

        if (!nama || !email || !pesan) {
            formMessage.textContent = "Mohon isi semua kolom terlebih dahulu.";
            formMessage.style.color = "#ef4444";
            formMessage.classList.add("show");
            return;
        }

        formMessage.textContent =
            "Pesan berhasil disiapkan. Terima kasih, " + nama + "!";
        formMessage.style.color = "#22a06b";
        formMessage.classList.add("show");

        formKontak.reset();

        setTimeout(function () {
            formMessage.classList.remove("show");
        }, 5000);
    });
}