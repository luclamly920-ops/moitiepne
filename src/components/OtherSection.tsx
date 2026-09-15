import React, { useState } from 'react';
import { HeartHandshake, MessageSquare, Send, Sparkles, HelpCircle, Heart, Star } from 'lucide-react';

export const OtherSection: React.FC = () => {
  const [guestComments, setGuestComments] = useState([
    {
      id: 1,
      name: 'Hạ Vy',
      avatar: '🍓',
      time: '14:20 hôm nay',
      text: 'Ghé thăm nhà của Mellifluous! Giao diện hoa anh đào rơi và những lá thư nghiêng nghiêng xinh xỉu luôn á!',
      likes: 12,
    },
    {
      id: 2,
      name: 'Nắng Tháng Sáu',
      avatar: '🌻',
      time: 'Hôm qua',
      text: 'Bộ "Hạ Nhật Phong Ngâm" đọc cảm động quá trời. Cảm ơn Mellifluous đã chăm chỉ dịch truyện cho tụi mình nhé.',
      likes: 8,
    },
    {
      id: 3,
      name: 'Tiểu Mộc',
      avatar: '🍃',
      time: '3 ngày trước',
      text: 'Pass chú mèo Lạc Lạc đáng yêu ghê. Đặt gạch hóng thêm các chương mới của bộ Bức Thư Tình Mười Bảy Tuổi nha!',
      likes: 15,
    },
  ]);

  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌸');

  const avatarOptions = ['🌸', '🍓', '🌻', '🍃', '🎐', '🍧', '💌'];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: inputName.trim() || 'Bạn đọc giấu tên',
      avatar: selectedAvatar,
      time: 'Vừa xong',
      text: inputText.trim(),
      likes: 1,
    };

    setGuestComments([newComment, ...guestComments]);
    setInputText('');
  };

  return (
    <section className="bg-white/90 dark:bg-slate-900/95 rounded-3xl border-2 border-amber-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-amber-100 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-300 shadow-xs text-2xl">
          💌
        </div>
        <div>
          <h2 className="font-heading-romantic text-2xl font-bold text-slate-900 dark:text-white">
            Một Số Mục Khác: Lưu Bút & Góc Tâm Sự
          </h2>
          <p className="font-cute text-xs text-amber-700 dark:text-amber-300">
            Nơi gửi gắm những lời nhắn dịu dàng và những câu hỏi thường gặp
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        
        {/* Left Column: FAQ Card */}
        <div className="space-y-4">
          <h3 className="font-heading-romantic text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-rose-500" />
            <span>Câu Hỏi Thường Gặp (FAQ)</span>
          </h3>

          <div className="p-4 rounded-2xl bg-white/95 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 space-y-3 text-xs">
            <div>
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                Q1: Tại sao truyện có mật khẩu?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-serif-dreamy leading-relaxed">
                Mật khẩu chỉ áp dụng ở các chương cao trào hoặc ngoại truyện để hạn chế các trang reup tự động đánh cắp bản dịch, bảo vệ công sức người dịch.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-50 dark:border-slate-700">
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                Q2: Blog có thu phí đọc truyện không?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-serif-dreamy leading-relaxed">
                Hoàn toàn KHÔNG! Tất cả truyện được chuyển ngữ phi thương mại. Bạn chỉ cần giải các câu đố gợi ý vui vẻ là có thể đọc miễn phí 100%.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-50 dark:border-slate-700">
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                Q3: Tớ có thể xin phép mang truyện đi nơi khác không?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-serif-dreamy leading-relaxed">
                Tớ không đồng ý reup dưới bất kỳ hình thức nào. Vui lòng tôn trọng quyền sở hữu trí tuệ của tác giả và người dịch.
              </p>
            </div>
          </div>
        </div>

        {/* Middle & Right: Guestbook (Lưu bút) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-heading-romantic text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Sổ Lưu Bút Mùa Hè</span>
          </h3>

          {/* Form to leave a message */}
          <form onSubmit={handleAddComment} className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Tên hoặc biệt danh của bạn..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="flex-1 min-w-[160px] px-3 py-1.5 text-xs rounded-xl border border-amber-200 dark:border-slate-700 bg-amber-50/40 dark:bg-slate-900 text-slate-850 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-300"
              />
              {/* Sticker selector */}
              <div className="flex items-center gap-1 bg-amber-50/70 dark:bg-slate-900 p-1 rounded-xl border border-amber-100 dark:border-slate-700">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-6 h-6 rounded-lg text-sm flex items-center justify-center transition-all ${
                      selectedAvatar === emoji ? 'bg-white dark:bg-slate-800 shadow-2xs scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={2}
              placeholder="Gửi vài lời nhắn dịu dàng tới Mellifluous..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-amber-200 dark:border-slate-700 bg-amber-50/40 dark:bg-slate-900 text-slate-850 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-300 mb-2 resize-none"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi lời nhắn</span>
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-3">
            {guestComments.map((comment) => (
              <div
                key={comment.id}
                className="p-3.5 rounded-xl bg-white/95 dark:bg-slate-850 dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 flex items-start gap-3"
              >
                <span className="text-2xl shrink-0 select-none">{comment.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {comment.name}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400">
                      {comment.time}
                    </span>
                  </div>
                  <p className="font-serif-dreamy text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
