# 🔗 FRONTEND - BACKEND CONNECTIONS

## 📍 Tất cả các chỗ Frontend gọi Backend API

---

## 🟢 **FRONTEND Components**

### 1️⃣ **Body.tsx** - Hiển thị khuyến mãi trên trang chủ

**File:** `src/components/Body.tsx`  
**Dòng:** 25

```tsx
const response = await fetch('/api/display-promotions?active=true');
```

**API Backend:** `/api/display-promotions`  
**File Backend:** `src/app/api/display-promotions/route.ts`  
**Data File:** `data/display-promotions.json`

**Mục đích:** Lấy danh sách khuyến mãi có hình ảnh để hiển thị grid 2 cột

---

### 2️⃣ **RegistrationForm.tsx** - Form đăng ký khuyến mãi

**File:** `src/components/RegistrationForm.tsx`  
**Dòng:** 123

```tsx
const response = await fetch('/api/form-promotions?active=true');
```

**API Backend:** `/api/form-promotions`  
**File Backend:** `src/app/api/form-promotions/route.ts`  
**Data File:** `data/form-promotions.json`

**Mục đích:** Lấy danh sách khuyến mãi cho dropdown select

**Dòng:** 245 (Submit form)

```tsx
const response = await fetch(apiEndpoint, {
  method: 'POST',
  body: JSON.stringify(requestData)
});
```

**API Backend:** Dynamic (lấy từ promotion.apiEndpoint)
- `https://api.83868668.com/gk01`
- `https://api.83868668.com/gk02`
- ... (external API)

**Mục đích:** Submit form đăng ký khuyến mãi đến backend bên ngoài

---

## 🔵 **ADMIN Pages**

### 3️⃣ **Admin Form Promotions** - Quản lý Form

**File:** `src/app/admin/form-promotions/page.tsx`

#### **GET - Load danh sách** (Dòng 38)
```tsx
const response = await fetch('/api/form-promotions');
```

#### **POST - Tạo mới** (Dòng 72)
```tsx
const response = await fetch('/api/form-promotions', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

#### **PUT - Cập nhật** (Dòng 81)
```tsx
const response = await fetch('/api/form-promotions', {
  method: 'PUT',
  body: JSON.stringify(formData)
});
```

#### **DELETE - Xóa** (Dòng 99)
```tsx
const response = await fetch(`/api/form-promotions?id=${id}`, {
  method: 'DELETE'
});
```

#### **PUT - Toggle Active** (Dòng 114)
```tsx
const response = await fetch('/api/form-promotions', {
  method: 'PUT',
  body: JSON.stringify({ ...promo, active: !promo.active })
});
```

#### **PUT - Sắp xếp thứ tự** (Dòng 127, 131)
```tsx
await fetch('/api/form-promotions', {
  method: 'PUT',
  body: JSON.stringify({ ...promo, order: swapPromo.order })
});
```

**API Backend:** `/api/form-promotions`  
**File Backend:** `src/app/api/form-promotions/route.ts`  
**Data File:** `data/form-promotions.json`

---

### 4️⃣ **Admin Display Promotions** - Quản lý Display

**File:** `src/app/admin/display-promotions/page.tsx`

#### **GET - Load danh sách** (Dòng 38)
```tsx
const response = await fetch('/api/display-promotions');
```

#### **POST - Tạo mới** (Dòng 72)
```tsx
const response = await fetch('/api/display-promotions', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

#### **PUT - Cập nhật** (Dòng 81)
```tsx
const response = await fetch('/api/display-promotions', {
  method: 'PUT',
  body: JSON.stringify(formData)
});
```

#### **DELETE - Xóa** (Dòng 99)
```tsx
const response = await fetch(`/api/display-promotions?id=${id}`, {
  method: 'DELETE'
});
```

#### **PUT - Toggle Active** (Dòng 114)
```tsx
const response = await fetch('/api/display-promotions', {
  method: 'PUT',
  body: JSON.stringify({ ...promo, active: !promo.active })
});
```

#### **PUT - Sắp xếp thứ tự** (Dòng 127, 131)
```tsx
await fetch('/api/display-promotions', {
  method: 'PUT',
  body: JSON.stringify({ ...promo, order: swapPromo.order })
});
```

**API Backend:** `/api/display-promotions`  
**File Backend:** `src/app/api/display-promotions/route.ts`  
**Data File:** `data/display-promotions.json`

---

## 📊 **TÓM TẮT KẾT NỐI**

### **Internal API (Trong dự án)**

| Frontend Component | API Endpoint | Backend File | Data File |
|-------------------|--------------|--------------|-----------|
| **Body.tsx** | `/api/display-promotions` | `src/app/api/display-promotions/route.ts` | `data/display-promotions.json` |
| **RegistrationForm.tsx** | `/api/form-promotions` | `src/app/api/form-promotions/route.ts` | `data/form-promotions.json` |
| **Admin Form** | `/api/form-promotions` | `src/app/api/form-promotions/route.ts` | `data/form-promotions.json` |
| **Admin Display** | `/api/display-promotions` | `src/app/api/display-promotions/route.ts` | `data/display-promotions.json` |

### **External API (Backend bên ngoài)**

| Frontend Component | API Endpoint | Mục đích |
|-------------------|--------------|----------|
| **RegistrationForm.tsx** | `https://api.83868668.com/gk01` | Submit form GK01 |
| **RegistrationForm.tsx** | `https://api.83868668.com/gk02` | Submit form GK02 |
| **RegistrationForm.tsx** | `https://api.83868668.com/gk03` | Submit form GK03 |
| **RegistrationForm.tsx** | `https://api.83868668.com/usdt03` | Submit form USDT03 |
| **RegistrationForm.tsx** | `https://api.83868668.com/gk40` | Submit form GK40 |
| **RegistrationForm.tsx** | `https://api.83868668.com/le04` | Submit form LE04 |
| **RegistrationForm.tsx** | `https://api.83868668.com/le05` | Submit form LE05 |
| **RegistrationForm.tsx** | `https://api.83868668.com/gh05` | Submit form GH05 |

---

## 🔄 **FLOW DỮ LIỆU**

### **1. Hiển thị khuyến mãi trên trang chủ:**

```
Body.tsx
  ↓ fetch('/api/display-promotions?active=true')
  ↓
src/app/api/display-promotions/route.ts
  ↓ fs.readFileSync()
  ↓
data/display-promotions.json
  ↓ return JSON
  ↓
Body.tsx (hiển thị grid)
```

---

### **2. Dropdown form đăng ký:**

```
RegistrationForm.tsx
  ↓ fetch('/api/form-promotions?active=true')
  ↓
src/app/api/form-promotions/route.ts
  ↓ fs.readFileSync()
  ↓
data/form-promotions.json
  ↓ return JSON
  ↓
RegistrationForm.tsx (hiển thị dropdown)
```

---

### **3. Submit form đăng ký:**

```
RegistrationForm.tsx (user click "Xác Nhận")
  ↓ Lấy apiEndpoint từ promotion đã chọn
  ↓ fetch(apiEndpoint) → VD: https://api.83868668.com/gk01
  ↓
External Backend API
  ↓ Xử lý đăng ký
  ↓ return { success, message }
  ↓
RegistrationForm.tsx (hiển thị thông báo)
```

---

### **4. Quản lý Admin:**

```
Admin Page (Form/Display)
  ↓ CRUD operations
  ↓ fetch('/api/form-promotions') hoặc fetch('/api/display-promotions')
  ↓
API Route (GET/POST/PUT/DELETE)
  ↓ fs.readFileSync() / fs.writeFileSync()
  ↓
JSON Data File
  ↓ return success
  ↓
Admin Page (cập nhật UI)
```

---

## 🎯 **ĐỂ THAY ĐỔI BACKEND:**

### **Nếu muốn đổi domain Backend bên ngoài:**

**File:** `data/form-promotions.json`

```json
{
  "id": 1,
  "code": "GK01",
  "apiEndpoint": "https://api.83868668.com/gk01" ← Đổi link này
}
```

Hoặc qua **Admin Panel:**
```
/admin/form-promotions
→ Edit khuyến mãi
→ Sửa field "API Endpoint"
```

---

### **Nếu muốn đổi Internal API prefix:**

**Tìm và thay:**
```
'/api/display-promotions' → '/api/v2/display-promotions'
'/api/form-promotions' → '/api/v2/form-promotions'
```

**Trong các files:**
- `src/components/Body.tsx`
- `src/components/RegistrationForm.tsx`
- `src/app/admin/form-promotions/page.tsx`
- `src/app/admin/display-promotions/page.tsx`

**Đổi tên folder API:**
```
src/app/api/display-promotions/ → src/app/api/v2/display-promotions/
src/app/api/form-promotions/ → src/app/api/v2/form-promotions/
```

---

## 🔍 **TÌM KIẾM NHANH**

### **Tìm tất cả fetch() trong dự án:**

```bash
# Windows PowerShell
Select-String -Path "src/**/*.tsx" -Pattern "fetch\(" -CaseSensitive

# hoặc dùng VS Code: Ctrl + Shift + F
# Tìm: fetch(
# Trong: src/
```

---

## 📝 **CHECKLIST KHI THAY ĐỔI API:**

- [ ] Kiểm tra tất cả `fetch()` calls
- [ ] Cập nhật `apiEndpoint` trong JSON data
- [ ] Test API mới với Postman/browser
- [ ] Restart dev server
- [ ] Xóa .next cache
- [ ] Test Frontend lại

---

## 💡 **LƯU Ý:**

### **Internal API (trong dự án):**
- Prefix: `/api/`
- Server: Next.js
- Port: Same as frontend (3781)
- Full URL: `http://localhost:3781/api/...`

### **External API (bên ngoài):**
- Full URL: `https://api.83868668.com/...`
- Server: External backend
- Cần CORS enabled

---

**📖 Document này giúp bạn biết chính xác Frontend kết nối Backend ở đâu!**

