# 🌸 Hướng Dẫn Đăng Tải Website Lên GitHub (Mellifluous Novel Blog)

Tài liệu này dành cho bạn nếu bạn **hoàn toàn chưa từng biết lập trình hoặc GitHub**. Bạn chỉ cần làm theo 1 trong 2 cách cực kỳ đơn giản dưới đây để sở hữu một trang web tiểu thuyết hoạt động miễn phí vĩnh viễn 24/7 với tên miền `https://username.github.io/mellifluous-novel-blog/`.

---

## CÁCH 1: KHÔNG CẦN DÙNG LỆNH (Dễ Nhất - Chỉ Kéo Thả Chuột)

### Bước 1: Tải mã nguồn về máy tính
1. Ở góc trên bên phải màn hình làm việc Google AI Studio, bấm vào biểu tượng Menu (hoặc bánh răng cài đặt).
2. Chọn **Export to GitHub** (nếu muốn AI Studio tự đẩy lên tài khoản GitHub của bạn) hoặc chọn **Export to ZIP** / **Download**.
3. Nếu tải file ZIP, hãy giải nén ra một thư mục trên máy tính.

### Bước 2: Tạo kho chứa (Repository) trên GitHub
1. Truy cập vào [https://github.com/new](https://github.com/new) (đăng nhập tài khoản GitHub của bạn).
2. Ở ô **Repository name**, nhập: `mellifluous-novel-blog` (hoặc tên tùy thích viết liền không dấu).
3. Chọn chế độ **Public** (Công khai).
4. Bấm nút xanh **Create repository**.

### Bước 3: Tải các tệp lên GitHub
1. Trên trang vừa tạo xong, bạn sẽ thấy dòng chữ nhỏ: `or upload an existing file`. Hãy bấm vào đó.
2. Mở thư mục code trên máy tính, bôi đen toàn bộ các tệp và thư mục (hoặc kéo thả cả thư mục vừa giải nén) vào ô tải lên của trình duyệt.
3. Kéo xuống dưới cùng và bấm nút xanh **Commit changes**.

### Bước 4: Bật tính năng tạo Website (GitHub Pages)
1. Trên trang repository của bạn, bấm vào tab **Settings** (ở thanh menu phía trên).
2. Nhìn sang cột bên trái, bấm vào mục **Pages**.
3. Tại phần **Build and deployment** > mục **Source**, chuyển từ `Deploy from a branch` sang **`GitHub Actions`**.
4. Xong! Hệ thống đã có sẵn tệp `.github/workflows/deploy.yml` tôi đã cài sẵn cho bạn, GitHub sẽ tự động chạy trong khoảng 1-2 phút và cung cấp cho bạn link web hoàn chỉnh:
   `https://<tên-github-của-bạn>.github.io/mellifluous-novel-blog/`

---

## CÁCH 2: DÙNG BỘ LỆNH GIT TỰ ĐỘNG (Dành Cho Ai Thích Nhanh)

Nếu bạn có cài đặt Git trên máy tính, chỉ cần mở Terminal / Command Prompt tại thư mục dự án và copy dòng lệnh 1-Click này:

```bash
git init
git add .
git commit -m "feat: Ra mat Mellifluous Novel Blog"
git branch -M main
git remote add origin https://github.com/USERNAME/mellifluous-novel-blog.git
git push -u origin main
```

*(Lưu ý: Thay `USERNAME` bằng tên tài khoản GitHub thật của bạn)*

Sau khi chạy xong, hãy vào:
`https://github.com/USERNAME/mellifluous-novel-blog/settings/pages`
-> Chuyển **Source** thành **GitHub Actions**.

Chúc bạn có một trang web đọc truyện thật xinh xắn và ấm áp! 🌸
