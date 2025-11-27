# ⚡ QUICK START - DEPLOY LÊN PAGES.DEV

## 🚀 3 BƯỚC NHANH NHẤT:

### **Bước 1: Build**

```powershell
npm run build
```

Kết quả: Tạo folder `out/`

### **Bước 2: Cài Wrangler (nếu chưa có)**

```powershell
npm install -g wrangler
wrangler login
```

### **Bước 3: Deploy**

```powershell
npm run deploy
```

Xong! Frontend đã lên: `https://gk88-khuyenmai.pages.dev` 🎉

---

## 📝 CHI TIẾT:

### **Test local trước khi deploy:**

```powershell
npm run build
npm run preview
```

Mở: `http://localhost:3000`

### **Deploy lại (sau khi sửa code):**

```powershell
npm run deploy
```

### **Xem logs:**

```powershell
wrangler pages deployment list --project-name=gk88-khuyenmai
```

---

## ⚠️ LƯU Ý QUAN TRỌNG:

### **1. Backend phải deploy riêng!**

Frontend chỉ là static site, cần backend cho API:

```
Frontend (Pages.dev): https://gk88-khuyenmai.pages.dev
Backend (Railway):    https://your-backend.railway.app
```

### **2. Cập nhật URL backend:**

File `.env.local`:
```env
NEXT_PUBLIC_BASE_URL=https://your-backend.railway.app
```

Sau đó rebuild:
```powershell
npm run deploy
```

### **3. Kiểm tra CORS:**

Backend phải enable CORS cho frontend domain:

```javascript
// backend/server.js
app.use(cors({
  origin: '*', // Hoặc specific: 'https://gk88-khuyenmai.pages.dev'
  credentials: false
}));
```

---

## 🎯 WORKFLOW ĐẦY ĐỦ:

```
1. Code frontend → npm run build → Test local (npm run preview)
2. Deploy backend → Railway/Render → Get URL backend
3. Update .env.local → Set NEXT_PUBLIC_BASE_URL
4. Deploy frontend → npm run deploy → Done!
```

---

## 📦 OUTPUT STRUCTURE:

Sau `npm run build`, folder `out/`:

```
out/
├── index.html                    ← Trang chủ
├── admin/
│   ├── index.html               ← Dashboard
│   ├── login/
│   │   └── index.html          ← Login page
│   ├── display-promotions/
│   ├── form-promotions/
│   ├── links/
│   └── settings/
├── _next/
│   └── static/
│       ├── chunks/
│       └── css/
└── 404.html
```

---

## ✅ CHECKLIST:

- [ ] `npm run build` thành công
- [ ] Folder `out/` được tạo
- [ ] `npm run preview` → Test local OK
- [ ] Backend đã deploy và có URL
- [ ] `.env.local` có `NEXT_PUBLIC_BASE_URL`
- [ ] `npm run deploy` → Deploy thành công
- [ ] Test `https://xxx.pages.dev` → Mọi thứ hoạt động

---

## 🐛 LỖI THƯỜNG GẶP:

### **Lỗi: "npm run build" failed**

```
Error: API routes cannot be used with "output: export"
```

**Đã fix!** Đã xóa folder `src/app/api/` vì API đã chuyển sang backend.

### **Lỗi: "wrangler command not found"**

```powershell
npm install -g wrangler
```

### **Lỗi: "Permission denied"**

```powershell
wrangler login
```

---

**ĐỌC ĐẦY ĐỦ:** `DEPLOY_CLOUDFLARE_PAGES.md`

**GỌN & NHANH!** 🚀

