# 🔧 HƯỚNG DẪN THAY ĐỔI DOMAIN - 1 FILE DUY NHẤT

## 📍 File môi trường: `.env.local`

Chỉ có **1 biến duy nhất** để thay đổi domain:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

---

## 🎯 **Khi Deploy Production:**

### **Bước 1: Mở file `.env.local`**

### **Bước 2: Thay đổi domain:**

```bash
# Development (local)
NEXT_PUBLIC_BASE_URL=http://localhost:3781

# Production (deploy thật)
NEXT_PUBLIC_BASE_URL=https://khuyenmai.gk88.com
```

### **Bước 3: Restart server**

```bash
# Tắt server (Ctrl + C)
# Xóa cache
rmdir /s /q .next

# Chạy lại
npm run dev

# Hoặc build production
npm run build
npm start
```

---

## 💡 **Cách dùng trong code:**

### **Nếu cần dùng base URL trong component:**

```tsx
// Lấy base URL từ env
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

// Dùng cho fetch
const response = await fetch(`${baseUrl}/api/display-promotions`);
```

**NHƯNG:** Với API routes nội bộ (`/api/*`), **KHÔNG CẦN** base URL vì browser tự động dùng same origin!

```tsx
// ✅ Đơn giản - Không cần base URL
const response = await fetch('/api/display-promotions');

// ❌ Không cần phức tạp
const response = await fetch(`${baseUrl}/api/display-promotions`);
```

---

## 📝 **Tóm tắt:**

### **Hiện tại:**
```
File: .env.local
Biến: NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

### **Khi deploy:**
```
Chỉ sửa 1 dòng:
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### **API Internal (trong dự án):**
```tsx
// Không cần base URL
fetch('/api/display-promotions')  
fetch('/api/form-promotions')
```

### **API External (backend bên ngoài):**
```tsx
// Đã có full URL trong data JSON
fetch(promotion.apiEndpoint)
// VD: https://api.83868668.com/gk01
```

---

## ⚠️ **LƯU Ý QUAN TRỌNG:**

### **1. API Routes nội bộ (`/api/*`):**
- **KHÔNG CẦN** thêm base URL
- Browser tự động resolve đúng domain
- Development: `http://localhost:3781/api/...`
- Production: `https://yourdomain.com/api/...`

### **2. External API (backend bên ngoài):**
- Đã có **full URL** trong file JSON
- File: `data/form-promotions.json`
- Field: `apiEndpoint`
- VD: `https://api.83868668.com/gk01`
- Thay đổi qua **Admin Panel** hoặc edit JSON trực tiếp

---

## 🔍 **Khi nào cần NEXT_PUBLIC_BASE_URL?**

**Chỉ khi bạn cần:**
- Server-side rendering với absolute URLs
- External links đến trang của bạn
- Meta tags (og:image, canonical URL)
- Share links

**Ví dụ:**
```tsx
// Meta tag image
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/images/share.png`} />

// Share link
const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/promo?id=GK01`;
```

---

## 📂 **File quan trọng:**

### **`.env.local`** (ĐÃ TẠO)
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3781
```

### **`.env.example`** (Template backup)
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **`.gitignore`** (Đảm bảo có dòng này)
```
.env.local
```

---

## 🚀 **QUICK START:**

### **Development:**
```bash
# File .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3781

# Run
npm run dev
```

### **Production:**
```bash
# File .env.local hoặc .env.production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Build
npm run build
npm start
```

---

## ✅ **Checklist khi deploy:**

- [ ] Mở file `.env.local`
- [ ] Sửa `NEXT_PUBLIC_BASE_URL=https://yourdomain.com`
- [ ] Xóa folder `.next`
- [ ] Build: `npm run build`
- [ ] Start: `npm start`
- [ ] Test: `https://yourdomain.com`
- [ ] Test API: `https://yourdomain.com/api/display-promotions`

---

**🎯 CHỈ CẦN THAY 1 DÒNG TRONG `.env.local` THÔI!**

