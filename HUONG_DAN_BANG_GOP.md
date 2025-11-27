# 📊 HƯỚNG DẪN TẠO BẢNG VÀ GỘP Ô

## 🎯 **2 CÁCH TẠO BẢNG:**

### **1️⃣ Bảng Tùy Chỉnh [📊 Bảng]**
- Chọn số cột (2-10)
- Chọn số hàng (1-20)
- Tự động tạo bảng

### **2️⃣ Bảng Có Sẵn Gộp Ô [📊 Bảng Gộp]**
- Bảng mẫu có sẵn các ô đã gộp
- Copy → Sửa nội dung → Done!

---

## 🚀 **CÁCH 1: TẠO BẢNG TÙY CHỈNH**

### **Bước 1: Click [📊 Bảng]**

### **Bước 2: Nhập số cột**
```
Popup hiện: "Nhập số cột (2-10):"
→ Gõ: 4
→ Enter
```

### **Bước 3: Nhập số hàng**
```
Popup hiện: "Nhập số hàng (1-20):"
→ Gõ: 5
→ Enter
```

### **Kết quả:**
```
┌────────┬────────┬────────┬────────┐
│ Cột 1  │ Cột 2  │ Cột 3  │ Cột 4  │ ← Header
├────────┼────────┼────────┼────────┤
│ D 1.1  │ D 1.2  │ D 1.3  │ D 1.4  │ ← Dòng 1
│ D 2.1  │ D 2.2  │ D 2.3  │ D 2.4  │ ← Dòng 2
│ D 3.1  │ D 3.2  │ D 3.3  │ D 3.4  │ ← Dòng 3
│ D 4.1  │ D 4.2  │ D 4.3  │ D 4.4  │ ← Dòng 4
│ D 5.1  │ D 5.2  │ D 5.3  │ D 5.4  │ ← Dòng 5
└────────┴────────┴────────┴────────┘
```

### **Bước 4: Sửa nội dung**
```
Click vào ô → Gõ text mới
```

---

## 🎨 **CÁCH 2: DÙNG BẢNG MẪU CÓ GỘP Ô**

### **Click [📊 Bảng Gộp]**

### **Kết quả - Bảng mẫu:**
```
┌──────────────────────────────────────────┐
│  BẢNG KHUYẾN MÃI (Gộp 3 cột)            │ ← colspan="3"
├──────────┬──────────┬────────────────────┤
│   Nạp    │  Thưởng  │    Tổng nhận       │
├──────────┼──────────┤                    │
│ 1,000K   │  288K    │  Liên hệ CSKH      │ ← rowspan="2"
├──────────┼──────────┤  (Gộp 2 dòng)      │
│ 5,000K   │  888K    │                    │
├──────────┴──────────┼────────────────────┤
│ Nạp từ 10,000K      │     1,888K         │ ← colspan="2"
│ (Gộp 2 cột)         │                    │
└─────────────────────┴────────────────────┘
```

### **Sửa thành bảng của bạn:**
```
1. Click vào ô
2. Sửa text
3. Done!
```

---

## 🔧 **CÁCH GỘP Ô THỦ CÔNG (HTML):**

### **Gộp cột ngang (colspan):**
```html
<!-- Gộp 2 cột -->
<td colspan="2">Nội dung gộp 2 cột</td>

<!-- Gộp 3 cột -->
<td colspan="3">Nội dung gộp 3 cột</td>
```

### **Gộp dòng dọc (rowspan):**
```html
<!-- Gộp 2 dòng -->
<td rowspan="2">Nội dung gộp 2 dòng</td>

<!-- Gộp 3 dòng -->
<td rowspan="3">Nội dung gộp 3 dòng</td>
```

### **Gộp cả ngang + dọc:**
```html
<td colspan="2" rowspan="2">Gộp 2x2</td>
```

---

## 📝 **VÍ DỤ THỰC TẾ:**

### **Tạo bảng khuyến mãi 3 cấp:**

**Mục tiêu:**
```
┌────────────────────────────┐
│   BẢNG KHUYẾN MÃI NẠP     │ ← Gộp toàn bộ
├──────────┬─────────────────┤
│   Nạp    │     Thưởng      │
├──────────┼─────────────────┤
│  1,000K  │      288K       │
│  5,000K  │      888K       │
│ 10,000K  │     1,888K      │
└──────────┴─────────────────┘
```

**Cách làm:**

**Option 1: Dùng [📊 Bảng]**
```
1. Click [📊 Bảng]
2. Số cột: 2
3. Số hàng: 3
4. Sửa nội dung
5. Toggle sang HTML mode
6. Thêm dòng header gộp:
   <tr><th colspan="2">BẢNG KHUYẾN MÃI NẠP</th></tr>
```

**Option 2: Dùng [📊 Bảng Gộp] → Sửa**
```
1. Click [📊 Bảng Gộp]
2. Click vào các ô → Sửa text
3. Xóa dòng/cột không cần
```

---

## 🛠️ **CHỈNH SỬA BẢNG:**

### **Sửa nội dung ô:**
```
Chế độ WYSIWYG:
→ Click vào ô → Gõ text mới
```

### **Thêm/Xóa dòng:**
```
Toggle sang HTML mode:
→ Copy dòng <tr>...</tr>
→ Paste để thêm
→ Xóa dòng <tr>...</tr> để xóa
```

### **Thêm/Xóa cột:**
```
Toggle sang HTML mode:
→ Thêm <td>...</td> vào mỗi dòng
→ Xóa <td>...</td> để xóa cột
→ Nhớ update colspan của header nếu có!
```

### **Gộp ô:**
```
Toggle sang HTML mode:
→ Thêm colspan="2" hoặc rowspan="2"
→ Xóa ô thừa

Ví dụ:
Trước: <td>A</td><td>B</td>
Sau:   <td colspan="2">A+B</td>
```

---

## 🎨 **TEMPLATE BẢNG MẪU:**

### **Template 1: Bảng 2 cột đơn giản**
```html
<table border="1" style="width: 80%; border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr style="background-color: orange;">
      <th style="border: 1px solid black; padding: 8px;">Nạp</th>
      <th style="border: 1px solid black; padding: 8px;">Thưởng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">1,000K</td>
      <td style="border: 1px solid black; padding: 8px;">288K</td>
    </tr>
  </tbody>
</table>
```

### **Template 2: Bảng gộp header**
```html
<table border="1" style="width: 80%; border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr style="background-color: orange;">
      <th colspan="3" style="border: 1px solid black; padding: 8px;">KHUYẾN MÃI</th>
    </tr>
    <tr style="background-color: #ffa500;">
      <th style="border: 1px solid black; padding: 8px;">Cột 1</th>
      <th style="border: 1px solid black; padding: 8px;">Cột 2</th>
      <th style="border: 1px solid black; padding: 8px;">Cột 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">A</td>
      <td style="border: 1px solid black; padding: 8px;">B</td>
      <td style="border: 1px solid black; padding: 8px;">C</td>
    </tr>
  </tbody>
</table>
```

### **Template 3: Bảng gộp dọc**
```html
<table border="1" style="width: 80%; border-collapse: collapse; margin: 20px auto;">
  <tbody>
    <tr>
      <td rowspan="3" style="border: 1px solid black; padding: 8px; background-color: orange;">
        <strong>Nhóm A</strong><br />(Gộp 3 dòng)
      </td>
      <td style="border: 1px solid black; padding: 8px;">Item 1</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">Item 2</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">Item 3</td>
    </tr>
  </tbody>
</table>
```

---

## 💡 **MẸO HAY:**

### **Mẹo 1: Tạo bảng phức tạp**
```
1. Click [📊 Bảng Gộp] → Có bảng mẫu
2. Toggle HTML → Copy code
3. Sửa colspan/rowspan theo ý
4. Toggle WYSIWYG → Xem kết quả
```

### **Mẹo 2: Màu nền cho ô**
```html
<td style="background-color: yellow;">Nổi bật</td>
<td style="background-color: orange;">Cam</td>
<td style="background-color: #ffcccc;">Hồng nhạt</td>
```

### **Mẹo 3: Căn giữa nội dung**
```html
<td style="text-align: center;">Giữa</td>
<td style="text-align: center; vertical-align: middle;">Giữa cả 2</td>
```

### **Mẹo 4: Width cột**
```html
<td style="width: 30%;">Cột hẹp</td>
<td style="width: 70%;">Cột rộng</td>
```

### **Mẹo 5: Font size trong bảng**
```html
<td style="font-size: 18px; font-weight: bold;">To & đậm</td>
```

---

## 🔥 **WORKFLOW NHANH:**

### **Tạo bảng đơn giản:**
```
1. Click [📊 Bảng]
2. Số cột: 3
3. Số hàng: 4
4. Click vào ô → Sửa text
5. Done! ✅
```

### **Tạo bảng có gộp ô:**
```
1. Click [📊 Bảng Gộp]
2. Click vào ô → Sửa text
3. Nếu cần sửa cấu trúc:
   → Toggle HTML
   → Sửa colspan/rowspan
   → Toggle WYSIWYG
4. Done! ✅
```

---

## 📊 **GIẢI THÍCH COLSPAN & ROWSPAN:**

### **colspan - Gộp ngang:**
```
Bình thường:
┌───┬───┬───┐
│ A │ B │ C │
└───┴───┴───┘

colspan="2":
┌───────┬───┐
│  A+B  │ C │ ← A gộp 2 cột, B bị xóa
└───────┴───┘

HTML:
<tr>
  <td colspan="2">A+B</td>
  <td>C</td>
</tr>
```

### **rowspan - Gộp dọc:**
```
Bình thường:
┌───┬───┐
│ A │ B │
├───┼───┤
│ C │ D │
└───┴───┘

rowspan="2":
┌───┬───┐
│   │ B │
│ A ├───┤ ← A gộp 2 dòng
│   │ D │
└───┴───┘

HTML:
<tr>
  <td rowspan="2">A</td>
  <td>B</td>
</tr>
<tr>
  <td>D</td> ← Không có C vì A đã gộp!
</tr>
```

---

## ✅ **CHECKLIST:**

- [x] Có 2 nút: [Bảng] và [Bảng Gộp]
- [x] [Bảng] cho chọn số cột/dòng
- [x] [Bảng Gộp] có mẫu sẵn với colspan/rowspan
- [x] Có thể sửa nội dung trong WYSIWYG
- [x] Có thể toggle HTML để sửa cấu trúc
- [x] Template sẵn có để copy

---

## 🎊 **TÓM TẮT:**

```
✨ Bảng Tùy Chỉnh
├── Click [📊 Bảng]
├── Chọn số cột (2-10)
├── Chọn số hàng (1-20)
└── Tự động tạo bảng

✨ Bảng Có Gộp Ô
├── Click [📊 Bảng Gộp]
├── Có sẵn mẫu colspan & rowspan
└── Sửa nội dung → Done!

✨ Gộp Ô Thủ Công
├── Toggle sang HTML mode
├── Thêm colspan="X" (gộp ngang)
├── Thêm rowspan="Y" (gộp dọc)
└── Xóa ô thừa
```

---

**🚀 GIỜ TẠO BẢNG PHỨC TẠP DỄ NHƯ TRÒ CHƠI!**

**Click [Bảng Gộp] → Sửa text → Done! 🎉**

