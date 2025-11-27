# ✏️ HƯỚNG DẪN DÙNG EDITOR TRỰC QUAN

## 🎨 Editor Giống Word - Không Cần Biết Code!

Bây giờ tạo nội dung khuyến mãi **DỄ DÀNG** như dùng Word!

---

## 📍 Ở ĐÂU?

**Trang Admin Display Promotions:**
```
http://localhost:3781/admin/display-promotions
```

Click "Thêm Mới" hoặc "✏️ Edit" → Phần **"Nội Dung Khuyến Mãi"**

---

## 🎯 **2 CHẾ ĐỘ:**

### 1️⃣ **Chế độ Trực Quan (WYSIWYG)** - Mặc định
- Giống như Word/Google Docs
- Format bằng toolbar
- Thấy ngay kết quả
- **KHÔNG CẦN BIẾT HTML!**

### 2️⃣ **Chế độ HTML** - Cho người chuyên
- Xem/sửa code HTML trực tiếp
- Cho người muốn chỉnh chi tiết

---

## 🛠️ **TOOLBAR - GIỐNG WORD:**

### **📝 Text Formatting:**
```
B - Bold (Đậm)
I - Italic (Nghiêng)  
U - Underline (Gạch chân)
S - Strike (Gạch ngang)
```

### **🎨 Style:**
```
A - Text color (Màu chữ)
▮ - Background color (Màu nền)
H1, H2, H3 - Headings (Tiêu đề)
```

### **📐 Alignment:**
```
≡ - Left (Trái)
≡ - Center (Giữa)
≡ - Right (Phải)
≡ - Justify (Căn đều)
```

### **📋 Lists:**
```
1. - Numbered list (Danh sách số)
• - Bullet list (Danh sách chấm)
→ - Indent (Thụt vào)
← - Outdent (Lùi ra)
```

### **🔗 Insert:**
```
🔗 - Link (Liên kết)
🖼️ - Image (Hình ảnh)
▶️ - Video
" - Quote (Trích dẫn)
</> - Code block
```

---

## 📝 **VÍ DỤ TẠO KHUYẾN MÃI:**

### **Bước 1: Tạo tiêu đề**
```
Chọn H2 → Nhập: "Mã khuyến mãi: GK01"
```

### **Bước 2: Thêm nội dung**
```
※ Đối tượng: Tất cả thành viên
※ Thời gian: Từ bây giờ
※ Lưu ý: 1 điểm = 1000 VND
```

### **Bước 3: Tạo bảng**
```
Click nút Table → Chọn kích thước
Điền dữ liệu vào các ô
```

### **Bước 4: Format**
```
Select text → Click B để in đậm
Select text → Chọn màu cam
```

### **Bước 5: Toggle xem HTML** (Optional)
```
Click "Xem HTML" → Xem code đã tạo
Chỉnh sửa nếu cần
Click "Chế độ Trực Quan" → Quay lại
```

### **Bước 6: Save**
```
Click "Lưu"
```

---

## 🎯 **TÍNH NĂNG ĐẶC BIỆT:**

### ✅ **Toggle WYSIWYG ↔ HTML:**
```
┌─────────────────────────────────┐
│ ✏️ Chế độ Trực Quan    [Xem HTML] │
├─────────────────────────────────┤
│                                  │
│  [B][I][U] [H1▼] [≡]            │
│  ────────────────────────────── │
│                                  │
│  Nội dung format như Word...     │
│                                  │
└─────────────────────────────────┘

Click [Xem HTML] →

┌─────────────────────────────────┐
│ 📝 Chế độ HTML    [Chế độ Trực Quan] │
├─────────────────────────────────┤
│                                  │
│  <h2>Mã khuyến mãi: GK01</h2>   │
│  <p>※ Đối tượng: ...</p>        │
│  <table>...</table>              │
│                                  │
└─────────────────────────────────┘
```

### ✅ **Tự động chuyển đổi:**
- WYSIWYG → HTML: Tự động
- HTML → WYSIWYG: Tự động render

---

## 💡 **HƯỚNG DẪN CHO NGƯỜI KHÔNG BIẾT CODE:**

### **Muốn in đậm:**
```
1. Bôi đen text
2. Click nút "B"
3. Done!
```

### **Muốn đổi màu:**
```
1. Bôi đen text
2. Click nút màu A (color)
3. Chọn màu cam
4. Done!
```

### **Muốn tạo bảng:**
Dùng HTML mode hoặc copy/paste từ Excel

### **Muốn thêm hình:**
```
1. Click nút 🖼️
2. Nhập URL hình: /images/...
3. Done!
```

### **Muốn tạo danh sách:**
```
1. Nhập text
2. Click nút "•" (bullet)
3. Enter để thêm dòng mới
4. Done!
```

---

## 🎨 **MẸO HAY:**

### **Tip 1: Copy từ Word**
```
Copy nội dung từ Word → Paste vào editor
→ Tự động giữ format!
```

### **Tip 2: Tạo bảng**
```
Toggle sang HTML mode
→ Paste code bảng có sẵn
→ Toggle về WYSIWYG để xem
```

### **Tip 3: Template**
```
Tạo 1 khuyến mãi mẫu
→ Copy HTML
→ Dùng làm template cho các khuyến mãi sau
```

---

## 🔍 **TOOLBAR CHI TIẾT:**

### **Dòng 1: Headers & Font**
```
[H1▼] - Chọn loại tiêu đề (H1, H2, H3...)
[Font▼] - Chọn font chữ
[Size▼] - Chọn cỡ chữ
```

### **Dòng 2: Text Style**
```
[B] - Bold
[I] - Italic
[U] - Underline
[S] - Strikethrough
```

### **Dòng 3: Colors**
```
[A▼] - Text color
[⬛▼] - Background color
```

### **Dòng 4: Alignment**
```
[≡] [≡] [≡] [≡] - Left, Center, Right, Justify
```

### **Dòng 5: Lists**
```
[1.] - Numbered list
[•] - Bullet list
[→] - Indent
[←] - Outdent
```

### **Dòng 6: Insert**
```
[🔗] - Link
[🖼️] - Image
[▶️] - Video
```

### **Dòng 7: Special**
```
["] - Blockquote
[</>] - Code block
[🧹] - Clear formatting
```

---

## ✅ **KẾT QUẢ:**

### **Người KHÔNG biết code có thể:**
- ✅ Format text (đậm, nghiêng, màu)
- ✅ Tạo danh sách
- ✅ Thêm link, hình ảnh
- ✅ Tạo tiêu đề
- ✅ Căn lề
- ✅ Copy/paste từ Word

### **Người BIẾT code có thể:**
- ✅ Toggle sang HTML mode
- ✅ Sửa code trực tiếp
- ✅ Thêm custom HTML/CSS
- ✅ Tạo bảng phức tạp

---

## 🎊 **WORKFLOW:**

```
1. Vào /admin/display-promotions
2. Click "Thêm Mới"
3. Điền: Mã, Tiêu đề, Hình ảnh
4. Phần "Nội Dung":
   → Dùng toolbar để format (như Word)
   → Hoặc click "Xem HTML" để paste code
5. Click "Lưu"
6. Done! ✅
```

---

## 🔥 **DEMO NHANH:**

### **Tạo nội dung này:**

```
※ Mã khuyến mãi: GK99
※ Đối tượng: Tất cả thành viên
※ Thời gian: Từ bây giờ

Chi tiết sự kiện:
Nạp 1,000K nhận 288K thưởng!
```

### **Làm thế nào:**
```
1. Nhập: ※ Mã khuyến mãi: GK99
2. Bôi đen "GK99" → Click B (đậm) → Chọn màu cam
3. Enter xuống dòng
4. Nhập: ※ Đối tượng...
5. Enter 2 lần (dòng trống)
6. Nhập: Chi tiết sự kiện
7. Bôi đen → Chọn H3 (tiêu đề)
8. Nhập nội dung...
```

**Không cần biết HTML! Chỉ cần click click!** 🎉

---

## 📖 **Tóm Tắt:**

```
✨ WYSIWYG Editor (Trực quan)
├── Toolbar đầy đủ như Word
├── Format text dễ dàng
├── Thêm link, hình, video
└── Toggle sang HTML mode bất kỳ lúc nào

🎯 Người không biết code → Dùng WYSIWYG
🎯 Người biết code → Toggle HTML khi cần
```

---

**🚀 TẠO KHUYẾN MÃI GIỜ DỄ NHƯ VIẾT WORD!**

