# 🚀 HƯỚNG DẪN BUILD & CHẠY PRODUCTION

## ✅ CẤU HÌNH HIỆN TẠI:

```
Frontend (Next.js):  localhost:3000  (npm start)
Backend (Express):   localhost:3781  (node backend/server.js)
```

**TẤT CẢ requests (API + ảnh)** đều gọi vào backend `localhost:3781`

---

## 📂 CẤU TRÚC:

```
khuyenmai-gk88-main/
├── backend/
│   ├── server.js         ← API + Static files (port 3781)
│   └── images/           ← ẢNH Ở ĐÂY! Backend serve từ đây
│       ├── IMG_1172.png
│       ├── GK40.png
│       └── uploads/      ← Ảnh upload
├── .env.local            ← Config BASE_URL
└── package.json          ← Frontend scripts
```

---

## 🔧 SETUP:

### **1. File `.env.local` (Frontend):**

```env
# Backend URL - TẤT CẢ requests gọi vào đây
NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

### **2. File `backend/.env` (Backend):**

```env
# Backend port
PORT=3781

# Frontend URL (cho CORS)
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 CHẠY PRODUCTION:

### **Bước 1: Build Frontend**

```powershell
npm run build
```

**Kết quả:**
```
✓ Compiled successfully
✓ Linting and checking validity of types    
✓ Generating static pages (15/15)
✓ Finalizing page optimization
```

### **Bước 2: Start Backend**

```powershell
cd backend
node server.js
```

**Kết quả:**
```
========================================
✅ Server running on: http://localhost:3781
📂 Data directory: C:\...\data
🌐 CORS: OPEN (All Origins)
========================================
```

### **Bước 3: Start Frontend**

```powershell
npm start
```

**Kết quả:**
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
✓ Ready in 630ms
```

---

## 🧪 KIỂM TRA:

### **1. Truy cập trang chính:**
```
http://localhost:3000
```

### **2. Kiểm tra ảnh trong DevTools (F12 → Network):**
```
Request URL: http://localhost:3781/images/IMG_1173.png  ✅
Status: 200 OK
```

### **3. Kiểm tra API trong DevTools:**
```
Request URL: http://localhost:3781/api/display-promotions?active=true  ✅
Status: 200 OK
```

---

## 🔍 CÁCH HOẠT ĐỘNG:

### **Code Frontend (`Body.tsx`, `admin/display-promotions/page.tsx`):**

```typescript
// Helper function thêm BASE_URL vào image path
const getImageUrl = (imagePath: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';  // "http://localhost:3781"
  if (!baseUrl) return imagePath;
  return `${baseUrl}${imagePath}`;  // "http://localhost:3781/images/IMG_1173.png"
};

// Render ảnh
<img src={getImageUrl(promo.image)} alt={promo.title} />
```

### **Code Backend (`backend/server.js`):**

```javascript
// Serve static files từ backend/images/
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));

// Khi browser request: http://localhost:3781/images/IMG_1173.png
// Express tự động serve từ: backend/images/IMG_1173.png
```

---

## 📊 FLOW DIAGRAM:

```
Browser (localhost:3000)
    │
    ├─► Request: GET /                          → Frontend (Next.js)
    │
    ├─► Request: GET /images/IMG_1173.png       → Backend (Express:3781)
    │              ↓
    │              ✅ Serve từ: backend/images/IMG_1173.png
    │
    └─► Request: GET /api/display-promotions    → Backend (Express:3781)
                   ↓
                   ✅ Return JSON từ: data/display-promotions.json
```

---

## ⚠️ LƯU Ý QUAN TRỌNG:

### **1. Environment Variable phải load trước khi build:**

```powershell
# Check file .env.local có đúng:
cat .env.local

# Output phải là:
NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

### **2. Rebuild khi đổi .env.local:**

```powershell
npm run build   # Build lại
npm start       # Start lại
```

### **3. Backend PHẢI chạy trước Frontend:**

```
Backend start   → ✅ http://localhost:3781
Frontend start  → ✅ http://localhost:3000
```

---

## 🐛 TROUBLESHOOTING:

### **Vấn đề: Ảnh vẫn gọi localhost:3000**

**Nguyên nhân:** `.env.local` không được load khi build

**Giải pháp:**
```powershell
# 1. Kiểm tra .env.local
cat .env.local

# 2. Clean build cache
rm -rf .next

# 3. Rebuild
npm run build

# 4. Start lại
npm start
```

### **Vấn đề: 404 Not Found cho ảnh**

**Nguyên nhân:** Backend chưa chạy hoặc ảnh không tồn tại

**Giải pháp:**
```powershell
# 1. Check backend đang chạy
# Mở browser: http://localhost:3781/images/IMG_1173.png

# 2. Check file ảnh tồn tại
ls backend/images/IMG_1173.png

# 3. Restart backend
cd backend
node server.js
```

---

## ✅ CHECKLIST:

- [ ] `.env.local` có `NEXT_PUBLIC_BASE_URL=http://localhost:3781`
- [ ] `backend/.env` có `PORT=3781`
- [ ] Ảnh tồn tại trong `backend/images/`
- [ ] Backend đang chạy ở port 3781
- [ ] Frontend build thành công (`npm run build`)
- [ ] Frontend start thành công (`npm start`)
- [ ] Mở DevTools → Network → Thấy ảnh gọi `localhost:3781`

---

## 🎯 KẾT LUẬN:

**Với cấu hình này:**
- ✅ Frontend chạy ở `localhost:3000`
- ✅ Backend chạy ở `localhost:3781`
- ✅ TẤT CẢ ảnh gọi từ backend
- ✅ TẤT CẢ API gọi từ backend
- ✅ Phù hợp cho production deployment

**Đơn giản, hiệu quả, dễ scale!** 🚀

