# ⚡ SETUP .env.local - NHANH

## 🎯 TẠO FILE `.env.local`

**Vị trí:** Gốc dự án (cùng cấp `package.json`)

**Nội dung:**
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3782
```

---

## 📝 **CÁCH TẠO:**

### **Cách 1: Tạo bằng Notepad**
1. Mở Notepad
2. Paste: `NEXT_PUBLIC_BASE_URL=http://localhost:3782`
3. Save as → Chọn "All Files (*.*)"
4. Tên file: `.env.local` (có dấu chấm đầu)
5. Save vào folder gốc dự án

### **Cách 2: Copy file mẫu**
```bash
copy .env.local.example .env.local
```

Sau đó sửa domain trong file `.env.local`

---

## 🔄 **SAU KHI TẠO/SỬA .env.local:**

### **BẮT BUỘC PHẢI LÀM:**

```bash
# 1. Tắt server (Ctrl + C trong terminal)

# 2. XÓA CACHE (QUAN TRỌNG!)
rmdir /s /q .next

# 3. Chạy lại
npm run dev
```

**⚠️ Nếu không xóa `.next`, biến env sẽ KHÔNG CẬP NHẬT!**

---

## ✅ **KIỂM TRA ĐÃ HOẠT ĐỘNG:**

### **1. Mở DevTools (F12)**
### **2. Tab Network**
### **3. Refresh trang (F5)**
### **4. Xem API calls:**

Nếu `.env.local` = `http://localhost:3782`

Bạn sẽ thấy:
```
✅ Request URL: http://localhost:3782/api/form-promotions
✅ Request URL: http://localhost:3782/api/display-promotions
```

Không còn:
```
❌ http://localhost:3781/api/...
```

---

## 🔍 **NẾU VẪN KHÔNG ĐỔI:**

### **Checklist:**
- [ ] File `.env.local` có tồn tại không?
- [ ] Tên biến đúng: `NEXT_PUBLIC_BASE_URL` (không phải `API_URL`)
- [ ] Đã xóa folder `.next` chưa?
- [ ] Đã restart server chưa?
- [ ] Clear browser cache (Ctrl + Shift + Del)

---

## 💡 **DEBUG:**

### **Kiểm tra env có load không:**

Thêm vào component (test):
```tsx
console.log('BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
```

Xem console log ra gì.

Nếu `undefined` → File `.env.local` chưa được load

---

## 📋 **TEMPLATE .env.local:**

```bash
# Backend API Base URL
# Development
NEXT_PUBLIC_BASE_URL=http://localhost:3782

# Production (khi deploy)
# NEXT_PUBLIC_BASE_URL=https://api.gk88.com
```

---

## 🎯 **TÓM TẮT NHANH:**

```bash
# 1. Tạo file .env.local
echo NEXT_PUBLIC_BASE_URL=http://localhost:3782 > .env.local

# 2. Xóa cache
rmdir /s /q .next

# 3. Restart
npm run dev

# 4. Test
# Mở F12 → Network → Refresh → Xem Request URL
```

---

**✅ NẾU LÀM ĐÚNG → API SẼ GỌI ĐẾN DOMAIN MỚI!**

