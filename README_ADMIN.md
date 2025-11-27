# 📖 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG ADMIN

## 🎯 Tổng Quan

Hệ thống đã được tách biệt rõ ràng giữa **Frontend** và **Backend** để dễ dàng quản lý và chỉnh sửa khuyến mãi.

---

## 📁 CẤU TRÚC DỰ ÁN

### 🔵 BACKEND (API + Data)

```
/data/
  └── promotions.json          # Lưu trữ dữ liệu khuyến mãi

/src/app/api/
  └── promotions/
      └── route.ts             # API endpoints (GET, POST, PUT, DELETE)
```

### 🟢 FRONTEND

```
/src/app/admin/
  ├── page.tsx                 # Trang quản trị (Admin Panel)
  └── layout.tsx               # Layout admin

/src/components/
  ├── Body.tsx                 # Hiển thị danh sách khuyến mãi (lấy từ API)
  └── RegistrationForm.tsx     # Form đăng ký (lấy từ API)
```

---

## 🚀 TRUY CẬP TRANG ADMIN

### URL Trang Admin:
```
http://localhost:3000/admin
```
hoặc sau khi deploy:
```
https://yourdomain.com/admin
```

---

## 🛠️ CHỨC NĂNG ADMIN

### 1️⃣ **Xem Danh Sách Khuyến Mãi**
- Hiển thị tất cả khuyến mãi dạng bảng
- Thông tin: ID, Mã, Tiêu đề, Hình ảnh, API Endpoint, Trạng thái

### 2️⃣ **Thêm Khuyến Mãi Mới**
- Click nút **"Thêm Khuyến Mãi"**
- Điền thông tin:
  - **Mã Khuyến Mãi**: VD: GK01, GK02, ...
  - **Tiêu Đề**: Mô tả ngắn gọn
  - **Đường Dẫn Hình Ảnh**: `/images/ten-hinh.png`
  - **API Endpoint**: `https://api.83868668.com/gk01`
  - **Nội Dung HTML**: Chi tiết khuyến mãi (có thể dùng HTML tags)
  - **Kích Hoạt**: Checkbox để bật/tắt khuyến mãi
- Click **"Lưu"**

### 3️⃣ **Chỉnh Sửa Khuyến Mãi**
- Click icon **✏️ (Edit)** trên hàng khuyến mãi cần sửa
- Chỉnh sửa thông tin
- Click **"Lưu"**

### 4️⃣ **Xóa Khuyến Mãi**
- Click icon **🗑️ (Delete)** trên hàng khuyến mãi cần xóa
- Xác nhận xóa

### 5️⃣ **Bật/Tắt Khuyến Mãi**
- Click icon **🔛/🔴** ở cột "Trạng Thái"
- Khuyến mãi tắt sẽ không hiển thị trên trang chủ

---

## 📊 CẤU TRÚC DỮ LIỆU

### File: `data/promotions.json`

```json
{
  "promotions": [
    {
      "id": 1,
      "code": "GK01",
      "image": "/images/IMG_1172.png",
      "title": "HỘI VIÊN MỚI NẠP ĐẦU THƯỞNG 28.888.000VND",
      "apiEndpoint": "https://api.83868668.com/gk01",
      "active": true,
      "content": "※ Mã khuyến mãi: GK01 ..."
    }
  ]
}
```

### Các Trường Dữ Liệu:

| Trường | Kiểu | Mô Tả |
|--------|------|-------|
| `id` | number | ID tự động tăng |
| `code` | string | Mã khuyến mãi (VD: GK01) |
| `image` | string | Đường dẫn hình ảnh |
| `title` | string | Tiêu đề khuyến mãi |
| `apiEndpoint` | string | URL API để submit form |
| `active` | boolean | Trạng thái hiển thị (true/false) |
| `content` | string | Nội dung HTML chi tiết |

---

## 🔌 API ENDPOINTS

### Backend API (Tự động tạo)

#### 1. **GET** `/api/promotions`
Lấy danh sách khuyến mãi

**Query Parameters:**
- `active=true` - Chỉ lấy khuyến mãi đang hoạt động

**Response:**
```json
{
  "success": true,
  "promotions": [...]
}
```

#### 2. **POST** `/api/promotions`
Tạo khuyến mãi mới

**Body:**
```json
{
  "code": "GK01",
  "title": "...",
  "image": "/images/...",
  "apiEndpoint": "https://...",
  "active": true,
  "content": "..."
}
```

#### 3. **PUT** `/api/promotions`
Cập nhật khuyến mãi

**Body:**
```json
{
  "id": 1,
  "code": "GK01",
  ...
}
```

#### 4. **DELETE** `/api/promotions?id=1`
Xóa khuyến mãi theo ID

---

## 💡 LƯU Ý

### ✅ Ưu Điểm Hệ Thống Mới:
1. **Không cần sửa code** - Quản lý tất cả qua Admin Panel
2. **Dữ liệu tập trung** - Lưu trong file JSON dễ backup
3. **Linh hoạt** - Thêm/sửa/xóa khuyến mãi bất kỳ lúc nào
4. **Tự động đồng bộ** - Frontend tự động cập nhật khi có thay đổi

### ⚠️ Lưu Ý Khi Sử Dụng:
1. **Upload hình ảnh** vào thư mục `/public/images/` trước khi thêm khuyến mãi
2. **API Endpoint** phải chính xác để form đăng ký hoạt động
3. **Mã khuyến mãi** (code) nên unique để tránh nhầm lẫn
4. **Backup** file `data/promotions.json` thường xuyên

---

## 🔒 BẢO MẬT

**QUAN TRỌNG:** Trang admin hiện tại **CHƯA CÓ XÁC THỰC**.

### Để bảo mật, bạn nên:
1. Thêm middleware xác thực (NextAuth.js)
2. Giới hạn truy cập bằng password
3. Sử dụng role-based access control

---

## 📝 VÍ DỤ WORKFLOW

### Thêm khuyến mãi mới "GK99":

1. **Chuẩn bị hình ảnh:**
   - Upload `GK99.png` vào `/public/images/`

2. **Vào trang Admin:**
   - Truy cập: `http://localhost:3000/admin`

3. **Thêm khuyến mãi:**
   - Click "Thêm Khuyến Mãi"
   - Điền thông tin:
     - Mã: `GK99`
     - Tiêu đề: `KHUYẾN MÃI ĐẶC BIỆT 99.999K`
     - Hình ảnh: `/images/GK99.png`
     - API: `https://api.83868668.com/gk99`
     - Nội dung: Chi tiết HTML...
     - ✅ Kích hoạt
   - Click "Lưu"

4. **Kiểm tra:**
   - Vào trang chủ xem khuyến mãi đã hiển thị
   - Thử đăng ký form xem có hoạt động

---

## 🐛 TROUBLESHOOTING

### Khuyến mãi không hiển thị?
✅ Kiểm tra trạng thái `active = true`
✅ Xóa cache trình duyệt (Ctrl + F5)
✅ Kiểm tra console có lỗi API không

### Form đăng ký không hoạt động?
✅ Kiểm tra `apiEndpoint` có chính xác không
✅ Kiểm tra API backend có online không
✅ Xem console log có lỗi CORS không

### Admin không load được dữ liệu?
✅ Kiểm tra file `data/promotions.json` có tồn tại không
✅ Kiểm tra quyền đọc/ghi file
✅ Restart dev server: `npm run dev`

---

## 📞 HỖ TRỢ

Nếu cần hỗ trợ thêm, vui lòng liên hệ team dev.

**Happy Managing! 🎉**

