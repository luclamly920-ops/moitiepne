import React, { useState } from 'react';
import { X, Copy, Check, Github, ExternalLink, Globe, Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'nocode' | 'commands'>('nocode');
  const [repoName, setRepoName] = useState('mellifluous-novel-blog');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const commandSteps = [
    {
      title: 'Bước 1: Khởi tạo Git & gom toàn bộ mã nguồn',
      command: `git init\ngit add .\ngit commit -m "feat: Ra mat Mellifluous Novel Blog"`,
      hint: 'Mở terminal / cmd trong thư mục vừa giải nén và dán lệnh này.',
    },
    {
      title: 'Bước 2: Đổi tên nhánh chính thành main',
      command: `git branch -M main`,
      hint: 'Đảm bảo nhánh mặc định là main để khớp với kịch bản tự động tải web.',
    },
    {
      title: 'Bước 3: Liên kết với kho GitHub của bạn',
      command: `git remote add origin https://github.com/USERNAME/${repoName}.git`,
      hint: 'Thay "USERNAME" bằng tên tài khoản GitHub thật của bạn.',
    },
    {
      title: 'Bước 4: Đẩy mã lên và để GitHub tự động phát hành website',
      command: `git push -u origin main`,
      hint: 'Sau lệnh này, hệ thống GitHub Actions sẽ tự chạy build và web lên sóng!',
    },
  ];

  const fullOneLineScript = `git init && git add . && git commit -m "feat: Ra mat Mellifluous Novel Blog" && git branch -M main && git remote add origin https://github.com/USERNAME/${repoName}.git && git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-slate-700 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-rose-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-rose-50/80 via-amber-50/60 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md border border-slate-700">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading-romantic text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Đăng Tải Lên GitHub & Phát Hành Web
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Miễn phí 100%
                </span>
              </div>
              <p className="font-cute text-xs text-rose-600 dark:text-rose-300">
                Tạo địa chỉ web công khai <strong>username.github.io</strong> hoàn chỉnh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Không cần code (Upload trực tiếp) vs Lệnh Command Line */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 sm:px-6 pt-3 gap-3 bg-slate-50/70 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('nocode')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'nocode'
                ? 'border-rose-500 text-rose-600 dark:text-rose-300'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Cách 1: Dễ nhất (Không cần gõ code)</span>
          </button>

          <button
            onClick={() => setActiveTab('commands')}
            className={`pb-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'commands'
                ? 'border-rose-500 text-rose-600 dark:text-rose-300'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Cách 2: Bộ lệnh Git tự động</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* TAB 1: NO CODE (UPLOAD GIAO DIỆN WEB) */}
          {activeTab === 'nocode' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                🌸 <strong>Bạn không cần biết lập trình:</strong> Dự án đã được thiết lập sẵn file tự động triển khai (<code>.github/workflows/deploy.yml</code>). Khi mã nguồn xuất hiện trên GitHub, GitHub sẽ tự động biên dịch và tạo đường link web vĩnh viễn cho bạn.
              </div>

              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800 dark:text-white mb-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">1</span>
                  <span>Tải mã nguồn về máy tính</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Bấm vào menu góc trên bên phải màn hình AI Studio &rarr; chọn <strong>Export to ZIP</strong> (hoặc tải toàn bộ project về và giải nén ra).
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800 dark:text-white mb-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">2</span>
                  <span>Tạo Repository mới trên GitHub</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Đăng nhập tài khoản tại <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-rose-600 dark:text-rose-400 font-bold underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a>, đặt tên là <code>{repoName}</code>, để chế độ <strong>Public</strong> và bấm <strong>Create repository</strong>.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800 dark:text-white mb-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">3</span>
                  <span>Kéo thả thư mục lên GitHub</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  Trên trang repository vừa tạo, bấm nút <strong>uploading an existing file</strong> &rarr; Kéo toàn bộ các tệp trong thư mục vừa giải nén thả vào trình duyệt &rarr; Bấm <strong>Commit changes</strong>.
                </p>
              </div>

              {/* Step 4: Kích hoạt Pages */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/90 border-2 border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">4</span>
                  <span>Bật chế độ GitHub Actions Pages (Chỉ mất 10 giây)</span>
                </div>
                <ul className="text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5 list-disc list-inside">
                  <li>Vào tab <strong>Settings</strong> của repository trên GitHub.</li>
                  <li>Nhìn cột bên trái, bấm vào mục <strong>Pages</strong>.</li>
                  <li>Ở mục <em>Build and deployment &gt; Source</em>, chọn <strong>GitHub Actions</strong>.</li>
                  <li>Xong! Chờ 1–2 phút, trang web sẽ xuất hiện tại: <span className="font-mono font-bold text-rose-600 dark:text-rose-300 bg-white/80 dark:bg-slate-900 px-1.5 py-0.5 rounded">https://tên-của-bạn.github.io/{repoName}/</span></li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: COMMAND LINE (LỆNH CHO AI HOẶC NGƯỜI DÙNG) */}
          {activeTab === 'commands' && (
            <div className="space-y-4">
              
              {/* Repository Name Input */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Tên kho lưu trữ (Repository Name):
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.trim().toLowerCase().replace(/\s+/g, '-'))}
                  className="px-3 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-mono"
                  placeholder="mellifluous-novel-blog"
                />
              </div>

              {/* Quick 1-Click Complete Script */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-slate-700 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-rose-300">
                    <Sparkles className="w-3.5 h-3.5" /> 1 Lệnh duy nhất sao chép toàn bộ:
                  </span>
                  <button
                    onClick={() => copyToClipboard(fullOneLineScript, 999)}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-all shadow-xs"
                  >
                    {copiedIndex === 999 ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-300" /> Đã sao chép!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Sao chép lệnh này
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-emerald-400 p-2.5 bg-black/40 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                  {fullOneLineScript}
                </pre>
                <p className="text-[10px] text-slate-400 mt-2 italic">
                  * Nhớ đổi chữ <strong>USERNAME</strong> thành tên tài khoản GitHub của bạn trước khi bấm Enter.
                </p>
              </div>

              {/* Step by step commands breakdown */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hoặc chạy từng bước chi tiết:
                </div>
                {commandSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        {step.title}
                      </span>
                      <button
                        onClick={() => copyToClipboard(step.command, idx)}
                        className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === idx ? 'Đã chép' : 'Chép lệnh'}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200/80 dark:border-slate-800">
                      {step.command}
                    </pre>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {step.hint}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-rose-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Trang web hoạt động 24/7 hoàn toàn miễn phí trên GitHub Pages
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-all shadow-xs"
          >
            Đã hiểu & Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
