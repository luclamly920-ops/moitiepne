import React, { useState } from 'react';
import { X, Lock, Unlock, Key, ArrowLeft, ArrowRight, Eye, Heart, BookOpen, Share2, Sparkles, Check } from 'lucide-react';
import { Chapter, Novel } from '../types';

interface ChapterReaderModalProps {
  novel: Novel;
  chapter: Chapter;
  onClose: () => void;
  onSwitchChapter: (chapterNumber: number) => void;
  onOpenPasswordHints: () => void;
}

export const ChapterReaderModal: React.FC<ChapterReaderModalProps> = ({
  novel,
  chapter,
  onClose,
  onSwitchChapter,
  onOpenPasswordHints,
}) => {
  const [enteredPass, setEnteredPass] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(!chapter.isLocked);
  const [passError, setPassError] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [themeMode, setThemeMode] = useState<'cream' | 'white' | 'night'>(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'night';
    }
    return 'cream';
  });
  const [liked, setLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = enteredPass.trim().toLowerCase();
    const correctPass = (chapter.passwordAnswer || 'laclac').toLowerCase();

    if (cleanInput === correctPass) {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const currentIdx = novel.chapters.findIndex((c) => c.number === chapter.number);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < novel.chapters.length - 1;

  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  };

  const themeClasses = {
    cream: 'bg-[#fefaf0] text-[#3e3436]',
    white: 'bg-white text-slate-800',
    night: 'bg-[#181824] text-[#e2e8f0]',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl border border-rose-200/60 dark:border-slate-700 transition-colors duration-200 overflow-hidden my-auto ${themeClasses[themeMode]}`}>
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-rose-100 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              title="Quay lại"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h2 className="text-xs sm:text-sm font-semibold truncate text-rose-600 dark:text-rose-400">
                {novel.title}
              </h2>
              <div className="text-xs text-slate-500 truncate">
                Chương {chapter.number}: {chapter.title}
              </div>
            </div>
          </div>

          {/* Reading Customization Controls */}
          <div className="flex items-center gap-2">
            {/* Font size switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-2xs' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-2xs' : 'text-slate-500'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded ${fontSize === 'xl' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-2xs' : 'text-slate-500'}`}
              >
                A++
              </button>
            </div>

            {/* Background Theme Mode */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setThemeMode('cream')}
                className={`w-5 h-5 rounded-full bg-[#fefaf0] border border-amber-300 ${themeMode === 'cream' ? 'ring-2 ring-rose-400' : ''}`}
                title="Giấy kem ấm"
              />
              <button
                onClick={() => setThemeMode('white')}
                className={`w-5 h-5 rounded-full bg-white border border-slate-300 ${themeMode === 'white' ? 'ring-2 ring-rose-400' : ''}`}
                title="Trắng sáng"
              />
              <button
                onClick={() => setThemeMode('night')}
                className={`w-5 h-5 rounded-full bg-[#181824] border border-slate-700 ${themeMode === 'night' ? 'ring-2 ring-rose-400' : ''}`}
                title="Ban đêm"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter Body Container */}
        <div className="p-6 sm:p-12 max-w-3xl mx-auto min-h-[500px]">
          
          {/* Chapter Heading */}
          <div className="text-center mb-8 pb-6 border-b border-rose-100/60 dark:border-slate-800">
            <span className="text-xs font-cute text-rose-500 dark:text-rose-400 uppercase tracking-widest">
              {novel.title}
            </span>
            <h1 className="font-heading-romantic text-2xl sm:text-3xl font-bold mt-2 mb-3">
              {chapter.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-xs opacity-70">
              <span>Đăng ngày: {chapter.releaseDate}</span>
              <span>•</span>
              <span>{chapter.wordCount.toLocaleString()} chữ</span>
              <span>•</span>
              <span>Edit: {novel.translator}</span>
            </div>
          </div>

          {/* Locked Chapter Guard */}
          {!isUnlocked ? (
            <div className="my-10 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/30 text-center max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-500 mb-4 shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              
              <h3 className="font-heading-romantic text-xl font-bold text-rose-900 dark:text-rose-200 mb-2">
                Chương này được cài mật khẩu
              </h3>
              
              <p className="font-serif-dreamy text-xs text-rose-700/90 dark:text-rose-300 mb-4 leading-relaxed">
                {chapter.passwordHint || 'Vui lòng giải câu đố ở mục Password để lấy khóa mở chương truyện này.'}
              </p>

              <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={enteredPass}
                  onChange={(e) => {
                    setEnteredPass(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="Nhập pass (viết thường, không dấu)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />

                {passError && (
                  <p className="text-xs text-rose-600 font-semibold">
                    Sai mật khẩu rồi bạn ơi! Hãy bấm "Xem gợi ý mật khẩu" bên dưới nhé.
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Mở khóa chương</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenPasswordHints}
                    className="px-4 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 font-medium text-xs hover:bg-amber-200 transition-colors flex items-center gap-1"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Xem gợi ý pass</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Unlocked Chapter Reading Content */
            <div className={`font-serif-dreamy ${fontClasses[fontSize]} whitespace-pre-line space-y-4`}>
              {chapter.content}
            </div>
          )}

          {/* Chapter Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-rose-100/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              disabled={!hasPrev}
              onClick={() => hasPrev && onSwitchChapter(novel.chapters[currentIdx - 1].number)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 border ${
                hasPrev
                  ? 'border-rose-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  : 'opacity-40 cursor-not-allowed border-transparent'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Chương trước</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  liked
                    ? 'bg-rose-500 text-white border-rose-500 scale-105'
                    : 'border-rose-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-white' : 'text-rose-500'}`} />
                <span>{liked ? 'Đã thả tim' : 'Thả tim chương'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-3 py-2 rounded-xl border border-rose-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Đã sao chép' : 'Chia sẻ'}</span>
              </button>
            </div>

            <button
              disabled={!hasNext}
              onClick={() => hasNext && onSwitchChapter(novel.chapters[currentIdx + 1].number)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white shadow-xs ${
                !hasNext ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <span>Chương sau</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Reader Comment / Warm message */}
          <div className="mt-8 p-4 rounded-2xl bg-rose-50/60 dark:bg-slate-850 dark:bg-slate-800/50 border border-rose-100 dark:border-slate-700 text-center">
            <p className="font-cute text-xs text-rose-600 dark:text-rose-300">
              💌 Cảm ơn bạn đã ghé thăm và ủng hộ bản dịch phi thương mại của Mellifluous!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
