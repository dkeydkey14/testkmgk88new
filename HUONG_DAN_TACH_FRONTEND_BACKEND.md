# 📘 HƯỚNG DẪN TÁCH FRONTEND & BACKEND

## 🎯 Tổng Quan

Dự án được tách thành **2 server riêng biệt**:

- **Frontend (Next.js)**: Port `3781` - Giao diện UI
- **Backend (Express.js)**: Port `3782` - API Server

---

## 📂 Cấu Trúc Thư Mục

```
khuyenmai-gk88-main/
├── backend/                    # 🟢 Backend Server (Express.js)
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Express API server
│   ├── .env                   # Backend config (PORT=3782)
│   ├── .gitignore
│   └── ENV_CONFIG.md          # Hướng dẫn cấu hình
│
├── src/                       # 🔵 Frontend (Next.js)
│   ├── app/
│   ├── components/
│   └── config/
│       └── api.ts            # API helper (getApiUrl)
│
├── data/                      # 📊 Shared Data
│   ├── form-promotions.json
│   ├── display-promotions.json
│   ├── links.json
│   └── admin-credentials.json
│
├── package.json              # Frontend + Scripts chạy cả 2
├── .env.local                # Frontend config (NEXT_PUBLIC_BASE_URL)
└── next.config.js
```

---

## ⚙️ CÀI ĐẶT

### 1️⃣ **Cài Frontend Dependencies**

```bash
npm install
```

### 2️⃣ **Cài Backend Dependencies**

```bash
cd backend
npm install
```

### 3️⃣ **Cấu Hình Environment Variables**

#### **Frontend:** `.env.local` (ở root)
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3782
```

#### **Backend:** `backend/.env`
```env
PORT=3782
FRONTEND_URL=http://localhost:3781
```

---

## 🚀 CHẠY DỰ ÁN

### **Option 1: Chạy Cả 2 Server Cùng Lúc** ⭐ (Khuyến Nghị)

```bash
# Ở root folder
npm run dev:all
```

Lệnh này sẽ chạy:
- ✅ Frontend: `http://localhost:3781`
- ✅ Backend: `http://localhost:3782`

---

### **Option 2: Chạy Riêng Từng Server**

#### **Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# hoặc: npm start
```
→ Backend chạy ở `http://localhost:3782`

#### **Terminal 2 - Frontend:**
```bash
npm run dev
```
→ Frontend chạy ở `http://localhost:3781`

---

## 🧪 KIỂM TRA

### **1. Test Backend API:**
```bash
curl http://localhost:3782/health
# Kết quả: {"status":"OK","message":"GK88 Backend API Server is running"}
```

### **2. Test Frontend:**
Mở trình duyệt: `http://localhost:3781`

### **3. Kiểm Tra API Calls:**
- F12 → Network tab
- Tất cả API requests phải gọi đến `http://localhost:3782/api/...`

---

## 📋 DANH SÁCH API ENDPOINTS

### **📌 Form Promotions**
- `GET    /api/form-promotions?active=true`
- `POST   /api/form-promotions`
- `PUT    /api/form-promotions`
- `DELETE /api/form-promotions?id=xxx`

### **📌 Display Promotions**
- `GET    /api/display-promotions?active=true`
- `POST   /api/display-promotions`
- `PUT    /api/display-promotions`
- `DELETE /api/display-promotions?id=xxx`

### **📌 Links Management**
- `GET    /api/links`
- `PUT    /api/links`

### **📌 Admin Authentication**
- `POST   /api/auth/login`
- `POST   /api/auth/change-password`

### **📌 Health Check**
- `GET    /health`

---

## 🔧 SCRIPTS

### **Frontend (Root `package.json`):**
```json
{
  "dev": "next dev -p 3781",          // Chạy frontend
  "build": "next build",              // Build frontend
  "start": "next start",              // Start production
  "backend": "cd backend && node server.js",        // Chạy backend (production)
  "backend:dev": "cd backend && nodemon server.js", // Chạy backend (dev)
  "dev:all": "concurrently \"npm run dev\" \"npm run backend:dev\"" // Chạy cả 2
}
```

### **Backend (`backend/package.json`):**
```json
{
  "dev": "nodemon server.js",  // Development với auto-restart
  "start": "node server.js"    // Production
}
```

---

## 🌐 CORS Configuration

Backend đã cấu hình CORS cho phép frontend gọi API:

```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:3781',  // Frontend URL
  credentials: true
}));
```

Nếu deploy production, update `FRONTEND_URL` trong `backend/.env`.

---

## 📦 DEPENDENCIES

### **Frontend:**
- `next`, `react`, `react-dom` - Next.js framework
- `tailwindcss` - Styling
- `react-icons` - Icons
- `concurrently` - Chạy multi commands

### **Backend:**
- `express` - Web server framework
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Parse JSON requests
- `nodemon` (dev) - Auto-restart server

---

## 🚨 LƯU Ý

### **1. Port Conflicts:**
Nếu port `3781` hoặc `3782` bị chiếm:
- **Frontend:** Đổi port trong `package.json` → `"dev": "next dev -p PORT_KHAC"`
- **Backend:** Đổi `PORT` trong `backend/.env`
- **Cập nhật:** `.env.local` → `NEXT_PUBLIC_BASE_URL` và `backend/.env` → `FRONTEND_URL`

### **2. Data Files:**
Cả 2 server đều đọc/ghi vào folder `data/` ở root. Đảm bảo:
- Folder `data/` tồn tại
- Các file JSON có cấu trúc đúng
- Không xóa/rename các file khi server đang chạy

### **3. Nodemon Not Found:**
```bash
cd backend
npm install --save-dev nodemon
```

### **4. Concurrently Not Found:**
```bash
# Ở root
npm install --save-dev concurrently
```

---

## 🛠️ DEVELOPMENT TIPS

### **1. Xem Logs:**
- Frontend logs: Terminal chạy `npm run dev`
- Backend logs: Terminal chạy `npm run backend:dev`

### **2. Restart Backend:**
Khi sửa `backend/server.js` → Nodemon tự động restart

### **3. Restart Frontend:**
Khi sửa `.env.local` → Cần restart manual (`Ctrl+C` rồi `npm run dev`)

### **4. Debug API:**
Dùng tools:
- **Postman** / **Insomnia** để test API
- **Browser DevTools** (F12 → Network) để xem requests

---

## 📱 PRODUCTION DEPLOYMENT

### **Option 1: Deploy Cả 2 Cùng Server**
```bash
# Build frontend
npm run build

# Chạy cả 2
npm run start &      # Frontend
npm run backend &    # Backend
```

### **Option 2: Deploy Riêng**
- **Frontend:** Deploy lên Vercel/Netlify
- **Backend:** Deploy lên Railway/Render/Heroku
- Update `NEXT_PUBLIC_BASE_URL` trong frontend config

---

## 🎉 DONE!

Giờ bạn có:
- ✅ Frontend Next.js độc lập (Port 3781)
- ✅ Backend Express độc lập (Port 3782)
- ✅ Scripts tiện lợi để chạy cả 2
- ✅ CORS đã cấu hình
- ✅ Environment variables tách biệt

**Chạy ngay:** `npm run dev:all` 🚀

