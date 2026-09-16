/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 900);
    }
});

/* =========================================
   THEME TOGGLE
========================================= */

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");

    if (themeButton) {
        themeButton.textContent = "☾";
    }
} else {
    if (themeButton) {
        themeButton.textContent = "☀";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        themeButton.textContent = isLight ? "☾" : "☀";

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );
    });
}

/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuButton.textContent = "☰";
        });
    });
}

/* =========================================
   CURSOR LIGHT
========================================= */

const cursorLight = document.getElementById("cursorLight");

if (cursorLight) {
    document.addEventListener("mousemove", (event) => {
        cursorLight.style.left = `${event.clientX}px`;
        cursorLight.style.top = `${event.clientY}px`;
        cursorLight.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
        cursorLight.style.opacity = "0";
    });
}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(
            index * 0.04,
            0.3
        )}s`;

        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}

/* =========================================
   BELLE IMAGE CHECK
========================================= */

const belleImage = document.getElementById("belleImage");

if (belleImage) {
    belleImage.addEventListener("error", () => {
        console.error(
            "Gambar Belle tidak ditemukan. Pastikan nama file adalah belle.png dan berada satu folder dengan index.html."
        );

        belleImage.alt =
            "Gambar Belle tidak ditemukan. Pastikan file bernama belle.png berada di folder website.";
    });

    belleImage.addEventListener("load", () => {
        console.log("Gambar Belle berhasil ditampilkan.");
    });
}

/* =========================================
   BELLE 3D MOVEMENT
========================================= */

const belleFrame = document.querySelector(".belle-frame");

if (belleFrame) {
    belleFrame.addEventListener("mousemove", (event) => {
        const rect = belleFrame.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const rotateY = ((mouseX / rect.width) - 0.5) * 5;
        const rotateX = ((mouseY / rect.height) - 0.5) * -5;

        belleFrame.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    belleFrame.addEventListener("mouseleave", () => {
        belleFrame.style.transform = "";
    });
}

/* =========================================
   MULTI LANGUAGE
========================================= */

const translations = {
    id: {
        loading: "Memuat portfolio...",
        home: "Beranda",
        about: "Tentang",
        skills: "Keahlian",
        projects: "Proyek",
        contact: "Kontak",

        availability: "TERSEDIA UNTUK BERKOLABORASI",
        hello: "Halo, saya",
        profession: "Mahasiswa Informatika",
        heroDescription:
            "Saya tertarik pada pengembangan website, desain antarmuka, teknologi digital, dan pembuatan pengalaman web yang modern.",
        seeProjects: "Lihat Proyek",
        contactMe: "Hubungi Saya",
        creative: "Kreatif",
        learning: "Terus Belajar",
        technology: "Teknologi",

        digitalAssistant: "DIGITAL ASSISTANT",
        online: "ONLINE",
        welcomeTitle: "Yo! Selamat datang!",
        welcomeMessage: "Senang bertemu denganmu di portfolio saya.",
        scroll: "GULIR UNTUK MENJELAJAHI",

        aboutTitle: "Tentang Saya",
        aboutLead:
            "Saya adalah mahasiswa Informatika yang senang mengeksplorasi dunia teknologi dan desain digital.",
        aboutDescription:
            "Saya sedang mengembangkan kemampuan dalam HTML, CSS, JavaScript, database, dan berbagai teknologi web. Saya percaya bahwa website yang baik tidak hanya harus berfungsi, tetapi juga memiliki tampilan yang menarik dan mudah digunakan.",
        location: "Lokasi",
        status: "Status",
        student: "Mahasiswa",
        focus: "Fokus",

        skillsTitle: "Keahlian",
        skillsDescription:
            "Beberapa teknologi yang sedang saya pelajari dan gunakan dalam pengembangan proyek.",
        htmlDescription:
            "Membuat struktur halaman website yang rapi dan semantik.",
        cssDescription:
            "Membuat tampilan website modern, responsif, dan menarik.",
        jsDescription:
            "Menambahkan logika, animasi, dan interaksi pada website.",
        mysqlDescription:
            "Mengelola data dan memahami dasar sistem database.",

        projectsTitle: "Proyek Pilihan",
        projectOneTitle: "Personal Portfolio",
        projectOneDescription:
            "Website portfolio pribadi dengan desain futuristik, animasi, dan mode terang-gelap.",
        projectTwoTitle: "Digital Product Design",
        projectTwoDescription:
            "Konsep desain visual untuk promosi produk digital dengan gaya sederhana dan unik.",
        projectThreeTitle: "Interactive Web",
        projectThreeDescription:
            "Eksperimen website dengan efek interaktif, animasi, dan elemen antarmuka modern.",

        contactTitle: "Hubungi Saya",
        contactLead:
            "Punya ide atau ingin berkolaborasi? Mari kita buat sesuatu yang menarik.",
        contactDescription:
            "Kamu bisa menghubungi saya melalui media sosial atau formulir di samping.",
        nameLabel: "Nama",
        emailLabel: "Email",
        messageLabel: "Pesan",
        namePlaceholder: "Masukkan nama kamu",
        emailPlaceholder: "Masukkan email kamu",
        messagePlaceholder: "Tulis pesan kamu...",
        sendMessage: "Kirim Pesan",
        formSuccess: "Terima kasih! Pesan kamu berhasil disiapkan.",
        footerText: "Dibuat dengan semangat belajar dan kreativitas."
    },

    en: {
        loading: "Loading portfolio...",
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",

        availability: "AVAILABLE FOR COLLABORATION",
        hello: "Hello, I am",
        profession: "Informatics Student",
        heroDescription:
            "I am interested in website development, interface design, digital technology, and creating modern web experiences.",
        seeProjects: "View Projects",
        contactMe: "Contact Me",
        creative: "Creative",
        learning: "Always Learning",
        technology: "Technology",

        digitalAssistant: "DIGITAL ASSISTANT",
        online: "ONLINE",
        welcomeTitle: "Yo! Welcome!",
        welcomeMessage: "Nice to meet you on my portfolio.",
        scroll: "SCROLL TO EXPLORE",

        aboutTitle: "About Me",
        aboutLead:
            "I am an Informatics student who enjoys exploring technology and digital design.",
        aboutDescription:
            "I am developing my skills in HTML, CSS, JavaScript, databases, and various web technologies. I believe a good website should not only work well, but also look attractive and be easy to use.",
        location: "Location",
        status: "Status",
        student: "Student",
        focus: "Focus",

        skillsTitle: "Skills",
        skillsDescription:
            "Some technologies I am currently learning and using in my projects.",
        htmlDescription:
            "Creating clean and semantic website structures.",
        cssDescription:
            "Creating modern, responsive, and attractive website designs.",
        jsDescription:
            "Adding logic, animations, and interactions to websites.",
        mysqlDescription:
            "Managing data and understanding database fundamentals.",

        projectsTitle: "Selected Projects",
        projectOneTitle: "Personal Portfolio",
        projectOneDescription:
            "A personal portfolio website with futuristic design, animations, and light-dark mode.",
        projectTwoTitle: "Digital Product Design",
        projectTwoDescription:
            "A visual design concept for promoting digital products with a simple and unique style.",
        projectThreeTitle: "Interactive Web",
        projectThreeDescription:
            "A website experiment featuring interactive effects, animations, and modern interface elements.",

        contactTitle: "Contact Me",
        contactLead:
            "Have an idea or want to collaborate? Let us create something interesting.",
        contactDescription:
            "You can contact me through social media or the form beside it.",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email",
        messagePlaceholder: "Write your message...",
        sendMessage: "Send Message",
        formSuccess: "Thank you! Your message has been prepared.",
        footerText: "Made with passion for learning and creativity."
    },

    ja: {
        loading: "ポートフォリオを読み込み中...",
        home: "ホーム",
        about: "私について",
        skills: "スキル",
        projects: "プロジェクト",
        contact: "お問い合わせ",

        availability: "コラボレーション受付中",
        hello: "こんにちは、私は",
        profession: "情報工学専攻の学生",
        heroDescription:
            "Web開発、インターフェースデザイン、デジタル技術、そしてモダンなWeb体験の制作に興味があります。",
        seeProjects: "プロジェクトを見る",
        contactMe: "お問い合わせ",
        creative: "クリエイティブ",
        learning: "継続学習",
        technology: "テクノロジー",

        digitalAssistant: "デジタルアシスタント",
        online: "オンライン",
        welcomeTitle: "ようこそ！",
        welcomeMessage: "私のポートフォリオへようこそ。",
        scroll: "スクロールして探索",

        aboutTitle: "私について",
        aboutLead:
            "私はテクノロジーとデジタルデザインを楽しみながら学んでいる情報工学の学生です。",
        aboutDescription:
            "HTML、CSS、JavaScript、データベース、さまざまなWeb技術を学んでいます。優れたWebサイトは、機能するだけでなく、魅力的で使いやすいことも大切だと考えています。",
        location: "場所",
        status: "ステータス",
        student: "学生",
        focus: "専門分野",

        skillsTitle: "スキル",
        skillsDescription:
            "現在学習し、プロジェクトで使用している技術です。",
        htmlDescription:
            "整理されたセマンティックなWebページ構造を作成します。",
        cssDescription:
            "モダンでレスポンシブなWebデザインを作成します。",
        jsDescription:
            "Webサイトにロジック、アニメーション、操作性を追加します。",
        mysqlDescription:
            "データ管理とデータベースの基礎を学んでいます。",

        projectsTitle: "プロジェクト",
        projectOneTitle: "個人ポートフォリオ",
        projectOneDescription:
            "未来的なデザイン、アニメーション、ライト・ダークモードを備えた個人ポートフォリオです。",
        projectTwoTitle: "デジタル製品デザイン",
        projectTwoDescription:
            "シンプルでユニークなデジタル製品プロモーションのデザインコンセプトです。",
        projectThreeTitle: "インタラクティブWeb",
        projectThreeDescription:
            "インタラクティブな効果、アニメーション、モダンなUIを試したWebサイトです。",

        contactTitle: "お問い合わせ",
        contactLead:
            "アイデアがありますか？一緒に面白いものを作りましょう。",
        contactDescription:
            "ソーシャルメディアまたはフォームから連絡できます。",
        nameLabel: "名前",
        emailLabel: "メール",
        messageLabel: "メッセージ",
        namePlaceholder: "名前を入力してください",
        emailPlaceholder: "メールアドレスを入力してください",
        messagePlaceholder: "メッセージを入力してください...",
        sendMessage: "メッセージを送信",
        formSuccess: "ありがとうございます。メッセージの準備ができました。",
        footerText: "学びと創造性を込めて制作しました。"
    }
};

/* =========================================
   LANGUAGE FUNCTION
========================================= */

const languageSelect = document.getElementById("languageSelect");

function updateLanguage(language) {
    const languageData = translations[language];

    if (!languageData) {
        return;
    }

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");

        if (languageData[key]) {
            element.textContent = languageData[key];
        }
    });

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((element) => {
            const key = element.getAttribute("data-i18n-placeholder");

            if (languageData[key]) {
                element.placeholder = languageData[key];
            }
        });

    localStorage.setItem("portfolio-language", language);
}

if (languageSelect) {
    const savedLanguage =
        localStorage.getItem("portfolio-language") || "id";

    languageSelect.value = savedLanguage;
    updateLanguage(savedLanguage);

    languageSelect.addEventListener("change", () => {
        updateLanguage(languageSelect.value);
    });
}

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const nameInput = document.getElementById("nameInput");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const currentLanguage = languageSelect
            ? languageSelect.value
            : "id";

        if (!nameInput.value.trim()) {
            return;
        }

        formMessage.textContent =
            translations[currentLanguage].formSuccess;

        contactForm.reset();

        setTimeout(() => {
            formMessage.textContent = "";
        }, 5000);
    });
}