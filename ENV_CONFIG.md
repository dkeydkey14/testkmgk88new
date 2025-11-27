# 🔧 CẤU HÌNH BACKEND - CHỈ SỬA .env.local

## 📍 File duy nhất: `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3781
```

**VẬY THÔI!** Không cần sửa `package.json` hay file code nào khác!

---

## 🎯 **KHI MUỐN ĐỔI BACKEND:**

### **Ví dụ 1: Đổi sang port 3782**
```bash
# File: .env.local
NEXT_PUBLIC_API_URL=http://localhost:3782
```

### **Ví dụ 2: Đổi sang domain khác**
```bash
# File: .env.local
NEXT_PUBLIC_API_URL=http://192.168.1.100:3000
```

### **Ví dụ 3: Production domain**
```bash
# File: .env.local
NEXT_PUBLIC_API_URL=https://api.gk88.com
```

---

## 🔄 **SAU KHI SỬA .env.local:**

```bash
# 1. Tắt server (Ctrl + C)

# 2. Xóa cache (QUAN TRỌNG!)
rmdir /s /q .next

# 3. Chạy lại
npm run dev
```

**⚠️ BẮT BUỘC phải xóa `.next` vì Next.js cache env variables!**

---

## ✅ **HOẠT ĐỘNG NHƯ THẾ NÀO:**

### **Code tự động đọc từ .env.local:**

```tsx
// File: src/config/api.ts
export const getApiUrl = (endpoint: string) => {
  // Đọc từ env
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Build full URL
  return `${baseUrl}${endpoint}`;
};
```

### **Components dùng helper:**

```tsx
// Body.tsx
const apiUrl = getApiUrl('/api/display-promotions');
const response = await fetch(apiUrl);
// → http://localhost:3781/api/display-promotions
```

---

## 📊 **KẾT QUẢ:**

### **Với .env.local:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3782
```

### **Các API call sẽ gọi đến:**
```
✅ http://localhost:3782/api/display-promotions
✅ http://localhost:3782/api/form-promotions
```

### **KHÔNG còn gọi:**
```
❌ http://localhost:3781/api/...
```

---

## 🔍 **TEST NHANH:**

### **Bước 1: Sửa .env.local**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3782
```

### **Bước 2: Xóa cache**
```bash
rmdir /s /q .next
```

### **Bước 3: Restart**
```bash
npm run dev
```

### **Bước 4: Kiểm tra console**
Mở DevTools (F12) → Console → Refresh trang

Bạn sẽ thấy log trong terminal:
```
🔵 API Display Promotions được gọi
📂 Đường dẫn file: ...
```

---

## 📝 **CÁC FILE ĐÃ CẬP NHẬT:**

| File | Thay đổi |
|------|----------|
| `.env.local` | ✅ Thêm `NEXT_PUBLIC_API_URL` |
| `src/config/api.ts` | ✅ Tạo mới - Helper đọc env |
| `src/components/Body.tsx` | ✅ Dùng `getApiUrl()` |
| `src/components/RegistrationForm.tsx` | ✅ Dùng `getApiUrl()` |

**Admin pages tự động dùng same origin nên không cần sửa!**

---

## 💡 **GIẢI THÍCH CHI TIẾT:**

### **Trước đây:**
```tsx
fetch('/api/display-promotions')
// → Browser tự động gọi: http://localhost:3781/api/...
// → Không thể đổi domain!
```

### **Bây giờ:**
```tsx
const url = getApiUrl('/api/display-promotions');
fetch(url)
// → Đọc từ .env.local: http://localhost:3782/api/...
// → Có thể đổi domain bất kỳ!
```

---

## ⚠️ **QUAN TRỌNG:**

### **1. package.json KHÔNG CẦN SỬA:**
```json
"dev": "next dev -p 3781"  // ← GIỮ NGUYÊN PORT NÀY
```
→ Port `3781` là port **frontend** chạy  
→ Backend URL đọc từ `.env.local`

### **2. Hai khái niệm khác nhau:**
- **Frontend Port** (3781): Trang web chạy ở đâu
- **Backend URL** (từ .env): API gọi đến đâu

### **Ví dụ:**
```
Frontend: http://localhost:3781 (package.json)
Backend:  http://localhost:3782 (.env.local)

User mở: http://localhost:3781
→ Page load từ port 3781
→ API call đến port 3782 ✅
```

---

## 🎯 **QUICK GUIDE:**

### **Muốn backend khác domain:**

1. Sửa `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://backend-server:5000
```

2. Xóa cache:
```bash
rmdir /s /q .next
```

3. Restart:
```bash
npm run dev
```

4. Test:
```
Frontend: http://localhost:3781
API calls: http://backend-server:5000/api/...
```

---

## ✅ **CHECKLIST:**

- [ ] Tạo file `.env.local`
- [ ] Thêm dòng `NEXT_PUBLIC_API_URL=...`
- [ ] Xóa folder `.next`
- [ ] Restart server: `npm run dev`
- [ ] Test trang chủ: data hiển thị
- [ ] Check Console: không có lỗi

---

**🎉 BÂY GIỜ CHỈ CẦN SỬA `.env.local` LÀ ĐỔI ĐƯỢC BACKEND!**

