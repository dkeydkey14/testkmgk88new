# 🎯 ĐỔI BACKEND - CHỈ SỬA .env.local

## ✅ **ĐÃ HOÀN THÀNH - TẤT CẢ FILE ĐÃ CẬP NHẬT**

Tất cả API calls giờ đọc từ **`.env.local`**!

---

## 📁 **FILE DUY NHẤT CẦN SỬA:**

### **`.env.local`** (Tạo file này nếu chưa có)

**Vị trí:** Gốc dự án (cùng cấp `package.json`)

**Nội dung:**
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3782
```

---

## ✅ **CÁC FILE ĐÃ CẬP NHẬT:**

### **1. Config Helper:**
- ✅ `src/config/api.ts` - Đọc env và build URL

### **2. Components:**
- ✅ `src/components/Body.tsx` - Dùng `getApiUrl()`
- ✅ `src/components/RegistrationForm.tsx` - Dùng `getApiUrl()`

### **3. Admin Pages:**
- ✅ `src/app/admin/form-promotions/page.tsx` - Tất cả fetch() dùng `getApiUrl()`
- ✅ `src/app/admin/display-promotions/page.tsx` - Tất cả fetch() dùng `getApiUrl()`

---

## 🚀 **CÁCH ĐỔI BACKEND - 4 BƯỚC:**

### **Bước 1: Tạo/Sửa `.env.local`**

**Cách 1 - Notepad:**
```
1. Mở Notepad
2. Paste: NEXT_PUBLIC_BASE_URL=http://localhost:3782
3. Save as → Chọn "All Files (*.*)"
4. Tên: .env.local
5. Save vào: C:\Users\CF\Downloads\khuyenmai-gk88-main\khuyenmai-gk88-main\
```

**Cách 2 - PowerShell:**
```powershell
cd C:\Users\CF\Downloads\khuyenmai-gk88-main\khuyenmai-gk88-main
echo NEXT_PUBLIC_BASE_URL=http://localhost:3782 > .env.local
```

---

### **Bước 2: Xóa Cache (BẮT BUỘC!)**
```bash
rmdir /s /q .next
```

**⚠️ QUAN TRỌNG:** Nếu không xóa `.next`, biến env sẽ KHÔNG cập nhật!

---

### **Bước 3: Restart Server**
```bash
# Tắt server: Ctrl + C
# Chạy lại:
npm run dev
```

---

### **Bước 4: Test**

**Mở DevTools:** `F12` → Tab **Network**

**Refresh:** `F5`

**Xem Request URL** → Phải thấy:
```
✅ http://localhost:3782/api/form-promotions
✅ http://localhost:3782/api/display-promotions
```

---

## 📊 **VÍ DỤ THỰC TẾ:**

### **Ví dụ 1: Backend cùng máy, port khác**
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3782
```

### **Ví dụ 2: Backend trên server khác**
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://192.168.1.100:5000
```

### **Ví dụ 3: Production domain**
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=https://api.gk88.com
```

---

## 🔍 **DANH SÁCH TẤT CẢ API CALLS ĐÃ CẬP NHẬT:**

### **Frontend Components:**
| File | Số lượng calls | Endpoints |
|------|----------------|-----------|
| `Body.tsx` | 1 | `/api/display-promotions` |
| `RegistrationForm.tsx` | 1 | `/api/form-promotions` |

### **Admin Pages:**
| File | Số lượng calls | Endpoints |
|------|----------------|-----------|
| `admin/form-promotions/page.tsx` | 6 | `/api/form-promotions` (GET, POST, PUT, DELETE) |
| `admin/display-promotions/page.tsx` | 6 | `/api/display-promotions` (GET, POST, PUT, DELETE) |

**TỔNG CỘNG: 14 API calls** - TẤT CẢ đều đọc từ `.env.local` ✅

---

## 💡 **HOẠT ĐỘNG NHƯ THẾ NÀO:**

### **Helper function trong `src/config/api.ts`:**
```tsx
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (baseUrl) {
    return `${baseUrl}${endpoint}`;
  }
  
  return endpoint; // Fallback
};
```

### **Ví dụ:**
```tsx
// Trong component
const url = getApiUrl('/api/form-promotions');
// → http://localhost:3782/api/form-promotions

fetch(url);
```

---

## ⚠️ **LƯU Ý QUAN TRỌNG:**

### **1. package.json KHÔNG CẦN SỬA:**
```json
"dev": "next dev -p 3781"  // ← GIỮ NGUYÊN
```
- Port `3781`: Frontend (trang web) chạy
- Backend URL: Đọc từ `.env.local`

### **2. Frontend và Backend có thể khác domain:**
```
Frontend chạy: http://localhost:3781 (từ package.json)
Backend gọi:   http://localhost:3782 (từ .env.local)

→ Hoàn toàn OK! ✅
```

### **3. Nếu Backend cùng server với Frontend:**
```bash
# .env.local để trống hoặc set ""
NEXT_PUBLIC_BASE_URL=

# → API sẽ dùng same origin (relative path)
```

---

## 🎯 **CHECKLIST KHI ĐỔI BACKEND:**

- [x] Đã tạo tất cả files cần thiết
- [x] Đã cập nhật tất cả components
- [x] Đã cập nhật tất cả admin pages
- [ ] **BẠN CẦN LÀM:** Tạo file `.env.local`
- [ ] **BẠN CẦN LÀM:** Xóa `.next`
- [ ] **BẠN CẦN LÀM:** Restart server
- [ ] **BẠN CẦN LÀM:** Test

---

## 🔥 **QUICK START:**

```bash
# 1. Tạo .env.local
echo NEXT_PUBLIC_BASE_URL=http://localhost:3782 > .env.local

# 2. Xóa cache
rmdir /s /q .next

# 3. Restart
npm run dev

# 4. Mở browser
http://localhost:3781

# 5. F12 → Network → Refresh
# Xem Request URL phải là: http://localhost:3782/api/...
```

---

## ✨ **KẾT QUẢ:**

### **TẤT CẢ API calls giờ gọi đến domain trong .env.local:**

```
Body.tsx
  → getApiUrl('/api/display-promotions')
  → http://localhost:3782/api/display-promotions ✅

RegistrationForm.tsx
  → getApiUrl('/api/form-promotions')
  → http://localhost:3782/api/form-promotions ✅

Admin Form
  → getApiUrl('/api/form-promotions')
  → http://localhost:3782/api/form-promotions ✅

Admin Display
  → getApiUrl('/api/display-promotions')
  → http://localhost:3782/api/display-promotions ✅
```

---

## 🎊 **HOÀN THÀNH!**

**GIỜ CHỈ CẦN SỬA 1 DÒNG TRONG `.env.local` LÀ ĐỔI ĐƯỢC BACKEND!**

**KHÔNG CẦN ĐỘNG `package.json` HAY BẤT KỲ FILE CODE NÀO KHÁC!**

---

**🎯 LÀM 4 BƯỚC TRÊN VÀ TEST NGAY!**

