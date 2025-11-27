# 📸 HƯỚNG DẪN SERVE ẢNH TỪ BACKEND

## ✅ ĐÃ CẬP NHẬT:

Backend (`backend/server.js`) đã được thêm code để serve ảnh static từ thư mục `public/`.

```javascript
// Serve ảnh từ thư mục public
app.use(express.static(path.join(__dirname, '..', 'public')));
```

---

## 🔧 CẤU HÌNH ĐÚNG:

### **1. Backend Port (backend/.env hoặc server.js):**
```env
PORT=3781
```

### **2. Frontend Environment (.env.local):**
```env
# ẢNH SẼ GỌI TỪ BACKEND
NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

---

## 📂 CẤU TRÚC THỨ MỤC:

```
khuyenmai-gk88-main/
├── backend/
│   ├── server.js         ← Serve API + Static files
│   └── images/           ← ẢNH Ở ĐÂY! Backend serve từ đây
│       ├── GK40.png
│       ├── IMG_1172.png
│       └── uploads/      ← Ảnh upload
└── .env.local            ← Config frontend
```

---

## 🚀 RESTART ĐỂ ÁP DỤNG:

### **Bước 1: Stop Backend hiện tại**
```powershell
# Nhấn Ctrl + C trong terminal backend
```

### **Bước 2: Start lại Backend**
```powershell
cd backend
node server.js
```

**Kết quả:** Backend sẽ serve:
- ✅ API: `http://localhost:3781/api/*`
- ✅ Ảnh: `http://localhost:3781/images/*`

---

## 🧪 TEST:

1. **Mở browser:**
   ```
   http://localhost:3781/images/GK40.png
   ```
   
2. **Phải thấy ảnh hiển thị!** ✅

3. **Trong admin panel:** Các ảnh sẽ tự động gọi từ backend

---

## ⚠️ LƯU Ý:

### **Cách 1: Backend Serve Ảnh (Đã setup)**
- ✅ Backend serve cả API + Static files
- ✅ Đơn giản, 1 server duy nhất
- ❌ Backend phải xử lý nhiều request

### **Cách 2: Frontend Serve Ảnh (Khuyến nghị cho production)**
- ✅ Next.js tự động optimize ảnh
- ✅ Backend chỉ lo API
- ⚠️ Cần chạy frontend ở port riêng (3000 hoặc 3781)

---

## 🔄 CHUYỂN VỀ FRONTEND SERVE ẢNH:

Nếu muốn frontend serve ảnh (không dùng backend):

### **1. Sửa .env.local:**
```env
# Bỏ dòng này hoặc để trống
NEXT_PUBLIC_BASE_URL=
```

### **2. Chạy Frontend:**
```powershell
npm run dev
```

Frontend sẽ serve ảnh từ: `http://localhost:3781/images/*`

---

## 📊 SO SÁNH:

| Tính năng | Backend Serve | Frontend Serve |
|-----------|---------------|----------------|
| Port API | 3781 | 3782 |
| Port Ảnh | 3781 | 3781 |
| Số server | 1 | 2 |
| Tối ưu ảnh | ❌ | ✅ (Next.js) |
| Đơn giản | ✅ | ❌ |

---

## ✅ HIỆN TẠI BẠN ĐANG DÙNG:

**Backend Serve Tất Cả** (API + Ảnh) ở port `3781`

Chỉ cần **restart backend** là xong!

