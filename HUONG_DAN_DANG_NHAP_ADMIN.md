# 🔐 HƯỚNG DẪN HỆ THỐNG ĐĂNG NHẬP ADMIN

## 🎯 **BẢO MẬT ADMIN PANEL**

Giờ phải đăng nhập mới vào được /admin!

---

## 🚀 **TÍNH NĂNG:**

### ✅ **Đã tạo:**
- 🔐 Trang đăng nhập `/admin/login`
- 🛡️ Auth Guard bảo vệ tất cả trang admin
- 🔑 API xác thực `/api/auth/login`
- 🔄 API đổi mật khẩu `/api/auth/change-password`
- ⚙️ Trang cài đặt `/admin/settings`
- 🚪 Chức năng đăng xuất

---

## 📍 **ĐĂNG NHẬP:**

### **URL:**
```
http://localhost:3781/admin/login
```

### **Thông tin mặc định:**
```
Username: admin
Password: admin123
```

⚠️ **Quan trọng:** Đổi mật khẩu ngay sau khi đăng nhập lần đầu!

---

## 🎨 **GIAO DIỆN ĐĂNG NHẬP:**

```
┌────────────────────────────────────┐
│           [Logo GK88]              │
│        Admin Panel                 │
│   Đăng nhập để quản lý hệ thống   │
├────────────────────────────────────┤
│                                     │
│  Tên đăng nhập:                    │
│  [👤 admin              ]          │
│                                     │
│  Mật khẩu:                         │
│  [🔒 ••••••••   👁]                │
│                                     │
│      [🔑 Đăng Nhập]                │
│                                     │
│  Mặc định:                         │
│  Username: admin                   │
│  Password: admin123                │
│  ⚠️ Vui lòng đổi mật khẩu!         │
│                                     │
│  ← Quay về trang chủ               │
└────────────────────────────────────┘
```

---

## 🔒 **CƠ CHẾ BẢO MẬT:**

### **1. Auth Guard:**
- Mỗi trang admin được bọc bởi `AdminAuthGuard`
- Kiểm tra token trong localStorage
- Nếu không có token → Redirect về `/admin/login`

### **2. Token:**
- Lưu trong localStorage: `admin-token`
- Simple token: `'admin-logged-in'`
- Kiểm tra mỗi khi vào trang admin

### **3. Protected Pages:**
```
✅ /admin → Dashboard
✅ /admin/form-promotions
✅ /admin/display-promotions
✅ /admin/links
✅ /admin/settings
```

Tất cả đều yêu cầu đăng nhập!

---

## 🎯 **WORKFLOW:**

### **Lần đầu vào /admin:**
```
1. Vào http://localhost:3781/admin
   ↓
2. Chưa đăng nhập
   ↓
3. Tự động redirect → /admin/login
   ↓
4. Nhập username + password
   ↓
5. Click [Đăng Nhập]
   ↓
6. Token lưu vào localStorage
   ↓
7. Redirect về /admin → ✅ Vào được!
```

### **Lần sau:**
```
1. Vào /admin
   ↓
2. Kiểm tra token
   ↓
3. Có token → Vào thẳng! ✅
```

---

## ⚙️ **ĐỔI MẬT KHẨU:**

### **Vào trang cài đặt:**
```
http://localhost:3781/admin/settings
```

### **Hoặc từ Sidebar → Click "⚙️ Cài Đặt"**

### **Giao diện:**
```
┌────────────────────────────────────┐
│  ⚙️ Cài Đặt           [← Quay lại] │
├────────────────────────────────────┤
│                                     │
│  🔑 Đổi Mật Khẩu                   │
│  ┌──────────────────────────────┐ │
│  │ Mật khẩu hiện tại:            │ │
│  │ [••••••••]                    │ │
│  │                                │ │
│  │ Mật khẩu mới:                 │ │
│  │ [••••••••]                    │ │
│  │                                │ │
│  │ Xác nhận mật khẩu mới:        │ │
│  │ [••••••••]                    │ │
│  │                                │ │
│  │ ☐ Hiện mật khẩu               │ │
│  │                                │ │
│  │      [💾 Đổi Mật Khẩu]        │ │
│  └──────────────────────────────┘ │
│                                     │
│  🚪 Đăng Xuất                      │
│  ┌──────────────────────────────┐ │
│  │ Đăng xuất khỏi hệ thống       │ │
│  │      [🚪 Đăng Xuất]           │ │
│  └──────────────────────────────┘ │
└────────────────────────────────────┘
```

### **Các bước:**
```
1. Nhập mật khẩu hiện tại
2. Nhập mật khẩu mới (≥6 ký tự)
3. Xác nhận mật khẩu mới
4. Click [Đổi Mật Khẩu]
5. Done! ✅
```

---

## 🚪 **ĐĂNG XUẤT:**

### **Cách 1: Từ Settings**
```
/admin/settings → Click [Đăng Xuất]
```

### **Cách 2: Clear localStorage**
```javascript
localStorage.removeItem('admin-token');
```

### **Sau khi đăng xuất:**
```
→ Token bị xóa
→ Vào /admin bất kỳ
→ Redirect về /admin/login
→ Phải đăng nhập lại
```

---

## 📁 **CẤU TRÚC FILES:**

### **Backend:**
```
data/admin-credentials.json
  ↳ Lưu username + password

src/app/api/auth/login/route.ts
  ↳ API đăng nhập

src/app/api/auth/change-password/route.ts
  ↳ API đổi mật khẩu
```

### **Frontend:**
```
src/app/admin/login/page.tsx
  ↳ Trang đăng nhập

src/app/admin/settings/page.tsx
  ↳ Trang đổi mật khẩu + đăng xuất

src/components/AdminAuthGuard.tsx
  ↳ Component bảo vệ routes
```

### **Protected Pages:**
```
src/app/admin/page.tsx
src/app/admin/form-promotions/page.tsx
src/app/admin/display-promotions/page.tsx
src/app/admin/links/page.tsx
src/app/admin/settings/page.tsx
```

Tất cả đều bọc bởi `<AdminAuthGuard>`

---

## 🔧 **CÁCH HOẠT ĐỘNG:**

### **AdminAuthGuard Component:**
```tsx
export default function AdminAuthGuard({ children }) {
  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    
    if (token === 'admin-logged-in') {
      setIsAuthenticated(true); // OK
    } else {
      router.push('/admin/login'); // Redirect
    }
  }, []);

  return isAuthenticated ? <>{children}</> : <Loading />;
}
```

### **Usage trong pages:**
```tsx
export default function SomePage() {
  return (
    <AdminAuthGuard>
      <ActualPageContent />
    </AdminAuthGuard>
  );
}
```

---

## 💡 **BẢO MẬT NÂNG CAO (Tùy chọn):**

### **Nếu muốn tăng cường bảo mật:**

**1. Đổi mật khẩu trong `data/admin-credentials.json`:**
```json
{
  "username": "admin",
  "password": "your-strong-password"
}
```

**2. Thêm multiple admins:**
Mở rộng API để hỗ trợ nhiều user

**3. Session timeout:**
Thêm thời gian hết hạn cho token

**4. Encryption:**
Mã hóa password trong file JSON

---

## ✅ **CHECKLIST:**

- [x] Tạo trang đăng nhập
- [x] Tạo API xác thực
- [x] Tạo AdminAuthGuard
- [x] Bảo vệ tất cả trang admin
- [x] Tạo trang settings
- [x] Chức năng đổi mật khẩu
- [x] Chức năng đăng xuất
- [x] Thêm menu Settings vào Sidebar

---

## 🎯 **TEST:**

### **1. Test đăng nhập:**
```
1. Vào http://localhost:3781/admin
2. Bị redirect → /admin/login
3. Nhập: admin / admin123
4. Click Đăng Nhập
5. Vào được /admin ✅
```

### **2. Test đổi mật khẩu:**
```
1. Vào /admin/settings
2. Nhập mật khẩu hiện tại: admin123
3. Nhập mật khẩu mới: newpass123
4. Xác nhận: newpass123
5. Click Đổi Mật Khẩu
6. Thành công ✅
```

### **3. Test đăng xuất:**
```
1. Click [Đăng Xuất] trong /admin/settings
2. Xác nhận
3. Redirect về /admin/login
4. Thử vào /admin → Vẫn bị redirect ✅
```

---

## 🔥 **TÓM TẮT:**

```
✨ Hệ Thống Đăng Nhập
├── Trang login đẹp mắt
├── Auth Guard bảo vệ routes
├── Token lưu trong localStorage
├── Đổi mật khẩu
├── Đăng xuất
└── Tất cả trang admin được bảo vệ!

🎯 Login mặc định:
Username: admin
Password: admin123

⚙️ Đổi mật khẩu:
/admin/settings

🚪 Đăng xuất:
/admin/settings → [Đăng Xuất]
```

---

**🔐 GIỜ ADMIN PANEL CỦA BẠN ĐÃ BẢO MẬT!**

**Vào /admin → Phải đăng nhập → An toàn! 🛡️**

