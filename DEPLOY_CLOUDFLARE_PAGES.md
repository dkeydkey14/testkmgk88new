# 🚀 HƯỚNG DẪN DEPLOY LÊN CLOUDFLARE PAGES

## 📋 TỔNG QUAN

Bạn sẽ deploy:
- **Frontend (Next.js):** lên Cloudflare Pages (`.pages.dev`)
- **Backend (Express):** lên server riêng hoặc Railway/Render

---

## 🔧 BƯỚC 1: CẤU HÌNH ENVIRONMENT

### **File `.env.local` (Frontend):**

```env
# URL backend của bạn (sau khi deploy backend)
NEXT_PUBLIC_BASE_URL=https://your-backend-url.com
```

**Lưu ý:** Thay `https://your-backend-url.com` bằng URL backend thật sau khi deploy backend.

---

## 📦 BƯỚC 2: BUILD FRONTEND

### **Build static site:**

```powershell
npm run build
```

Kết quả sẽ tạo folder `out/` chứa static files.

### **Kiểm tra folder `out/`:**

```
out/
├── index.html
├── admin/
│   ├── index.html
│   ├── login/
│   └── ...
├── _next/
│   └── static/
└── images/
```

---

## 🌐 BƯỚC 3: DEPLOY LÊN CLOUDFLARE PAGES

### **Cách 1: Dùng Wrangler CLI (Khuyến nghị)**

#### **1. Cài đặt Wrangler:**

```powershell
npm install -g wrangler
```

#### **2. Login Cloudflare:**

```powershell
wrangler login
```

#### **3. Deploy:**

```powershell
wrangler pages deploy out --project-name=gk88-khuyenmai
```

**Hoặc tạo alias trong `package.json`:**

```json
{
  "scripts": {
    "deploy": "npm run build && wrangler pages deploy out --project-name=gk88-khuyenmai"
  }
}
```

Sau đó chỉ cần:

```powershell
npm run deploy
```

---

### **Cách 2: Dùng Cloudflare Dashboard (UI)**

#### **1. Truy cập:**
```
https://dash.cloudflare.com/
```

#### **2. Pages → Create a project → Upload assets**

#### **3. Upload folder `out/`**
- Kéo thả folder `out/` vào
- Hoặc chọn "Upload"

#### **4. Deploy!**
- Cloudflare sẽ tự động deploy
- URL sẽ là: `https://gk88-khuyenmai.pages.dev`

---

### **Cách 3: Kết nối Git Repository (Tự động)**

#### **1. Push code lên GitHub/GitLab:**

```powershell
git add .
git commit -m "Ready for Cloudflare Pages"
git push origin main
```

#### **2. Trong Cloudflare Dashboard:**
- Pages → Create a project → Connect to Git
- Chọn repository
- Build settings:
  - **Build command:** `npm run build`
  - **Build output directory:** `out`
  - **Root directory:** `/`

#### **3. Environment Variables:**

Thêm trong Cloudflare Pages Settings:
```
NEXT_PUBLIC_BASE_URL = https://your-backend-url.com
```

#### **4. Deploy!**
- Cloudflare sẽ tự động build và deploy
- Mỗi lần push code mới = auto deploy

---

## 🔧 BƯỚC 4: CUSTOM DOMAIN (Tùy chọn)

### **1. Trong Cloudflare Pages:**
- Settings → Custom domains → Add custom domain

### **2. Thêm domain của bạn:**
```
khuyenmai.gk88.com
```

### **3. Cập nhật DNS:**
- CNAME record trỏ về Pages
- Cloudflare sẽ hướng dẫn cụ thể

---

## 📊 BƯỚC 5: DEPLOY BACKEND

Backend phải deploy riêng. Có 3 options:

### **Option 1: Railway.app (Khuyến nghị)**

```powershell
# Cài Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway up
```

URL backend: `https://your-app.railway.app`

### **Option 2: Render.com**

1. Tạo Web Service mới
2. Connect GitHub repo
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`

URL backend: `https://your-app.onrender.com`

### **Option 3: VPS/Server riêng**

```bash
# SSH vào server
ssh user@your-server.com

# Upload backend code
# Install Node.js, npm
# Chạy backend với PM2
npm install
pm2 start server.js --name gk88-backend
```

---

## 🔄 BƯỚC 6: CẬP NHẬT ENVIRONMENT

### **Sau khi deploy backend, update `.env.local`:**

```env
NEXT_PUBLIC_BASE_URL=https://your-backend.railway.app
```

### **Rebuild và deploy lại frontend:**

```powershell
npm run build
npm run deploy
```

**Hoặc update trực tiếp trong Cloudflare Pages Settings:**
- Settings → Environment variables
- Update `NEXT_PUBLIC_BASE_URL`
- Redeploy

---

## ✅ KIỂM TRA SAU KHI DEPLOY

### **1. Frontend trên Pages.dev:**
```
https://gk88-khuyenmai.pages.dev
```

✅ Trang chủ hiển thị
✅ Slider khuyến mãi hoạt động
✅ Form đăng ký hiển thị

### **2. Backend API:**
```
https://your-backend.railway.app/api/display-promotions
```

✅ Trả về JSON data

### **3. Test kết nối:**
- Mở DevTools (F12) → Network
- Refresh trang
- Kiểm tra requests:
  ```
  GET https://your-backend.railway.app/api/display-promotions
  GET https://your-backend.railway.app/images/IMG_1172.png
  ```

---

## 🐛 TROUBLESHOOTING

### **Lỗi: "API returns 404"**

**Nguyên nhân:** `NEXT_PUBLIC_BASE_URL` chưa đúng

**Giải pháp:**
1. Kiểm tra `.env.local`
2. Rebuild: `npm run build`
3. Redeploy

### **Lỗi: "CORS Error"**

**Nguyên nhân:** Backend chưa cho phép CORS

**Giải pháp:** Trong `backend/server.js`:
```javascript
app.use(cors({
  origin: '*',  // Hoặc specific domain
  credentials: false
}));
```

### **Lỗi: "Images not loading"**

**Nguyên nhân:** Ảnh vẫn dùng relative path

**Giải pháp:** Đã fix với `getImageUrl()` helper

---

## 📦 CHECKLIST DEPLOY

### **Frontend:**
- [ ] `.env.local` có `NEXT_PUBLIC_BASE_URL`
- [ ] `npm run build` thành công
- [ ] Folder `out/` được tạo
- [ ] Deploy lên Cloudflare Pages
- [ ] Test trang chủ: `https://xxx.pages.dev`

### **Backend:**
- [ ] Deploy backend lên Railway/Render/VPS
- [ ] Test API: `https://backend-url/api/display-promotions`
- [ ] CORS đã enable
- [ ] Static files serve được (images)

### **Integration:**
- [ ] Update `NEXT_PUBLIC_BASE_URL` trong Cloudflare
- [ ] Rebuild frontend
- [ ] Test toàn bộ trang
- [ ] Test admin login
- [ ] Test form đăng ký

---

## 🎯 KẾT QUẢ

Sau khi hoàn tất:

```
✅ Frontend: https://gk88-khuyenmai.pages.dev
✅ Backend:  https://your-backend.railway.app
✅ Custom:   https://khuyenmai.gk88.com (optional)
```

**Miễn phí, nhanh, và tự động deploy khi push code!** 🚀

---

## 📝 GHI CHÚ

### **Cloudflare Pages - FREE Plan:**
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds/month
- ✅ Auto SSL/HTTPS
- ✅ Global CDN
- ✅ DDoS protection

### **Railway.app - FREE Plan:**
- ✅ $5 credit/month
- ✅ Auto sleep khi không dùng
- ✅ Wake up tự động khi có request

### **Chi phí:**
- Frontend: **$0/tháng** (Cloudflare Pages)
- Backend: **~$5/tháng** (Railway) hoặc $0 nếu dùng VPS riêng

**Rất phù hợp để bắt đầu!** 🎉

