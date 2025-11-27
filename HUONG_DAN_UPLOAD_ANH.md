# 📤 HƯỚNG DẪN UPLOAD ẢNH TỪ LOCAL

## 🎯 Tính Năng Mới

Bây giờ bạn có thể **upload ảnh từ máy tính** thay vì chỉ nhập URL!

---

## 🔧 SETUP

### **Bước 1: Cài Package `multer` cho Backend**

```bash
cd backend
npm install
```

### **Bước 2: Restart Backend**

```powershell
# Ctrl + C để dừng
node server.js
```

---

## 📸 CÁCH SỬ DỤNG

### **Trang Admin → Display Promotions:**

1. Click **"Thêm Mới"** hoặc **"Sửa"** một khuyến mãi
2. Ở trường **"Đường Dẫn Hình Ảnh"**:
   - **Option 1:** Nhập URL trực tiếp: `/images/IMG_1172.png`
   - **Option 2:** Click **"📤 Upload Ảnh"** → Chọn file từ máy tính

3. Sau khi upload thành công:
   - Ảnh tự động lưu vào `backend/images/uploads/`
   - Đường dẫn tự động điền vào ô input
   - Preview ảnh hiện ra bên dưới

---

## ✅ ĐỊNH DẠNG ẢNH HỖ TRỢ

- ✅ JPEG / JPG
- ✅ PNG
- ✅ GIF
- ✅ WEBP

**Kích thước tối đa:** 5MB

---

## 📂 ĐƯỜNG DẪN ẢNH

### **Ảnh được lưu tại:**
```
backend/images/uploads/promo-{timestamp}-{random}.jpg
```

### **Ví dụ:**
```
/images/uploads/promo-1732701234567-123456789.jpg
```

### **Ảnh có thể truy cập qua:**
```
http://localhost:3781/images/uploads/promo-xxx.jpg
```

---

## 🔌 API ENDPOINT

### **POST `/api/upload-image`**

**Request:**
```javascript
const formData = new FormData();
formData.append('image', file);

fetch('http://localhost:3782/api/upload-image', {
  method: 'POST',
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "imagePath": "/images/uploads/promo-1732701234567-123456789.jpg",
  "filename": "promo-1732701234567-123456789.jpg"
}
```

---

## ⚙️ CẤU HÌNH NÂNG CAO

### **Thay đổi kích thước file tối đa:**

Sửa trong `backend/server.js`:

```javascript
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB thay vì 5MB
  // ...
});
```

### **Thêm định dạng ảnh khác:**

```javascript
const allowedTypes = /jpeg|jpg|png|gif|webp|svg|bmp/;
```

---

## 🐛 XỬ LÝ LỖI

### **Lỗi: "Không có file được upload"**
→ Kiểm tra input có `name="image"` và `accept="image/*"`

### **Lỗi: "Chỉ chấp nhận file ảnh"**
→ File không phải định dạng ảnh được chấp nhận

### **Lỗi: "File size too large"**
→ Ảnh vượt quá 5MB, nén ảnh lại hoặc tăng limit

### **Lỗi 404 khi hiển thị ảnh**
→ Kiểm tra folder `backend/images/uploads/` đã tồn tại

---

## 🎨 UI/UX

### **Trước Upload:**
```
[___________________] [📤 Upload Ảnh]
```

### **Sau Upload:**
```
[/images/uploads/...] [📤 Upload Ảnh]
[Preview ảnh hiện ở đây]
```

---

## 🚀 PRODUCTION

### **Khi deploy:**

1. Đảm bảo folder `backend/images/uploads/` có quyền write
2. Cân nhắc dùng CDN (Cloudinary, AWS S3) thay vì lưu local
3. Thêm backup cho folder uploads

---

## 🎉 HOÀN THÀNH!

Bây giờ bạn có thể:
- ✅ Upload ảnh trực tiếp từ máy tính
- ✅ Hoặc nhập URL như trước
- ✅ Preview ảnh trước khi lưu
- ✅ Tự động rename file để tránh trùng

**Enjoy! 🎊**

