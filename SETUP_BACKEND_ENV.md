# ⚙️ TẠO FILE .env CHO BACKEND

## 📝 Hướng Dẫn:

### **Bước 1: Tạo file `.env` trong folder `backend/`**

```
khuyenmai-gk88-main/
├── backend/
│   └── .env    ← Tạo file này
```

### **Bước 2: Copy nội dung sau vào file `.env`:**

```env
PORT=3782
FRONTEND_URL=http://localhost:3781
```

### **Bước 3: Restart backend server**

```bash
# Ctrl + C để dừng server hiện tại
# Rồi chạy lại:
cd backend
node server.js
```

---

## ✅ Kết Quả Mong Đợi:

```
========================================
🚀 GK88 BACKEND API SERVER
========================================
✅ Server running on: http://localhost:3782
📂 Data directory: C:\...\data
🌐 CORS enabled for: http://localhost:3781
========================================
```

---

## 🚨 Nếu Vẫn Thấy Port 3781:

Backend đang đọc `PORT` từ biến môi trường. Nếu bạn chạy qua `npm run backend`, nó sẽ tự động load file `.env`.

Nếu chạy trực tiếp `node server.js`, cần cài package `dotenv`:

```bash
cd backend
npm install dotenv
```

Rồi thêm vào đầu file `backend/server.js`:

```javascript
require('dotenv').config();
```

