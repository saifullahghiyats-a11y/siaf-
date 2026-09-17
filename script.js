/* ══════════════════════════════════════════════════════════════
   SILVER PALACE — script.js
   Semua modul aman dijalankan meski elemennya tidak ada.
   Tanpa audio, tanpa SpeechSynthesis, tanpa library eksternal.
══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Penyimpanan aman (tidak error di mode privat) */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ══════════════════════════════════════════════════════════
     A. BAHASA — Indonesia, English, 日本語
     Tambah teks baru: beri atribut data-i18n="kunci" di HTML,
     lalu isi kuncinya di tiga kamus di bawah ini.
  ══════════════════════════════════════════════════════════ */
  var DICT = {
    id: {
      'boot.welcome': 'Welcome to my portfolio',
      'boot.enter': 'Masuk',
      'boot.loading': 'Menyiapkan gerbang… ',
      'nav.home': 'Beranda', 'nav.about': 'Tentang', 'nav.skills': 'Keahlian',
      'nav.projects': 'Proyek', 'nav.contact': 'Kontak',
      'hero.lead': 'Saya membangun antarmuka web yang rapi, cepat, dan enak dipakai — dari halaman pertama sampai detail terakhir.',
      'hero.cta1': 'Lihat proyek', 'hero.cta2': 'Hubungi saya',
      'hero.typed': ['Front-end Developer', 'Perancang antarmuka web', 'Penyuka detail kecil'],
      'about.title': 'Tentang saya',
      'about.p1': 'Halo, saya Saif Gyiyats Al Khair. Saya senang mengubah ide menjadi halaman web yang hidup: struktur yang bersih, animasi yang punya alasan, dan tampilan yang tetap nyaman dibaca di layar kecil maupun besar.',
      'about.p2': 'Fokus saya pada front-end — HTML, CSS, dan JavaScript — dengan perhatian khusus pada detail visual dan performa.',
      'about.k.name': 'Nama', 'about.k.role': 'Peran', 'about.k.loc': 'Lokasi', 'about.k.status': 'Status',
      'about.v.role': 'Front-end Developer', 'about.v.loc': 'Indonesia', 'about.v.status': 'Terbuka untuk proyek',
      'skills.title': 'Keahlian', 'skills.responsive': 'Desain Responsif', 'skills.ui': 'Desain Antarmuka',
      'projects.title': 'Proyek', 'projects.open': 'Buka proyek',
      'p1.title': 'Website Portfolio', 'p1.desc': 'Portfolio pribadi bertema Silver Palace dengan animasi dan layar pembuka.',
      'p2.title': 'Landing Page', 'p2.desc': 'Halaman promosi satu layar dengan tata letak responsif dan animasi gulir.',
      'p3.title': 'Web App Mini', 'p3.desc': 'Aplikasi web kecil untuk mencatat dan menyimpan data di peramban.',
      'contact.title': 'Kontak',
      'form.name': 'Nama', 'form.email': 'Email', 'form.message': 'Pesan', 'form.send': 'Kirim pesan',
      'err.name': 'Isi nama minimal 2 huruf.',
      'err.email': 'Format email belum benar.',
      'err.message': 'Tulis pesan minimal 10 huruf.',
      'form.bad': 'Periksa lagi bagian yang ditandai.',
      'form.ok': 'Pesan terkirim. Terima kasih sudah menghubungi.',
      'a11y.menuOpen': 'Buka menu', 'a11y.menuClose': 'Tutup menu',
      'a11y.theme': 'Ganti tema', 'a11y.top': 'Kembali ke atas'
    },

    en: {
      'boot.welcome': 'Welcome to my portfolio',
      'boot.enter': 'Enter',
      'boot.loading': 'Opening the gate… ',
      'nav.home': 'Home', 'nav.about': 'About', 'nav.skills': 'Skills',
      'nav.projects': 'Projects', 'nav.contact': 'Contact',
      'hero.lead': 'I build web interfaces that are clean, fast and pleasant to use — from the first screen to the last detail.',
      'hero.cta1': 'See projects', 'hero.cta2': 'Get in touch',
      'hero.typed': ['Front-end Developer', 'Web interface designer', 'Fond of small details'],
      'about.title': 'About me',
      'about.p1': "Hi, I'm Saif Gyiyats Al Khair. I enjoy turning ideas into living web pages: clean structure, animation with a reason, and a layout that stays comfortable to read on small and large screens alike.",
      'about.p2': 'My focus is front-end — HTML, CSS and JavaScript — with close attention to visual detail and performance.',
      'about.k.name': 'Name', 'about.k.role': 'Role', 'about.k.loc': 'Location', 'about.k.status': 'Status',
      'about.v.role': 'Front-end Developer', 'about.v.loc': 'Indonesia', 'about.v.status': 'Open to projects',
      'skills.title': 'Skills', 'skills.responsive': 'Responsive Design', 'skills.ui': 'UI Design',
      'projects.title': 'Projects', 'projects.open': 'Open project',
      'p1.title': 'Portfolio Website', 'p1.desc': 'A personal portfolio with a Silver Palace theme, animation and an opening screen.',
      'p2.title': 'Landing Page', 'p2.desc': 'A single-screen promo page with a responsive layout and scroll animation.',
      'p3.title': 'Mini Web App', 'p3.desc': 'A small web app for noting and storing data in the browser.',
      'contact.title': 'Contact',
      'form.name': 'Name', 'form.email': 'Email', 'form.message': 'Message', 'form.send': 'Send message',
      'err.name': 'Enter a name of at least 2 characters.',
      'err.email': 'That email address looks incomplete.',
      'err.message': 'Write a message of at least 10 characters.',
      'form.bad': 'Check the highlighted fields.',
      'form.ok': 'Message sent. Thanks for reaching out.',
      'a11y.menuOpen': 'Open menu', 'a11y.menuClose': 'Close menu',
      'a11y.theme': 'Switch theme', 'a11y.top': 'Back to top'
    },

    ja: {
      'boot.welcome': 'Welcome to my portfolio',
      'boot.enter': '入る',
      'boot.loading': '門を開いています… ',
      'nav.home': 'ホーム', 'nav.about': '紹介', 'nav.skills': 'スキル',
      'nav.projects': '制作物', 'nav.contact': '連絡先',
      'hero.lead': '最初の画面から細部まで、見やすく速く使いやすいウェブの画面をつくっています。',
      'hero.cta1': '制作物を見る', 'hero.cta2': '連絡する',
      'hero.typed': ['フロントエンド開発者', 'ウェブUIデザイナー', '細部にこだわる人'],
      'about.title': '私について',
      'about.p1': 'こんにちは、サイフ・ギヤツ・アルカイルです。きれいな構造、意味のあるアニメーション、小さな画面でも大きな画面でも読みやすいレイアウト。アイデアを生きたウェブページに変えるのが好きです。',
      'about.p2': '専門はフロントエンドで、HTML・CSS・JavaScript を使い、見た目の細部と表示速度を大切にしています。',
      'about.k.name': '名前', 'about.k.role': '役割', 'about.k.loc': '所在地', 'about.k.status': '状況',
      'about.v.role': 'フロントエンド開発者', 'about.v.loc': 'インドネシア', 'about.v.status': '新しい依頼を受付中',
      'skills.title': 'スキル', 'skills.responsive': 'レスポンシブデザイン', 'skills.ui': 'UIデザイン',
      'projects.title': '制作物', 'projects.open': '見てみる',
      'p1.title': 'ポートフォリオサイト', 'p1.desc': 'Silver Palace をテーマにした個人サイト。オープニング画面とアニメーション付き。',
      'p2.title': 'ランディングページ', 'p2.desc': 'レスポンシブ対応とスクロールアニメーションを備えた一画面の紹介ページ。',
      'p3.title': 'ミニウェブアプリ', 'p3.desc': 'ブラウザにデータを記録・保存できる小さなウェブアプリ。',
      'contact.title': '連絡先',
      'form.name': 'お名前', 'form.email': 'メール', 'form.message': 'メッセージ', 'form.send': '送信する',
      'err.name': 'お名前は2文字以上で入力してください。',
      'err.email': 'メールアドレスの形式をご確認ください。',
      'err.message': 'メッセージは10文字以上で入力してください。',
      'form.bad': '印のついた項目をご確認ください。',
      'form.ok': '送信しました。ご連絡ありがとうございます。',
      'a11y.menuOpen': 'メニューを開く', 'a11y.menuClose': 'メニューを閉じる',
      'a11y.theme': 'テーマを切り替え', 'a11y.top': '先頭に戻る'
    }
  };

  var lang = 'id';

  function t(key) {
    var v = (DICT[lang] && DICT[lang][key]);
    if (v === undefined) v = DICT.id[key];
    return v === undefined ? '' : v;
  }

  function detectLang() {
    var saved = store.get('sp-lang');
    if (saved && DICT[saved]) return saved;
    var nav = (navigator.language || 'id').slice(0, 2).toLowerCase();
    return DICT[nav] ? nav : 'id';
  }

  function setLang(next, save) {
    if (!DICT[next]) return;
    lang = next;
    document.documentElement.setAttribute('lang', next);
    if (save !== false) store.set('sp-lang', next);

    $$('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (typeof val === 'string' && val) el.textContent = val;
    });

    $$('.langpick button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === next;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    // Label aksesibilitas yang tidak terlihat sebagai teks
    var toggle = $('#navToggle');
    if (toggle) toggle.setAttribute('aria-label',
      t(toggle.getAttribute('aria-expanded') === 'true' ? 'a11y.menuClose' : 'a11y.menuOpen'));
    var themeBtn = $('#themeBtn');
    if (themeBtn) themeBtn.setAttribute('aria-label', t('a11y.theme'));
    var top = $('#toTop');
    if (top) top.setAttribute('aria-label', t('a11y.top'));

    restartTyping();
    document.dispatchEvent(new CustomEvent('sp:lang', { detail: next }));
  }

  function langUI() {
    $$('.langpick').forEach(function (group) {
      group.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-lang]');
        if (btn) setLang(btn.getAttribute('data-lang'));
      });
    });
    setLang(detectLang(), false);
  }

  /* ══════════════════════════════════════════════════════════
     B. TEMA GELAP / TERANG
  ══════════════════════════════════════════════════════════ */
  function theme() {
    var btn = $('#themeBtn');
    var saved = store.get('sp-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var current = saved || (prefersLight ? 'light' : 'dark');

    apply(current);

    if (btn) btn.addEventListener('click', function () {
      current = current === 'dark' ? 'light' : 'dark';
      apply(current);
      store.set('sp-theme', current);
    });

    function apply(mode) {
      document.documentElement.setAttribute('data-theme', mode);
      if (btn) btn.setAttribute('aria-pressed', String(mode === 'light'));
    }
  }

  /* ── 1. BOOTING SCREEN ──────────────────────────────────── */
  function boot() {
    var screenEl = $('#boot');
    var btn      = $('#enterBtn');
    var loader   = $('#bootLoader');
    var fill     = $('#bootBarFill');
    var status   = $('#bootStatus');
    if (!screenEl) { openSite(); return; }

    document.body.classList.add('is-locked');

    var value = 0;
    var timer = setInterval(function () {
      value += Math.random() * 12 + 4;
      if (value >= 100) { value = 100; clearInterval(timer); ready(); }
      if (fill)   fill.style.width = value + '%';
      if (status) status.textContent = t('boot.loading') + Math.round(value) + '%';
    }, reduced ? 60 : 180);

    function ready() {
      if (loader) loader.classList.add('is-done');
      if (btn) { btn.hidden = false; btn.focus({ preventScroll: true }); }
    }

    function leave() {
      screenEl.classList.add('is-out');
      document.body.classList.remove('is-locked');
      openSite();
      setTimeout(function () { screenEl.remove(); }, 1000);
    }

    if (btn) btn.addEventListener('click', leave);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && btn && !btn.hidden && !screenEl.classList.contains('is-out')) leave();
    });
  }

  function openSite() {
    var nav = $('#nav');
    if (nav) nav.classList.add('is-ready');
    startTyping();
  }

  /* ── 2. NAVBAR ──────────────────────────────────────────── */
  function navbar() {
    var nav    = $('#nav');
    var toggle = $('#navToggle');
    var links  = $('#navLinks');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      nav.classList.toggle('is-stuck', window.scrollY > 40);
    }, { passive: true });

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
      });
      $$('a', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', t('a11y.menuOpen'));
        });
      });
    }

    var sections = $$('main section[id]');
    var navLinks = $$('.nav__links a');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── 3. ANIMASI MASUK VIEWPORT + STAGGER + PROGRESS BAR ── */
  function reveals() {
    var items = $$('.reveal, .stagger, .section__head, .social, .skill, .project');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduced) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      $$('.meter').forEach(function (m) { fillMeter(m); });
      return;
    }

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var group = el.parentElement ? $$('.stagger', el.parentElement) : [];
        var delay = group.indexOf(el) > -1 ? group.indexOf(el) * 110 : 0;
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        $$('.meter', el).forEach(function (m) { setTimeout(function () { fillMeter(m); }, delay + 250); });
        obs.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  function fillMeter(meter) {
    var bar = meter.firstElementChild;
    var val = parseInt(meter.getAttribute('data-value'), 10);
    if (bar && !isNaN(val)) bar.style.width = Math.max(0, Math.min(100, val)) + '%';
  }

  /* ── 4. EFEK TILT 3D + CAHAYA MENGIKUTI KURSOR ──────────── */
  function tilt() {
    if (reduced || window.matchMedia('(hover:none)').matches) return;

    $$('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.transform =
          'perspective(900px) rotateX(' + ((0.5 - py) * 7).toFixed(2) + 'deg) rotateY(' +
          ((px - 0.5) * 9).toFixed(2) + 'deg) translateY(-4px)';
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ── 5. CAHAYA KURSOR GLOBAL ────────────────────────────── */
  function cursorGlow() {
    var glow = $('#cursorGlow');
    if (!glow || reduced || window.matchMedia('(hover:none)').matches) return;

    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;

    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      glow.style.opacity = '1';
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });

    function loop() {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) requestAnimationFrame(loop);
      else running = false;
    }
  }

  /* ── 6. PARTIKEL (booting & hero) ───────────────────────── */
  function particles(canvas, count, interactive) {
    if (!canvas || !canvas.getContext || reduced) return;
    var ctx = canvas.getContext('2d');
    var dots = [];
    var mouse = { x: -999, y: -999 };
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var raf;

    function size() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      dots = [];
      var n = window.innerWidth < 720 ? Math.round(count * 0.5) : count;
      for (var i = 0; i < n; i++) {
        dots.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4, a: Math.random() * 0.5 + 0.2
        });
      }
    }

    function tone() {
      return document.documentElement.getAttribute('data-theme') === 'light'
        ? '28,127,181' : '159,222,255';
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      var rgb = tone();
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;

        if (interactive) {
          var dx = d.x - mouse.x, dy = d.y - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0.1) { d.x += (dx / dist) * 0.7; d.y += (dy / dist) * 0.7; }
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb + ',' + d.a + ')';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    size(); seed(); frame();

    window.addEventListener('resize', function () { size(); seed(); });
    if (interactive) {
      window.addEventListener('pointermove', function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      }, { passive: true });
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    });
  }

  /* ── 7. EFEK MENGETIK (mengikuti bahasa aktif) ──────────── */
  var typing = { on: false, timer: null };

  function startTyping() {
    var el = $('#typed');
    if (!el || typing.on) return;
    typing.on = true;

    var li = 0, ci = 0, erasing = false;

    function lines() {
      var l = t('hero.typed');
      return Array.isArray(l) && l.length ? l : ['Front-end Developer'];
    }

    if (reduced) { el.textContent = lines()[0]; return; }

    (function step() {
      var list = lines();
      if (li >= list.length) li = 0;
      var text = list[li];

      el.textContent = erasing ? text.slice(0, --ci) : text.slice(0, ++ci);

      var wait = erasing ? 40 : 75;
      if (!erasing && ci >= text.length) { erasing = true; wait = 1600; }
      else if (erasing && ci <= 0) { erasing = false; li = (li + 1) % list.length; wait = 350; }

      typing.timer = setTimeout(step, wait);
    })();
  }

  function restartTyping() {
    var el = $('#typed');
    if (!el) return;
    if (typing.timer) clearTimeout(typing.timer);
    typing.on = false;
    el.textContent = '';
    // hanya jalan kembali bila layar pembuka sudah lewat
    if (!$('#boot') || $('#boot').classList.contains('is-out')) startTyping();
  }

  /* ── 8. PROGRESS GULIR & TOMBOL KE ATAS ─────────────────── */
  function scrollUI() {
    var bar = $('#scrollBar');
    var top = $('#toTop');
    var ticking = false;

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      if (top) top.classList.toggle('is-show', window.scrollY > 420);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    if (top) top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ── 9. EFEK RIPPLE PADA TOMBOL ─────────────────────────── */
  function ripple() {
    document.addEventListener('pointerdown', function (e) {
      var btn = e.target.closest('.ripple, .btn');
      if (!btn || reduced) return;
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 2;
      var dot = document.createElement('span');
      dot.className = 'ripple-dot';
      dot.style.width = dot.style.height = size + 'px';
      dot.style.left = (e.clientX - r.left) + 'px';
      dot.style.top  = (e.clientY - r.top) + 'px';
      btn.appendChild(dot);
      setTimeout(function () { dot.remove(); }, 650);
    });
  }

  /* ── 10. VALIDASI FORMULIR KONTAK ───────────────────────── */
  function contactForm() {
    var form = $('#contactForm');
    if (!form) return;
    var statusEl = $('#formStatus');

    var rules = {
      name:    function (v) { return v.trim().length >= 2 || t('err.name'); },
      email:   function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || t('err.email'); },
      message: function (v) { return v.trim().length >= 10 || t('err.message'); }
    };

    function check(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var res = rule(input.value);
      var field = input.closest('.field');
      var msg = field ? $('.field__msg', field) : null;
      var ok = res === true;
      if (field) { field.classList.toggle('is-error', !ok); field.classList.toggle('is-ok', ok); }
      if (msg) msg.textContent = ok ? '' : res;
      return ok;
    }

    $$('input, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { check(input); });
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field && field.classList.contains('is-error')) check(input);
      });
    });

    // Pesan kesalahan ikut berganti saat bahasa diganti
    document.addEventListener('sp:lang', function () {
      $$('.field.is-error input, .field.is-error textarea', form).forEach(check);
      if (statusEl) statusEl.classList.remove('is-show');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var inputs = $$('input, textarea', form);
      var valid = inputs.map(check).every(Boolean);

      if (!statusEl) return;
      statusEl.classList.add('is-show');
      statusEl.classList.toggle('is-bad', !valid);

      if (!valid) {
        statusEl.textContent = t('form.bad');
        var firstBad = $('.field.is-error input, .field.is-error textarea', form);
        if (firstBad) firstBad.focus();
        return;
      }

      statusEl.textContent = t('form.ok');
      form.reset();
      $$('.field', form).forEach(function (f) { f.classList.remove('is-ok', 'is-error'); });
      setTimeout(function () { statusEl.classList.remove('is-show'); }, 5000);
    });
  }

  /* ── 11. PARALLAX RINGAN ────────────────────────────────── */
  function parallax() {
    var portrait = $('.portrait');
    if (!portrait || reduced) return;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 700);
        portrait.style.translate = '0 ' + (y * 0.06).toFixed(1) + 'px';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── INISIALISASI ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    theme();
    langUI();
    boot();
    navbar();
    reveals();
    tilt();
    cursorGlow();
    scrollUI();
    ripple();
    contactForm();
    parallax();
    particles($('#bootParticles'), 70, false);
    particles($('#heroParticles'), 55, true);
  });
})();