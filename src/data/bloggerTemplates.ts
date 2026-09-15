/**
 * Bộ tạo mã nguồn hoàn chỉnh cho Blogger (Blogspot)
 * Tương thích chuẩn XML Theme, HTML Standalone / Widget và TXT Hướng dẫn
 */

export interface BloggerUrlConfig {
  blogUrl: string;
  completedNovelsLabel: string;
  ongoingNovelsLabel: string;
  passwordPagePath: string;
  otherPagePath: string;
}

export const DEFAULT_BLOGGER_CONFIG: BloggerUrlConfig = {
  blogUrl: 'https://mellifluous-summer.blogspot.com',
  completedNovelsLabel: 'Truyện đã hoàn',
  ongoingNovelsLabel: 'Truyện chưa hoàn',
  passwordPagePath: '/p/password.html',
  otherPagePath: '/p/tam-su.html',
};

/**
 * Tạo file XML hoàn chỉnh cho Theme Blogger (Blogspot)
 * Đảm bảo 100% chuẩn cú pháp Google Blogger XML (b:skin, b:section, b:widget Blog1)
 */
export function generateBloggerXml(config: BloggerUrlConfig = DEFAULT_BLOGGER_CONFIG): string {
  const cleanUrl = config.blogUrl.replace(/\/+$/, '');
  const completedUrl = `${cleanUrl}/search/label/${encodeURIComponent(config.completedNovelsLabel)}`;
  const ongoingUrl = `${cleanUrl}/search/label/${encodeURIComponent(config.ongoingNovelsLabel)}`;
  const passwordUrl = config.passwordPagePath.startsWith('http') 
    ? config.passwordPagePath 
    : `${cleanUrl}${config.passwordPagePath.startsWith('/') ? '' : '/'}${config.passwordPagePath}`;
  const otherUrl = config.otherPagePath.startsWith('http') 
    ? config.otherPagePath 
    : `${cleanUrl}${config.otherPagePath.startsWith('/') ? '' : '/'}${config.otherPagePath}`;

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsversion='3' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5' name='viewport'/>
  <title><data:blog.pageTitle/></title>
  <b:include data='blog' name='all-head-content'/>

  <!-- Google Fonts: Be Vietnam Pro, Lora, Playfair Display & Patrick Hand -->
  <link href='https://fonts.googleapis.com' rel='preconnect'/>
  <link crossorigin='anonymous' href='https://fonts.gstatic.com' rel='preconnect'/>
  <link href='https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&amp;family=Lora:ital,wght@0,400;0,600;1,400;1,600&amp;family=Patrick+Hand&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,400&amp;display=swap' rel='stylesheet'/>

  <b:skin><![CDATA[
  /*
  --------------------------------------------------------------------------
  THEME BLOGGER: BETTER AND BETTER - MELLIFLUOUS NOVEL BLOG
  Author: Mellifluous
  Style: Thanh xuân vườn trường, mùa hè lãng mạn & cánh hoa anh đào rơi
  URL Blog: ${cleanUrl}
  --------------------------------------------------------------------------
  */

  :root {
    --bg-main: #fffcf7;
    --card-bg: #ffffff;
    --text-main: #334155;
    --text-heading: #1e293b;
    --rose-primary: #e11d48;
    --rose-accent: #f43f5e;
    --rose-soft: #fff1f2;
    --rose-border: #fecdd3;
    --amber-soft: #fef3c7;
    --border-soft: #f1f5f9;
  }

  [data-theme='dark'] {
    --bg-main: #0f172a;
    --card-bg: #1e293b;
    --text-main: #cbd5e1;
    --text-heading: #f8fafc;
    --rose-primary: #fb7185;
    --rose-accent: #fda4af;
    --rose-soft: #881337;
    --rose-border: #475569;
    --amber-soft: #334155;
    --border-soft: #334155;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Be Vietnam Pro', -apple-system, sans-serif;
    background-color: var(--bg-main);
    color: var(--text-main);
    line-height: 1.7;
    overflow-x: hidden;
    transition: background 0.3s, color 0.3s;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* TOP NAVIGATION HEADER */
  .melli-header {
    background: rgba(255, 255, 255, 0.92);
    border-bottom: 2px solid var(--rose-border);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
  }
  [data-theme='dark'] .melli-header {
    background: rgba(15, 23, 42, 0.92);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    gap: 16px;
  }
  .blog-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }
  .blog-logo-icon {
    font-size: 26px;
    background: #ffe4e6;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .blog-name {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #e11d48;
    line-height: 1.2;
  }
  .blog-tagline {
    font-family: 'Patrick Hand', cursive;
    font-size: 13px;
    color: #b45309;
  }
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nav-link {
    text-decoration: none;
    color: var(--text-main);
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;
  }
  .nav-link:hover, .nav-link.active {
    background: #ffe4e6;
    color: #be123c;
  }

  .theme-toggle-btn {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 13px;
  }
  [data-theme='dark'] .theme-toggle-btn {
    background: #334155;
    border-color: #475569;
    color: #fff;
  }

  /* HERO BANNER */
  .hero-banner {
    background: linear-gradient(135deg, #fff1f2 0%, #fef3c7 50%, #eff6ff 100%);
    border: 2px solid var(--rose-border);
    border-radius: 24px;
    padding: 32px 24px;
    margin: 24px 0;
    box-shadow: 0 4px 20px rgba(244, 63, 94, 0.08);
  }
  [data-theme='dark'] .hero-banner {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--rose-primary);
    margin-bottom: 8px;
  }
  .hero-author {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .hero-quote {
    font-family: 'Patrick Hand', cursive;
    color: #b45309;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .hero-desc {
    font-size: 14px;
    line-height: 1.8;
    max-width: 800px;
    color: var(--text-main);
  }
  .hero-notice {
    display: inline-block;
    background: #ffe4e6;
    color: #9f1239;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    margin-top: 14px;
  }

  /* 4 LETTERS NAVIGATION (Lá Thư Tình) */
  .letters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  .letter-card {
    background: var(--card-bg);
    border: 2px solid var(--rose-border);
    border-radius: 20px;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 160px;
    position: relative;
  }
  .letter-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(244, 63, 94, 0.15);
    border-color: #f43f5e;
  }
  .letter-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .letter-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--rose-soft);
    color: var(--rose-primary);
  }
  .letter-stamp {
    font-size: 18px;
    background: #fff;
    border: 1px dashed #f43f5e;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .letter-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    margin-top: 12px;
    color: var(--text-heading);
  }
  .letter-desc {
    font-size: 13px;
    color: var(--text-main);
    margin-top: 4px;
  }

  /* MAIN LAYOUT WITH SIDEBAR */
  .main-layout {
    display: flex;
    gap: 24px;
    margin-bottom: 40px;
  }
  .content-area {
    flex: 1;
    min-width: 0;
  }
  .sidebar-area {
    width: 320px;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .main-layout {
      flex-direction: column;
    }
    .sidebar-area {
      width: 100%;
    }
  }

  /* POSTS / ARTICLES IN BLOGGER */
  .post-card {
    background: var(--card-bg);
    border: 2px solid var(--rose-border);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
  }
  .post-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    margin-bottom: 12px;
  }
  .post-title a {
    text-decoration: none;
    color: var(--text-heading);
  }
  .post-title a:hover {
    color: var(--rose-primary);
  }
  .post-body {
    font-family: 'Lora', serif;
    font-size: 15px;
    line-height: 1.8;
  }

  /* INTERACTIVE PASSWORD SECTION */
  .pass-box {
    background: var(--card-bg);
    border: 2px solid #bae6fd;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 24px;
  }
  [data-theme='dark'] .pass-box {
    border-color: #0369a1;
  }
  .pass-item {
    background: rgba(240, 249, 255, 0.6);
    border: 1px solid #e0f2fe;
    border-radius: 14px;
    padding: 16px;
    margin-top: 14px;
  }
  [data-theme='dark'] .pass-item {
    background: #0f172a;
    border-color: #1e293b;
  }

  /* CANVAS SAKURA PETALS */
  #sakura-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99;
  }

  /* FOOTER */
  .melli-footer {
    border-top: 2px solid var(--rose-border);
    padding: 32px 0;
    background: linear-gradient(180deg, transparent 0%, rgba(254, 205, 211, 0.2) 100%);
    text-align: center;
    font-size: 13px;
  }
  .footer-links {
    margin-bottom: 12px;
  }
  .footer-links a {
    color: var(--rose-primary);
    text-decoration: none;
    margin: 0 8px;
    font-weight: 600;
  }
  ]]></b:skin>
</head>

<body>
  <!-- Hiệu ứng hoa anh đào rơi -->
  <canvas id='sakura-canvas'></canvas>

  <!-- HEADER THANH ĐIỀU HƯỚNG BLOGGER -->
  <header class='melli-header'>
    <div class='container header-inner'>
      <a class='blog-logo' expr:href='data:blog.homepageUrl'>
        <div class='blog-logo-icon'>🌸</div>
        <div>
          <div class='blog-name'>better and better</div>
          <div class='blog-tagline'>✦ mellifluous novel blog ✦</div>
        </div>
      </a>

      <!-- MENU ĐƯỜNG DẪN BLOGGER CHUẨN -->
      <nav class='nav-menu'>
        <a class='nav-link' expr:href='data:blog.homepageUrl'>Trang chủ</a>
        <a class='nav-link' href='${completedUrl}'>Truyện đã hoàn</a>
        <a class='nav-link' href='${ongoingUrl}'>Truyện chưa hoàn</a>
        <a class='nav-link' href='${passwordUrl}'>Password</a>
        <a class='nav-link' href='${otherUrl}'>Tâm sự / Lưu bút</a>
        
        <!-- Nút đổi nền Sáng / Tối -->
        <button class='theme-toggle-btn' id='theme-btn' onclick='toggleTheme()'>🌙 Chế độ tối</button>
      </nav>
    </div>
  </header>

  <div class='container'>
    <!-- BANNER GIỚI THIỆU CHỦ NHÀ -->
    <section class='hero-banner'>
      <div class='hero-title'>better and better</div>
      <div class='hero-author'>Xin chào, tớ là Mellifluous</div>
      <div class='hero-quote'>━ Một chiếc thuyền nhỏ lênh đênh ngược gió</div>
      <p class='hero-desc'>
        Đây là trang phụ của tớ, đăng linh ta linh tinh. Đăng truyện song song với trang chính, cập nhật muộn và không thường xuyên, phòng ngừa trang chính bị khóa. Truyện trong nhà được chuyển ngữ dưới sự cho phép của tác giả với mục đích phi lợi nhuận.
      </p>
      <div class='hero-notice'>
        🔒 Quy ước mật khẩu: Chữ thường, không hoa, không dấu, viết liền
      </div>
    </section>

    <!-- 4 LÁ THƯ TÌNH ĐIỀU HƯỚNG TRUYỆN BLOGGER -->
    <section class='letters-grid'>
      <a class='letter-card' href='${completedUrl}'>
        <div class='letter-top'>
          <span class='letter-badge'>Thư số 01</span>
          <span class='letter-stamp'>🌸 HOA</span>
        </div>
        <div>
          <div class='letter-title'>Truyện đã hoàn thành</div>
          <div class='letter-desc'>Những bản tình ca mùa hè đã trọn vẹn, sẵn sàng để cậu đọc một mạch.</div>
        </div>
      </a>

      <a class='letter-card' href='${ongoingUrl}'>
        <div class='letter-top'>
          <span class='letter-badge'>Thư số 02</span>
          <span class='letter-stamp'>🍃 GIÓ</span>
        </div>
        <div>
          <div class='letter-title'>Truyện chưa hoàn thành</div>
          <div class='letter-desc'>Đang trong quá trình chuyển ngữ và cập nhật định kỳ mỗi tuần.</div>
        </div>
      </a>

      <a class='letter-card' href='${passwordUrl}'>
        <div class='letter-top'>
          <span class='letter-badge'>Thư số 03</span>
          <span class='letter-stamp'>🔑 MẬT MÃ</span>
        </div>
        <div>
          <div class='letter-title'>Gợi ý Mật khẩu (Password)</div>
          <div class='letter-desc'>Bảo vệ công sức phi thương mại. Câu hỏi gợi ý chi tiết từng chương.</div>
        </div>
      </a>

      <a class='letter-card' href='${otherUrl}'>
        <div class='letter-top'>
          <span class='letter-badge'>Thư số 04</span>
          <span class='letter-stamp'>💌 LƯU BÚT</span>
        </div>
        <div>
          <div class='letter-title'>Một số mục khác &amp; FAQ</div>
          <div class='letter-desc'>Góc tâm sự nhỏ, lưu bút mùa hè và giải đáp những câu hỏi thường gặp.</div>
        </div>
      </a>
    </section>

    <!-- BỐ CỤC CHÍNH BLOGGER: BÀI VIẾT & THANH BÊN -->
    <div class='main-layout'>
      <!-- KHUNG BÀI ĐĂNG BLOGGER CHUẨN WIDGET BLOG1 -->
      <main class='content-area'>
        <b:section class='main' id='main' showaddelement='yes'>
          <b:widget id='Blog1' locked='true' title='Bài đăng trên Blog' type='Blog' version='2'>
            <b:includable id='main' var='top'>
              <b:loop values='data:posts' var='post'>
                <article class='post-card'>
                  <h2 class='post-title'>
                    <a expr:href='data:post.url'><data:post.title/></a>
                  </h2>
                  <div style='font-size: 12px; color: #94a3b8; margin-bottom: 12px;'>
                    📅 Ngày đăng: <data:post.dateHeader/>
                  </div>
                  <div class='post-body'>
                    <data:post.body/>
                  </div>
                </article>
              </b:loop>
            </b:includable>
          </b:widget>
        </b:section>
      </main>

      <!-- SIDEBAR TIỆN ÍCH BLOGGER -->
      <aside class='sidebar-area'>
        <div class='post-card'>
          <h3 style='font-family: "Playfair Display", serif; font-size: 18px; color: #e11d48; margin-bottom: 8px;'>
            🌸 Chủ Nhà Mellifluous
          </h3>
          <p style='font-size: 13px; line-height: 1.7; color: var(--text-main);'>
            Ghé thăm bến đỗ nhỏ của tớ. Nơi lưu giữ những mẩu chuyện thanh xuân, học đường và tình yêu ngọt ngào thời áo trắng.
          </p>
        </div>

        <div class='post-card'>
          <h3 style='font-family: "Playfair Display", serif; font-size: 18px; color: #e11d48; margin-bottom: 8px;'>
            📚 Thể Loại / Nhãn Truyện
          </h3>
          <ul style='list-style: none; font-size: 13px; line-height: 2;'>
            <li><a href='${completedUrl}' style='color: var(--rose-primary); text-decoration: none;'>🌸 ${config.completedNovelsLabel}</a></li>
            <li><a href='${ongoingUrl}' style='color: var(--rose-primary); text-decoration: none;'>🍃 ${config.ongoingNovelsLabel}</a></li>
            <li><a href='${passwordUrl}' style='color: var(--rose-primary); text-decoration: none;'>🔑 Gợi ý Mật khẩu</a></li>
            <li><a href='${otherUrl}' style='color: var(--rose-primary); text-decoration: none;'>💌 Tâm sự &amp; Lưu bút</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>

  <!-- CHÂN TRANG FOOTER -->
  <footer class='melli-footer'>
    <div class='container'>
      <div class='footer-links'>
        <a href='https://facebook.com' rel='noreferrer' target='_blank'>Facebook</a>
        •
        <a href='https://wordpress.com' rel='noreferrer' target='_blank'>WordPress</a>
        •
        <a href='https://wattpad.com' rel='noreferrer' target='_blank'>Wattpad</a>
      </div>
      <div>© 2026 better and better - Mellifluous. Bản chuyển ngữ phi lợi nhuận.</div>
    </div>
  </footer>

  <!-- SCRIPT HOA RƠI & GIAO DIỆN SÁNG TỐI -->
  <script type='text/javascript'>
    //<![CDATA[
    function toggleTheme() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('melli_theme', next);
      var btn = document.getElementById('theme-btn');
      if (btn) btn.innerText = next === 'dark' ? '☀️ Chế độ sáng' : '🌙 Chế độ tối';
    }

    (function initTheme() {
      var saved = localStorage.getItem('melli_theme') || 'light';
      document.documentElement.setAttribute('data-theme', saved);
      var btn = document.getElementById('theme-btn');
      if (btn) btn.innerText = saved === 'dark' ? '☀️ Chế độ sáng' : '🌙 Chế độ tối';
    })();

    // Sakura Canvas Falling Effect
    (function initSakura() {
      var canvas = document.getElementById('sakura-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var width = canvas.width = window.innerWidth;
      var height = canvas.height = window.innerHeight;
      window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      var petals = [];
      for (var i = 0; i < 25; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 7 + 6,
          speedY: Math.random() * 1.2 + 0.8,
          speedX: Math.random() * 0.8 - 0.4,
          angle: Math.random() * 360,
          spin: Math.random() * 2 - 1,
          alpha: Math.random() * 0.5 + 0.3
        });
      }

      function draw() {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < petals.length; i++) {
          var p = petals[i];
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.angle * Math.PI) / 180);
          ctx.beginPath();
          ctx.fillStyle = 'rgba(251, 207, 232, ' + p.alpha + ')';
          ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          p.y += p.speedY;
          p.x += p.speedX;
          p.angle += p.spin;
          if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
        }
        requestAnimationFrame(draw);
      }
      draw();
    })();
    //]]>
  </script>
</body>
</html>`;
}

/**
 * Tạo file HTML hoàn chỉnh (Standalone / Gadget / Landing Page trên Blogger)
 * Hoạt động độc lập trong Tiện ích HTML/JavaScript của Blogger hoặc Trang tĩnh Blogger
 */
export function generateBloggerHtml(config: BloggerUrlConfig = DEFAULT_BLOGGER_CONFIG): string {
  const cleanUrl = config.blogUrl.replace(/\/+$/, '');
  const completedUrl = `${cleanUrl}/search/label/${encodeURIComponent(config.completedNovelsLabel)}`;
  const ongoingUrl = `${cleanUrl}/search/label/${encodeURIComponent(config.ongoingNovelsLabel)}`;
  const passwordUrl = config.passwordPagePath.startsWith('http') 
    ? config.passwordPagePath 
    : `${cleanUrl}${config.passwordPagePath.startsWith('/') ? '' : '/'}${config.passwordPagePath}`;
  const otherUrl = config.otherPagePath.startsWith('http') 
    ? config.otherPagePath 
    : `${cleanUrl}${config.otherPagePath.startsWith('/') ? '' : '/'}${config.otherPagePath}`;

  return `<!-- 
========================================================================
MÃ NGUỒN HTML/CSS/JS ĐỘC LẬP CHO BLOGGER (BLOGSPOT)
Chủ đề: better and better - Mellifluous
Đường dẫn Blog liên kết: ${cleanUrl}
========================================================================
-->
<div id="melli-container" class="melli-root">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Patrick+Hand&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');

    .melli-root {
      font-family: 'Be Vietnam Pro', -apple-system, sans-serif;
      background: linear-gradient(180deg, #fffcf7 0%, #fff7ed 50%, #fff1f2 100%);
      color: #334155;
      padding: 24px;
      border-radius: 28px;
      border: 2px dashed #fecdd3;
      box-shadow: 0 10px 30px rgba(244, 63, 94, 0.08);
      max-width: 1000px;
      margin: 20px auto;
      line-height: 1.7;
    }

    .melli-header-box {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 2px dotted #fda4af;
      margin-bottom: 28px;
    }

    .melli-title {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      font-weight: 700;
      color: #e11d48;
      margin-bottom: 6px;
    }

    .melli-tagline {
      font-family: 'Patrick Hand', cursive;
      font-size: 16px;
      color: #b45309;
      margin-bottom: 12px;
    }

    .melli-intro-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 24px;
      border: 1px solid #fed7aa;
      margin-bottom: 24px;
    }

    .melli-notice {
      display: inline-block;
      background: #ffe4e6;
      color: #9f1239;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      margin-top: 10px;
    }

    /* Lưới các phong thư chuyển hướng */
    .melli-letters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin: 28px 0;
    }

    .melli-letter-btn {
      background: #ffffff;
      border: 2px solid #fecdd3;
      border-radius: 18px;
      padding: 18px;
      text-decoration: none;
      color: #1e293b;
      transition: all 0.25s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 130px;
    }

    .melli-letter-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(244, 63, 94, 0.15);
      border-color: #f43f5e;
    }

    .melli-stamp {
      font-size: 12px;
      font-weight: 700;
      color: #e11d48;
      background: #fff1f2;
      padding: 2px 8px;
      border-radius: 6px;
      width: fit-content;
      margin-bottom: 8px;
    }

    .melli-letter-name {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #9f1239;
    }

    .melli-letter-desc {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }

    /* Khung tra cứu mật khẩu tương tác */
    .melli-pass-checker {
      background: #ffffff;
      border-radius: 20px;
      border: 2px solid #bae6fd;
      padding: 24px;
      margin-top: 24px;
    }

    .melli-pass-input-row {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    .melli-pass-input {
      flex: 1;
      padding: 10px 14px;
      font-size: 13px;
      border-radius: 12px;
      border: 1px solid #cbd5e1;
      outline: none;
    }

    .melli-pass-btn {
      background: #0284c7;
      color: white;
      border: none;
      border-radius: 12px;
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .melli-footer-note {
      text-align: center;
      margin-top: 30px;
      padding-top: 16px;
      border-top: 1px dashed #fda4af;
      font-size: 12px;
      color: #64748b;
    }
  </style>

  <div class="melli-header-box">
    <div class="melli-title">better and better</div>
    <div class="melli-tagline">✦ mellifluous novel blog ✦</div>
    <div style="font-size: 18px; font-weight: 600; color: #881337;">Xin chào, tớ là Mellifluous</div>
    <div style="font-family: 'Patrick Hand', cursive; color: #b45309; font-size: 15px;">━ Một chiếc thuyền nhỏ lênh đênh ngược gió</div>
  </div>

  <div class="melli-intro-card">
    <p style="margin-bottom: 8px;">
      Đây là trang phụ của tớ, đăng linh ta linh tinh. Đăng truyện song song với trang chính, cập nhật muộn và không thường xuyên, phòng ngừa trang chính bị khóa.
    </p>
    <p style="margin-bottom: 8px;">
      Truyện trong nhà được chuyển ngữ dưới sự cho phép của tác giả với mục đích phi lợi nhuận, sẽ có mật khẩu để đảm bảo công sức của tác giả lẫn dịch giả.
    </p>
    <div class="melli-notice">
      🔒 Quy ước mật khẩu: Chữ thường, không hoa, không dấu, viết liền
    </div>
  </div>

  <!-- CÁC ĐƯỜNG DẪN BLOGGER CHUẨN TƯƠNG THÍCH THEO NHÃN -->
  <div class="melli-letters">
    <a href="${completedUrl}" class="melli-letter-btn">
      <div class="melli-stamp">🌸 THƯ 01</div>
      <div class="melli-letter-name">Truyện đã hoàn thành</div>
      <div class="melli-letter-desc">Xem tất cả các bộ truyện đã hoàn tất trên Blogger</div>
    </a>

    <a href="${ongoingUrl}" class="melli-letter-btn">
      <div class="melli-stamp">🍃 THƯ 02</div>
      <div class="melli-letter-name">Truyện chưa hoàn thành</div>
      <div class="melli-letter-desc">Các bộ truyện đang tiến hành cập nhật chương mới</div>
    </a>

    <a href="${passwordUrl}" class="melli-letter-btn">
      <div class="melli-stamp">🔑 THƯ 03</div>
      <div class="melli-letter-name">Gợi ý Mật khẩu</div>
      <div class="melli-letter-desc">Trang tra cứu gợi ý và giải mã password các chương</div>
    </a>

    <a href="${otherUrl}" class="melli-letter-btn">
      <div class="melli-stamp">💌 THƯ 04</div>
      <div class="melli-letter-name">Một số mục khác &amp; FAQ</div>
      <div class="melli-letter-desc">Góc tâm sự, lưu bút mùa hè và câu hỏi thường gặp</div>
    </a>
  </div>

  <!-- CÔNG CỤ THỬ MẬT KHẨU NHANH CHO ĐỘC GIẢ TRÊN BLOGGER -->
  <div class="melli-pass-checker">
    <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #0284c7; margin-bottom: 6px;">
      🔍 Kiểm Tra Mật Khẩu Nhanh (Password Resolver)
    </h3>
    <p style="font-size: 13px; color: #475569;">
      Nhập thử đáp án của cậu vào đây để kiểm tra xem đã chính xác trước khi mở khóa bài viết trên Blogspot nhé:
    </p>
    <div class="melli-pass-input-row">
      <input type="text" id="melli-user-pass" class="melli-pass-input" placeholder="Nhập chữ thường, không dấu (ví dụ: laclac, matcha)..." />
      <button onclick="melliCheckPass()" class="melli-pass-btn">Kiểm tra</button>
    </div>
    <div id="melli-pass-result" style="font-size: 13px; margin-top: 10px; font-weight: 600; display: none;"></div>
  </div>

  <div class="melli-footer-note">
    <div>Ghé thăm: <a href="https://facebook.com" target="_blank" style="color: #e11d48;">Facebook</a> • <a href="https://wordpress.com" target="_blank" style="color: #e11d48;">WordPress</a> • <a href="https://wattpad.com" target="_blank" style="color: #e11d48;">Wattpad</a></div>
    <div style="margin-top: 4px;">© 2026 better and better - Mellifluous. Bản chuyển ngữ phi lợi nhuận.</div>
  </div>

  <script>
    function melliCheckPass() {
      var input = document.getElementById('melli-user-pass');
      var res = document.getElementById('melli-pass-result');
      if (!input || !res) return;
      var val = input.value.trim().toLowerCase();
      var validKeys = ['laclac', '98', 'matcha'];
      if (!val) {
        res.style.display = 'block';
        res.style.color = '#e11d48';
        res.innerText = 'Vui lòng nhập mật khẩu cậu muốn thử!';
        return;
      }
      res.style.display = 'block';
      if (validKeys.indexOf(val) !== -1) {
        res.style.color = '#16a34a';
        res.innerText = '🎉 Chính xác rồi! Cậu dùng mật khẩu "' + val + '" để mở bài viết nhé!';
      } else {
        res.style.color = '#dc2626';
        res.innerText = '❌ Chưa đúng rồi, cậu hãy xem lại gợi ý và nhớ quy ước: chữ thường, không dấu nhé!';
      }
    }
  </script>
</div>`;
}

/**
 * Tạo file TXT tài liệu hướng dẫn và cấu trúc đường dẫn Blogger
 */
export function generateBloggerTxt(config: BloggerUrlConfig = DEFAULT_BLOGGER_CONFIG): string {
  const cleanUrl = config.blogUrl.replace(/\/+$/, '');
  const completedUrl = `${cleanUrl}/search/label/${encodeURIComponent(config.completedNovelsLabel)}`;
  const ongoingUrl = `${cleanUrl}/search/label/${encodeURIComponent(config.ongoingNovelsLabel)}`;
  const passwordUrl = config.passwordPagePath.startsWith('http') 
    ? config.passwordPagePath 
    : `${cleanUrl}${config.passwordPagePath.startsWith('/') ? '' : '/'}${config.passwordPagePath}`;
  const otherUrl = config.otherPagePath.startsWith('http') 
    ? config.otherPagePath 
    : `${cleanUrl}${config.otherPagePath.startsWith('/') ? '' : '/'}${config.otherPagePath}`;

  return `================================================================================
HƯỚNG DẪN CÀI ĐẶT & CẤU TRÚC ĐƯỜNG DẪN BLOGGER (BLOGSPOT) HOÀN CHỈNH
Theme: "better and better - Mellifluous novel blog"
Tác giả / Dịch giả: Mellifluous
================================================================================

I. BẢNG KHỚP ĐƯỜNG DẪN RIÊNG CỦA BLOGGER (URL ARCHITECTURE)
--------------------------------------------------------------------------------
1. Trang chủ Blog:
   Đường dẫn: ${cleanUrl}/
   Ý nghĩa: Nơi hiển thị toàn bộ bài viết mới nhất và banner giới thiệu.

2. Mục "Truyện đã hoàn thành":
   Đường dẫn chuẩn Blogger: ${completedUrl}
   Cấu trúc Blogger: /search/label/[Tên-Nhãn]
   Lưu ý: Khi đăng bài viết truyện đã hoàn thành, bạn chỉ cần gán Nhãn (Label) 
   là "${config.completedNovelsLabel}" thì bài viết sẽ tự động xuất hiện ở link này!

3. Mục "Truyện chưa hoàn thành" (Đang tiến hành):
   Đường dẫn chuẩn Blogger: ${ongoingUrl}
   Cấu trúc Blogger: /search/label/[Tên-Nhãn]
   Lưu ý: Khi đăng bài viết truyện đang ra, bạn chỉ cần gán Nhãn (Label) 
   là "${config.ongoingNovelsLabel}".

4. Trang "Gợi ý Mật khẩu (Password)":
   Đường dẫn chuẩn Blogger: ${passwordUrl}
   Cách tạo trên Blogger: Vào quản trị -> Trang (Pages) -> Tạo trang mới 
   -> Đặt tiêu đề là "Password" hoặc "Gợi ý mật khẩu" và xuất bản với URL ${config.passwordPagePath}.

5. Mục "Một số mục khác & FAQ / Lưu bút":
   Đường dẫn chuẩn Blogger: ${otherUrl}
   Cách tạo trên Blogger: Vào quản trị -> Trang (Pages) -> Tạo trang mới 
   -> Đặt tiêu đề là "Tâm sự" hoặc "Lưu bút mùa hè".

6. Bài viết từng chương truyện:
   Cấu trúc tự động của Blogger: ${cleanUrl}/YYYY/MM/ten-bai-viet.html
   Ví dụ: ${cleanUrl}/2026/09/ha-nhat-phong-ngam-chuong-1.html

--------------------------------------------------------------------------------
II. HƯỚNG DẪN 3 CÁCH SỬ DỤNG CÁC FILE TRÊN BLOGGER
--------------------------------------------------------------------------------

【CÁCH 1: CÀI ĐẶT TRỌN BỘ GIAO DIỆN BẰNG FILE XML (blogger-theme.xml)】
- Bước 1: Đăng nhập vào Blogger.com -> Chọn Blog của bạn.
- Bước 2: Nhấp vào mục "Chủ đề" (Theme) ở thanh bên trái.
- Bước 3: Nhấp vào dấu 3 chấm cạnh nút "Tùy chỉnh" -> Chọn "Khôi phục" (Restore).
- Bước 4: Nhấp "Tải lên" (Upload) và chọn file "blogger-theme.xml" bạn đã tải về.
  (Hoặc nhấp "Chỉnh sửa HTML" (Edit HTML) rồi sao chép toàn bộ nội dung file XML dán đè vào).
- Bước 5: Nhấp biểu tượng Lưu (Save) ở góc phải dưới. Giao diện blog của bạn sẽ lập tức 
  biến thành blog "better and better" thơ mộng chuẩn 100%!

【CÁCH 2: DÙNG WIDGET TIỆN ÍCH BẰNG FILE HTML (blogger-template.html)】
- Dành cho bạn nào muốn giữ nguyên theme Blogger hiện tại nhưng muốn có thêm:
  + Khung giới thiệu Mellifluous
  + 4 lá thư tình chuyển mục
  + Công cụ kiểm tra mật khẩu cho độc giả
- Bước 1: Vào Blogger -> Mục "Bố cục" (Layout).
- Bước 2: Nhấp vào "Thêm tiện ích" (Add a Gadget) ở khu vực đầu trang hoặc thanh bên.
- Bước 3: Chọn loại tiện ích "HTML/JavaScript".
- Bước 4: Mở file "blogger-template.html", sao chép toàn bộ và dán vào ô Nội dung.
- Bước 5: Nhấp Lưu (Save)!

【CÁCH 3: TẠO TRANG TĨNH CHO PASSWORD HOẶC MỤC LỤC TRUYỆN】
- Bước 1: Vào Blogger -> Mục "Trang" (Pages) -> Nhấp "Trang mới" (New Page).
- Bước 2: Chuyển chế độ soạn thảo sang "Chế độ xem HTML" (biểu tượng bút chì -> HTML View).
- Bước 3: Dán mã HTML vào và xuất bản trang!

--------------------------------------------------------------------------------
III. QUY ƯỚC MẬT KHẨU DÀNH CHO BẠN ĐỌC
- Chữ thường, không hoa, không dấu, viết liền không dấu cách.
- Bảo vệ công sức chuyển ngữ phi lợi nhuận.
================================================================================
`;
}
