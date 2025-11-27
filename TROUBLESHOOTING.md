# 🔧 TROUBLESHOOTING - Không hiển thị data

## ❗ Vấn đề: Data có sẵn nhưng không hiển thị

### ✅ **Giải pháp nhanh:**

#### **Bước 1: Restart Dev Server**
```bash
# Tắt server hiện tại (Ctrl + C)
# Sau đó chạy lại:
npm run dev
```

**⚠️ Quan trọng:** API routes mới cần restart server để Next.js nhận diện!

---

#### **Bước 2: Xóa .next và build lại**
```bash
# Tắt server
# Xóa folder .next
rmdir /s /q .next

# Chạy lại
npm run dev
```

---

#### **Bước 3: Kiểm tra Console**

**Mở DevTools:**
1. Nhấn `F12` hoặc `Ctrl + Shift + I`
2. Chuyển sang tab **Console**
3. Refresh trang (`F5`)
4. Xem có lỗi gì không

**Các lỗi thường gặp:**

##### ❌ **404 Not Found - /api/display-promotions**
```
Nguyên nhân: API route chưa được load
Giải pháp: Restart dev server
```

##### ❌ **Failed to fetch**
```
Nguyên nhân: Server không chạy
Giải pháp: npm run dev
```

##### ❌ **Cannot find module 'fs'**
```
Nguyên nhân: API route đang chạy client-side
Giải pháp: Đảm bảo file có 'use server' hoặc trong /api/
```

---

#### **Bước 4: Test API trực tiếp**

**Mở trình duyệt và truy cập:**
```
http://localhost:3000/api/display-promotions
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "promotions": [
    {
      "id": 1,
      "code": "GK01",
      "image": "/images/IMG_1172.png",
      "title": "HỘI VIÊN MỚI...",
      ...
    }
  ]
}
```

**Nếu thấy JSON trên = API hoạt động! ✅**

---

#### **Bước 5: Test Form API**
```
http://localhost:3000/api/form-promotions
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "promotions": [
    {
      "id": 1,
      "code": "GK01",
      "title": "HỘI VIÊN MỚI...",
      "apiEndpoint": "https://...",
      ...
    }
  ]
}
```

---

## 🔍 **Kiểm tra chi tiết**

### **1. Kiểm tra file paths:**
```
✅ data/form-promotions.json        (có)
✅ data/display-promotions.json     (có)
✅ src/app/api/form-promotions/route.ts
✅ src/app/api/display-promotions/route.ts
```

### **2. Kiểm tra components:**
```tsx
// Body.tsx
const response = await fetch('/api/display-promotions?active=true');

// RegistrationForm.tsx  
const response = await fetch('/api/form-promotions?active=true');
```

### **3. Kiểm tra trang hiển thị:**

**Trang chủ (Body):**
- URL: `http://localhost:3000`
- Scroll xuống → Xem "SỰ KIỆN HOT TẠI GK88"
- Nếu thấy "Đang tải khuyến mãi..." mãi = API lỗi
- Nếu thấy grid 2 cột với hình ảnh = OK ✅

**Form đăng ký (RegistrationForm):**
- URL: `http://localhost:3000`
- Xem dropdown "Thông tin khuyến mãi"
- Nếu thấy "Đang tải khuyến mãi..." mãi = API lỗi
- Nếu thấy danh sách khuyến mãi = OK ✅

---

## 🛠️ **Fix nhanh**

### **Nếu API 404:**
```bash
# Kiểm tra folder API có đúng không:
ls src/app/api/

# Phải có:
# - form-promotions/
# - display-promotions/

# Restart:
npm run dev
```

### **Nếu data rỗng:**
```bash
# Kiểm tra JSON syntax:
# Mở data/display-promotions.json
# Đảm bảo không có lỗi syntax

# Test đọc file:
node -e "console.log(require('./data/display-promotions.json'))"
```

### **Nếu CORS error:**
```
Không nên xảy ra vì cùng domain
Nhưng nếu có, check next.config.js
```

---

## 📝 **Checklist đầy đủ**

- [ ] Dev server đã restart
- [ ] Folder `.next` đã xóa
- [ ] File data tồn tại (✅ có rồi)
- [ ] API routes tồn tại
- [ ] Test API trực tiếp (browser)
- [ ] Console không có lỗi
- [ ] Network tab thấy request thành công

---

## 🚀 **Các bước theo thứ tự**

```bash
# 1. Dừng server (Ctrl + C)

# 2. Xóa cache
rmdir /s /q .next

# 3. Chạy lại
npm run dev

# 4. Mở browser
http://localhost:3000

# 5. Kiểm tra Console (F12)

# 6. Test API
http://localhost:3000/api/display-promotions
```

---

## 💡 **Nếu vẫn không được**

### **Thêm console log để debug:**

**Trong Body.tsx:**
```tsx
const fetchPromotions = async () => {
  try {
    console.log('🔵 Đang fetch display promotions...');
    const response = await fetch('/api/display-promotions?active=true');
    console.log('📥 Response:', response);
    const data = await response.json();
    console.log('📊 Data:', data);
    if (data.success) {
      console.log('✅ Promotions:', data.promotions);
      setPromotions(data.promotions);
    }
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
};
```

**Trong RegistrationForm.tsx:**
```tsx
const loadPromotions = async () => {
  try {
    console.log('🔵 Đang fetch form promotions...');
    const response = await fetch('/api/form-promotions?active=true');
    console.log('📥 Response:', response);
    const data = await response.json();
    console.log('📊 Data:', data);
    ...
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
};
```

Sau đó xem Console log gì!

---

## 📞 **Các lỗi phổ biến**

| Lỗi | Nguyên nhân | Giải pháp |
|------|-------------|-----------|
| API 404 | Chưa restart | Restart server |
| Empty array | JSON lỗi | Kiểm tra syntax |
| Loading mãi | API không response | Check API route |
| No data | active=false | Bật trong admin |

---

**🎯 Hãy restart server và test lại!**

