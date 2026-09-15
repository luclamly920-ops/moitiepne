import React, { useState, useMemo } from 'react';
import { 
  X, Code, Copy, Check, Info, FileCode, Download, 
  ExternalLink, Settings2, FileText, CheckCircle2, Globe, Link2 
} from 'lucide-react';
import { 
  generateBloggerXml, 
  generateBloggerHtml, 
  generateBloggerTxt, 
  DEFAULT_BLOGGER_CONFIG, 
  BloggerUrlConfig 
} from '../data/bloggerTemplates';

interface BloggerExporterModalProps {
  onClose: () => void;
}

type TabType = 'xml' | 'html' | 'txt' | 'settings' | 'guide';

export const BloggerExporterModal: React.FC<BloggerExporterModalProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('xml');
  const [copied, setCopied] = useState<string | null>(null);

  // Custom Blogger URL Configuration
  const [config, setConfig] = useState<BloggerUrlConfig>(DEFAULT_BLOGGER_CONFIG);

  // Generated contents based on user URL config
  const xmlContent = useMemo(() => generateBloggerXml(config), [config]);
  const htmlContent = useMemo(() => generateBloggerHtml(config), [config]);
  const txtContent = useMemo(() => generateBloggerTxt(config), [config]);

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard?.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentContent = useMemo(() => {
    if (selectedTab === 'xml') return { text: xmlContent, ext: 'xml', mime: 'text/xml', name: 'blogger-theme.xml' };
    if (selectedTab === 'html') return { text: htmlContent, ext: 'html', mime: 'text/html', name: 'blogger-template.html' };
    if (selectedTab === 'txt') return { text: txtContent, ext: 'txt', mime: 'text/plain', name: 'blogger-guide-and-code.txt' };
    return null;
  }, [selectedTab, xmlContent, htmlContent, txtContent]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-800 shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-800 dark:to-slate-900 border-b border-emerald-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shadow-2xs shrink-0">
              <Code className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="font-heading-romantic text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                Xuất Trọn Bộ Mã Nguồn Cho Blogger (Blogspot)
              </h2>
              <p className="font-cute text-xs text-emerald-700 dark:text-emerald-400">
                Khớp từng đường dẫn riêng của Blogger • Bao gồm đầy đủ file XML, HTML và TXT
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Download All Bar */}
        <div className="bg-emerald-50/80 dark:bg-slate-800/80 border-b border-emerald-100 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tải nhanh 3 file hoàn chỉnh về máy:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handleDownload('blogger-theme.xml', xmlContent, 'text/xml')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-mono font-semibold flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-rose-500" />
              <span>.XML (Theme)</span>
            </button>
            <button
              onClick={() => handleDownload('blogger-template.html', htmlContent, 'text/html')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-mono font-semibold flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span>.HTML (Trang)</span>
            </button>
            <button
              onClick={() => handleDownload('blogger-guide-and-code.txt', txtContent, 'text/plain')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-mono font-semibold flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>.TXT (Hướng dẫn)</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 pt-2 bg-slate-50 dark:bg-slate-900/50 scrollbar-none">
          <button
            onClick={() => setSelectedTab('xml')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTab === 'xml'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <FileCode className="w-4 h-4 text-rose-500" />
            <span>File XML (Theme Blogger)</span>
          </button>
          
          <button
            onClick={() => setSelectedTab('html')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTab === 'html'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Code className="w-4 h-4 text-sky-500" />
            <span>File HTML (Gadget / Trang Tĩnh)</span>
          </button>

          <button
            onClick={() => setSelectedTab('txt')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTab === 'txt'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span>File TXT (Tài Liệu &amp; Code)</span>
          </button>

          <button
            onClick={() => setSelectedTab('settings')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTab === 'settings'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Settings2 className="w-4 h-4 text-emerald-600" />
            <span>Cấu Hình Đường Dẫn Blog</span>
          </button>

          <button
            onClick={() => setSelectedTab('guide')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTab === 'guide'
                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Info className="w-4 h-4 text-indigo-500" />
            <span>Hướng Dẫn Cài Đặt</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {/* VIEW FILE CONTENT TABS (XML, HTML, TXT) */}
          {currentContent && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                    {currentContent.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                    (Tương thích 100% Blogger Free)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentContent.text, selectedTab)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    {copied === selectedTab ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === selectedTab ? 'Đã sao chép!' : 'Sao chép mã'}</span>
                  </button>

                  <button
                    onClick={() => handleDownload(currentContent.name, currentContent.text, currentContent.mime)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải về .{currentContent.ext}</span>
                  </button>
                </div>
              </div>

              {/* Code display box */}
              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto max-h-[380px] border border-slate-700 selection:bg-rose-500 selection:text-white">
                  {currentContent.text}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Đoạn mã tự động đồng bộ hóa với tên miền blog của bạn: <code className="font-mono font-bold text-rose-600 dark:text-rose-400">{config.blogUrl}</code>. Bạn có thể sang tab <strong>"Cấu hình đường dẫn Blog"</strong> để thay đổi tên miền blog cá nhân của bạn bất kỳ lúc nào!
                </span>
              </div>
            </div>
          )}

          {/* TAB CẤU HÌNH ĐƯỜNG DẪN BLOGGER (URL MAPPING) */}
          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Cá Nhân Hóa Tên Miền &amp; Đường Dẫn Blogspot Của Bạn</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Nhập địa chỉ Blogspot của bạn vào đây, hệ thống sẽ tự động thay thế toàn bộ liên kết trong cả 3 file XML, HTML và TXT để khớp chính xác với blog thật của bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Đường dẫn Blog chính (URL Blogspot):
                  </label>
                  <input
                    type="text"
                    value={config.blogUrl}
                    onChange={(e) => setConfig({ ...config, blogUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://tenblogcuaban.blogspot.com"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Ví dụ: https://mellifluous-summer.blogspot.com
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tên Nhãn (Label) Truyện đã hoàn thành:
                  </label>
                  <input
                    type="text"
                    value={config.completedNovelsLabel}
                    onChange={(e) => setConfig({ ...config, completedNovelsLabel: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Truyện đã hoàn"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    URL sinh ra: /search/label/{encodeURIComponent(config.completedNovelsLabel)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tên Nhãn (Label) Truyện chưa hoàn thành:
                  </label>
                  <input
                    type="text"
                    value={config.ongoingNovelsLabel}
                    onChange={(e) => setConfig({ ...config, ongoingNovelsLabel: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Truyện chưa hoàn"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    URL sinh ra: /search/label/{encodeURIComponent(config.ongoingNovelsLabel)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Đường dẫn Trang tĩnh Password:
                  </label>
                  <input
                    type="text"
                    value={config.passwordPagePath}
                    onChange={(e) => setConfig({ ...config, passwordPagePath: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="/p/password.html"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Tạo tại: Quản trị Blogger ➔ Trang (Pages) ➔ /p/password.html
                  </span>
                </div>
              </div>

              {/* URL Preview Table */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-emerald-600" />
                  <span>Bảng xem trước các liên kết sẽ áp dụng vào code:</span>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  <div className="p-3 bg-white dark:bg-slate-900 flex justify-between gap-4">
                    <span className="text-slate-500 font-sans">🌸 Truyện đã hoàn:</span>
                    <span className="text-rose-600 dark:text-rose-400 truncate">
                      {config.blogUrl}/search/label/{encodeURIComponent(config.completedNovelsLabel)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 flex justify-between gap-4">
                    <span className="text-slate-500 font-sans">🍃 Truyện chưa hoàn:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 truncate">
                      {config.blogUrl}/search/label/{encodeURIComponent(config.ongoingNovelsLabel)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 flex justify-between gap-4">
                    <span className="text-slate-500 font-sans">🔑 Gợi ý Mật khẩu:</span>
                    <span className="text-blue-600 dark:text-blue-400 truncate">
                      {config.blogUrl}{config.passwordPagePath.startsWith('/') ? '' : '/'}{config.passwordPagePath}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedTab('xml')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Xem mã với URL vừa thiết lập</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB HƯỚNG DẪN CÀI ĐẶT CHI TIẾT */}
          {selectedTab === 'guide' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cách 1 */}
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-800/90 border border-rose-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2 font-bold text-rose-800 dark:text-rose-300 text-sm">
                    <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    <span>Cài Đặt File XML (Toàn Bộ Giao Diện)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    Giúp blog của bạn có giao diện thơ mộng, hoa rơi và 4 lá thư tình ngay lập tức.
                  </p>
                  <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal pl-4">
                    <li>Tải file <strong>blogger-theme.xml</strong> về máy.</li>
                    <li>Vào <a href="https://blogger.com" target="_blank" rel="noreferrer" className="text-rose-600 underline">Blogger.com</a> ➔ Mục <strong>Chủ đề (Theme)</strong>.</li>
                    <li>Nhấp dấu 3 chấm cạnh nút Tùy chỉnh ➔ Chọn <strong>Khôi phục (Restore)</strong>.</li>
                    <li>Tải file XML lên và nhấn Lưu!</li>
                  </ol>
                </div>

                {/* Cách 2 */}
                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800/90 border border-sky-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2 font-bold text-sky-800 dark:text-sky-300 text-sm">
                    <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>Cài Đặt File HTML (Tiện Ích Gadget)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    Nếu bạn muốn giữ giao diện blog hiện tại và chỉ thêm banner + 4 lá thư tình.
                  </p>
                  <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal pl-4">
                    <li>Sao chép mã trong tab <strong>File HTML</strong>.</li>
                    <li>Vào Blogger ➔ Mục <strong>Bố cục (Layout)</strong>.</li>
                    <li>Nhấp <strong>Thêm tiện ích (Add a Gadget)</strong> ➔ Loại <strong>HTML/JavaScript</strong>.</li>
                    <li>Dán mã vào ô Nội dung và nhấn <strong>Lưu</strong>!</li>
                  </ol>
                </div>
              </div>

              {/* Cách phân loại bài viết bằng Nhãn (Labels) */}
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-xs">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm mb-2 flex items-center gap-1.5">
                  <span>🏷️ Cách Đăng Bài Để Tự Động Xuất Hiện Ở Các Mục Thư:</span>
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong>Truyện đã hoàn:</strong> Khi đăng bài, ở ô <strong>Nhãn (Labels)</strong> bên phải, gõ <code className="bg-amber-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono font-bold">{config.completedNovelsLabel}</code>.
                  </li>
                  <li>
                    <strong>Truyện chưa hoàn:</strong> Gán Nhãn là <code className="bg-amber-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono font-bold">{config.ongoingNovelsLabel}</code>.
                  </li>
                  <li>
                    <strong>Trang Password:</strong> Vào mục <strong>Trang (Pages)</strong> ➔ Tạo trang mới ➔ Đặt tên là Password và xuất bản với đường dẫn <code className="bg-amber-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono font-bold">{config.passwordPagePath}</code>.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
