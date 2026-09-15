import React from 'react';
import { X, BookOpen, Star, Eye, Lock, CheckCircle2, Clock, Calendar, Heart, Share2 } from 'lucide-react';
import { Novel, Chapter } from '../types';

interface NovelDetailModalProps {
  novel: Novel;
  onClose: () => void;
  onReadChapter: (chapter: Chapter) => void;
}

export const NovelDetailModal: React.FC<NovelDetailModalProps> = ({
  novel,
  onClose,
  onReadChapter,
}) => {
  const isCompleted = novel.status === 'completed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-slate-700 shadow-2xl overflow-hidden my-auto">
        
        {/* Header Banner */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${novel.coverColor} dark:from-slate-800 dark:via-rose-950/40 dark:to-slate-900 border-b border-rose-100 dark:border-slate-800 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-600 dark:text-slate-300 shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isCompleted ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              {isCompleted ? 'Trọn bộ (Hoàn)' : 'Đang tiến hành'}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {novel.category}
            </span>
          </div>

          <h2 className="font-heading-romantic text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {novel.title}
          </h2>
          <p className="font-cute text-sm text-slate-700 dark:text-slate-300">
            {novel.originalTitle}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-600 dark:text-slate-300">
            <span>Tác giả: <strong>{novel.author}</strong></span>
            <span>•</span>
            <span>Chuyển ngữ: <strong>{novel.translator}</strong></span>
            <span>•</span>
            <span>Đánh giá: <strong>★ {novel.rating}</strong></span>
            <span>•</span>
            <span>Cập nhật: <strong>{novel.lastUpdated}</strong></span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Summary */}
          <div>
            <h3 className="font-heading-romantic text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
              Giới thiệu nội dung
            </h3>
            <p className="font-serif-dreamy text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {novel.summary}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {novel.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Password Notice */}
          {novel.passwordNotice && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{novel.passwordNotice}</span>
            </div>
          )}

          {/* Chapter Table of Contents */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading-romantic text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span>Danh Sách Chương ({novel.chapters.length})</span>
              </h3>
              <span className="text-xs text-slate-400">Bấm chương để đọc</span>
            </div>

            <div className="divide-y divide-rose-50 dark:divide-slate-800 border border-rose-100 dark:border-slate-800 rounded-2xl overflow-hidden">
              {novel.chapters.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => {
                    onReadChapter(ch);
                    onClose();
                  }}
                  className="p-3.5 hover:bg-rose-50/70 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-xs font-bold text-rose-500 text-center">
                      #{ch.number}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors line-clamp-1">
                        {ch.title}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {ch.releaseDate} • {ch.wordCount.toLocaleString()} chữ
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {ch.isLocked && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Có pass
                      </span>
                    )}
                    <span className="text-xs text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Đọc ngay ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
