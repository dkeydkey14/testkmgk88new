# ⚡ QUICK START - Admin GK88

## 🚀 Truy Cập Nhanh

### Admin Chính
```
http://localhost:3000/admin
```

### 2 Hệ Thống Riêng Biệt

#### 1. **Khuyến Mãi FORM** 🔵 (Dropdown trong form đăng ký)
```
URL: /admin/form-promotions
API: /api/form-promotions
Data: data/form-promotions.json
```

#### 2. **Khuyến Mãi HIỂN THỊ** 🟠 (Danh sách có hình ảnh)
```
URL: /admin/display-promotions
API: /api/display-promotions
Data: data/display-promotions.json
```

---

## 🎯 Phân Biệt Nhanh

### Form Promotions (Xanh)
- ✅ Có: Mã, Tiêu đề, API Endpoint
- ❌ Không có: Hình ảnh, Nội dung HTML
- 📍 Hiển thị: Dropdown form đăng ký
- 🎯 Mục đích: Submit dữ liệu

### Display Promotions (Cam)
- ✅ Có: Mã, Tiêu đề, Hình ảnh, Nội dung HTML
- ❌ Không có: API Endpoint
- 📍 Hiển thị: Body trang chủ (grid 2 cột)
- 🎯 Mục đích: Hiển thị thông tin

---

## ✨ Thao Tác Cơ Bản

### Thêm mới
1. Click "Thêm Khuyến Mãi"
2. Điền thông tin
3. Click "Lưu"

### Sửa
1. Click icon ✏️
2. Chỉnh sửa
3. Click "Lưu"

### Xóa
1. Click icon 🗑️
2. Xác nhận

### Bật/Tắt
1. Click icon 🔛/🔴
2. Tự động lưu

### Sắp xếp
1. Click ↑ lên / ↓ xuống
2. Tự động lưu

---

## 📂 Cấu Trúc Files

```
khuyenmai-gk88-main/
├── data/
│   ├── form-promotions.json      ← Dữ liệu Form
│   └── display-promotions.json   ← Dữ liệu Display
│
├── src/app/api/
│   ├── form-promotions/          ← API Form
│   └── display-promotions/       ← API Display
│
└── src/app/admin/
    ├── page.tsx                  ← Trang chính
    ├── form-promotions/          ← Admin Form
    └── display-promotions/       ← Admin Display
```

---

## 🎓 Ví Dụ Nhanh

### Thêm "GK99" vào Form
```
Mã: GK99
Tiêu đề: KHUYẾN MÃI 99K
API: https://api.83868668.com/gk99
✅ Kích hoạt
```

### Thêm "GK99" vào Display
```
Mã: GK99
Tiêu đề: KHUYẾN MÃI 99K
Hình ảnh: /images/GK99.png
Nội dung: <html>...</html>
✅ Kích hoạt
```

---

## ⚠️ Lưu Ý

1. **Upload hình ảnh** vào `/public/images/` trước
2. **2 hệ thống độc lập** - sửa một không ảnh hưởng hai
3. **Chỉ "Bật"** mới hiển thị trên trang chủ
4. **Backup thường xuyên** file JSON

---

## 🐛 Lỗi Thường Gặp

| Lỗi | Giải Pháp |
|------|-----------|
| Không hiển thị | Kiểm tra `active = true` |
| Hình ảnh 404 | Kiểm tra file trong `/public/images/` |
| API lỗi | Kiểm tra backend có online |
| Admin không load | Restart: `npm run dev` |

---

## 📖 Tài Liệu Đầy Đủ

Xem: `README_SEPARATED_ADMIN.md`

---

**🎉 Chúc quản lý tốt!**

