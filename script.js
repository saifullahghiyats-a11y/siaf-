// =========================================
// KONFIGURASI SUPABASE
// =========================================

const supabaseUrl = "https://lzbsdivuijcxeaedngpo.supabase.co";

const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiLCJpYXQiOjE3ODY0OTM4NDgsImV4cCI6MjEwMjA2OTg0OH0.pC4gbrke-v9kbO-I82qNSz8xD8Fm9SAcOreRgQIjb90";


// =========================================
// DARK MODE / MODE MALAM
// =========================================

const toggleTheme = document.getElementById("toggleTheme");

if (toggleTheme) {
    toggleTheme.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        const darkModeAktif =
            document.body.classList.contains("dark-mode");

        toggleTheme.textContent = darkModeAktif
            ? "☀️"
            : "🌙";

        toggleTheme.setAttribute(
            "aria-label",
            darkModeAktif
                ? "Aktifkan mode terang"
                : "Aktifkan mode malam"
        );
    });
}


// =========================================
// SKILL
// =========================================

const daftarSkill = [
    "HTML",
    "CSS",
    "JavaScript",
    "MySQL"
];

const skillsContainer =
    document.getElementById("skills-container");

if (skillsContainer) {
    skillsContainer.innerHTML = "";

    daftarSkill.forEach(function (skill) {
        const badge = document.createElement("span");

        badge.className = "skill-badge";
        badge.textContent = skill;

        skillsContainer.appendChild(badge);
    });
}


// =========================================
// MENAMPILKAN PROYEK DARI SUPABASE
// =========================================

const proyekContainer =
    document.getElementById("proyek-container");

async function tampilkanProyek() {
    if (!proyekContainer) {
        return;
    }

    proyekContainer.textContent = "Memuat proyek...";

    try {
        const response = await fetch(
            `${supabaseUrl}/rest/v1/proyek?select=judul,deskripsi,gambar_url&order=id.desc`,
            {
                method: "GET",
                headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `Gagal mengambil proyek: HTTP ${response.status}`
            );
        }

        const daftarProyek = await response.json();

        proyekContainer.innerHTML = "";

        if (daftarProyek.length === 0) {
            proyekContainer.textContent = "Belum ada proyek.";
            return;
        }

        daftarProyek.forEach(function (proyek) {
            const card = document.createElement("article");
            card.className = "project-card";

            const judul = document.createElement("h3");
            judul.textContent = proyek.judul || "Tanpa judul";

            const deskripsi = document.createElement("p");
            deskripsi.textContent =
                proyek.deskripsi || "Tidak ada deskripsi.";

            card.appendChild(judul);
            card.appendChild(deskripsi);

            if (proyek.gambar_url) {
                const iframe = document.createElement("iframe");

                const driveMatch = proyek.gambar_url.match(
                    /drive\.google\.com\/file\/d\/([^/]+)/
                );

                const presentationMatch = proyek.gambar_url.match(
                    /docs\.google\.com\/presentation\/d\/([^/]+)/
                );

                if (driveMatch) {
                    iframe.src =
                        `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
                } else if (presentationMatch) {
                    iframe.src =
                        `https://docs.google.com/presentation/d/${presentationMatch[1]}/embed`;
                } else {
                    iframe.src = proyek.gambar_url;
                }

                iframe.title =
                    `Pratinjau ${proyek.judul || "proyek"}`;

                iframe.width = "100%";
                iframe.height = "300";
                iframe.loading = "lazy";
                iframe.allowFullscreen = true;
                iframe.setAttribute("frameborder", "0");

                card.appendChild(iframe);
            }

            proyekContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        proyekContainer.textContent =
            "Proyek gagal dimuat.";
    }
}

tampilkanProyek();


// =========================================
// FORM KONTAK
// =========================================

const formKontak =
    document.getElementById("formKontak");

const namaInput =
    document.getElementById("namaInput");

if (formKontak && namaInput) {
    formKontak.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nama = namaInput.value.trim();

        if (nama === "") {
            alert("Nama wajib diisi!");
            namaInput.focus();
            return;
        }

        const tombolKirim =
            formKontak.querySelector('button[type="submit"]');

        if (tombolKirim) {
            tombolKirim.disabled = true;
            tombolKirim.textContent = "Mengirim...";
        }

        try {
            const response = await fetch(
                `${supabaseUrl}/rest/v1/pesan`,
                {
                    method: "POST",
                    headers: {
                        apikey: supabaseKey,
                        Authorization: `Bearer ${supabaseKey}`,
                        "Content-Type": "application/json",
                        Prefer: "return=minimal"
                    },
                    body: JSON.stringify({
                        nama: nama
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Gagal mengirim pesan: HTTP ${response.status}`
                );
            }

            alert(`Pesan berhasil dikirim, ${nama}!`);
            formKontak.reset();

        } catch (error) {
            console.error(error);
            alert(
                "Pesan gagal dikirim. Periksa koneksi atau pengaturan Supabase."
            );

        } finally {
            if (tombolKirim) {
                tombolKirim.disabled = false;
                tombolKirim.textContent = "Kirim";
            }
        }
    });
}