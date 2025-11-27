# 📂 CẤU TRÚC ẢNH MỚI - TẤT CẢ ẢNH TRONG BACKEND

## ✅ THAY ĐỔI:

**TRƯỚC (Cũ ❌):**
```
khuyenmai-gk88-main/
├── backend/
│   └── server.js
└── public/
    └── images/          ← Ảnh ở đây (root project)
        ├── IMG_1172.png
        └── uploads/
```

**SAU (Mới ✅):**
```
khuyenmai-gk88-main/
├── backend/
│   ├── server.js
│   └── images/          ← ẢNH Ở ĐÂY! (trong backend)
│       ├── IMG_1172.png
│       ├── IMG_1173.png
│       ├── GK40.png
│       ├── USDT03.png
│       └── uploads/     ← Ảnh upload vào đây
│           └── promo-xxx.png
└── (không còn public/images/)
```

---

## 🔧 THAY ĐỔI TRONG CODE:

### **1. Backend Server (`backend/server.js`):**

#### **Serve Static Files:**
```javascript
// CŨ ❌
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// MỚI ✅
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
```

#### **Upload Directory:**
```javascript
// CŨ ❌
const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'images', 'uploads');

// MỚI ✅
const UPLOAD_DIR = path.join(__dirname, 'images', 'uploads');
```

### **2. Frontend Components:**

**Thêm helper function `getImageUrl()` trong:**
- `src/components/Body.tsx`
- `src/app/admin/display-promotions/page.tsx`

```typescript
// Helper: Lấy full URL cho ảnh
const getImageUrl = (imagePath: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (!baseUrl) return imagePath;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${baseUrl}${imagePath}`;
};

// Sử dụng
<img src={getImageUrl(promo.image)} alt={promo.title} />
```

---

## 📊 FLOW HOẠT ĐỘNG:

```
Browser Request: http://localhost:3781/images/IMG_1172.png
    ↓
Backend Express:
    ↓
app.use('/images', express.static('backend/images'))
    ↓
Express tìm file: backend/images/IMG_1172.png
    ↓
✅ Return file cho browser
```

---

## 🚀 CÁC BƯỚC RESTART:

### **1. Restart Backend (BẮT BUỘC):**

```powershell
cd backend
node server.js
```

**Output:**
```
========================================
✅ Server running on: http://localhost:3781
📂 Serving images from: C:\...\backend\images
🌐 CORS: OPEN (All Origins)
========================================
```

### **2. Rebuild Frontend:**

```powershell
npm run build
```

### **3. Start Frontend:**

```powershell
npm start
```

---

## 🧪 KIỂM TRA:

### **Test 1: Truy cập ảnh trực tiếp**

```
http://localhost:3781/images/IMG_1172.png
http://localhost:3781/images/GK40.png
```

**Kết quả:** Ảnh phải hiển thị! ✅

### **Test 2: Kiểm tra DevTools (F12 → Network)**

Mở trang: `http://localhost:3000`

Xem các request ảnh:
```
Request URL: http://localhost:3781/images/IMG_1172.png
Status: 200 OK
Type: image/png
```

### **Test 3: Upload ảnh mới**

1. Vào `/admin/display-promotions`
2. Thêm mới → Upload ảnh
3. Kiểm tra folder `backend/images/uploads/`
4. File ảnh phải xuất hiện: `promo-{timestamp}-{random}.png` ✅

---

## 📝 DANH SÁCH ẢNH HIỆN CÓ:

```
backend/images/
├── 1.png              (450KB)
├── 2.png              (413KB)
├── 3.png              (483KB)
├── 4.png              (481KB)
├── 5.png              (443KB)
├── 6.png              (488KB)
├── 7.png              (303KB)
├── 8.png              (337KB)
├── 9.jpg              (330KB)
├── banner.jpg         (316KB)
├── CSKH.png          (12KB)
├── DANGCAPNHAT.png   (337KB)
├── dt.gif            (23MB)
├── gifqaqqq.gif      (23MB)
├── GK03.9.jpg        (197KB)
├── GK40.png          (511KB)
├── GK88.png          (138KB)
├── gq01.jpg          (176KB)
├── IMG_1172.png      (460KB)
├── IMG_1173.png      (460KB)
├── le02              (339KB)
├── TRANG CHU.png     (12KB)
├── Untitled-7.png    (55KB)
├── USDT03.png        (470KB)
└── uploads/
    └── (ảnh upload sẽ ở đây)
```

---

## ⚙️ ENVIRONMENT VARIABLES:

### **`.env.local` (Frontend):**
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

### **`backend/.env` (Backend):**
```env
PORT=3781
FRONTEND_URL=http://localhost:3000
```

---

## ✅ CHECKLIST:

- [x] Chuyển folder `images/` vào `backend/`
- [x] Sửa `backend/server.js` serve từ `backend/images/`
- [x] Sửa upload directory thành `backend/images/uploads/`
- [x] Thêm `getImageUrl()` helper vào frontend components
- [x] Cập nhật tài liệu
- [ ] Restart backend
- [ ] Rebuild frontend
- [ ] Test ảnh load đúng

---

## 🎯 LỢI ÍCH:

1. ✅ **Tập trung:** Tất cả ảnh ở 1 nơi (backend)
2. ✅ **Dễ deploy:** Copy `backend/` là có đủ ảnh
3. ✅ **Dễ backup:** Chỉ cần backup folder `backend/images/`
4. ✅ **Không conflict:** Frontend không cần folder `public/images/`
5. ✅ **Consistent:** Upload và serve đều qua backend

---

## 🔄 NẾU CẦN ROLLBACK:

Nếu muốn quay về cấu trúc cũ (ảnh ở `public/`):

```powershell
# Di chuyển ảnh về
mv backend/images public/

# Sửa backend/server.js
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'images', 'uploads');
```

Nhưng **KHÔNG KHUYẾN NGHỊ** vì cấu trúc mới tốt hơn! ✅

---

**GIỜ TẤT CẢ ẢNH ĐỀU Ở TRONG BACKEND/IMAGES/!** 🎉

