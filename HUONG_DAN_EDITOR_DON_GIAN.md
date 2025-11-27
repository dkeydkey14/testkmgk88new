# ✏️ HƯỚNG DẪN EDITOR - SIÊU ĐƠN GIẢN

## 🎯 **EDITOR MỚI - KHÔNG CẦN BIẾT CODE!**

Editor giờ có **2 CHẾ ĐỘ:**

---

## 📺 **1. CHẾ ĐỘ TRỰC QUAN (Preview)**

**Chức năng:** Xem trước nội dung đã format

```
┌─────────────────────────────────────────┐
│ 👁️ Chế độ Trực Quan   [Xem HTML]       │
├─────────────────────────────────────────┤
│                                          │
│  Hiển thị nội dung đã format:           │
│                                          │
│  ※ Mã khuyến mãi: GK01                  │
│  ※ Đối tượng: Tất cả thành viên         │
│                                          │
└─────────────────────────────────────────┘
```

**Dùng để:** Xem kết quả cuối cùng

---

## 🔧 **2. CHẾ ĐỘ HTML (Edit)**

**Chức năng:** Chỉnh sửa HTML với toolbar hỗ trợ

```
┌─────────────────────────────────────────┐
│ 📝 Chế độ HTML   [Chuyển sang Trực Quan] │
├─────────────────────────────────────────┤
│ [H2][H3] | [B][I][U] | [•][1.] | [🔗][🖼️] │  ← TOOLBAR
│ [BR][Table][🧡 Cam]                      │
├─────────────────────────────────────────┤
│                                          │
│  <h2>Mã khuyến mãi: GK01</h2>           │
│  <p>※ Đối tượng: ...</p>                │
│                                          │
└─────────────────────────────────────────┘
```

**Dùng để:** Tạo và chỉnh sửa nội dung

---

## 🚀 **CÁCH DÙNG - 2 PHÚT HỌC XONG:**

### **Bước 1: Vào trang Admin**
```
http://localhost:3781/admin/display-promotions
```

### **Bước 2: Tạo mới hoặc sửa**
Click "Thêm Mới" hoặc "✏️" Edit

### **Bước 3: Xuống phần "Nội Dung Khuyến Mãi"**
Mặc định hiển thị **Chế độ Trực Quan** (Preview)

### **Bước 4: Click "Xem HTML"**
Chuyển sang **Chế độ HTML** để chỉnh sửa

### **Bước 5: Dùng Toolbar**
Bôi đen text → Click nút toolbar

---

## 🛠️ **TOOLBAR - GIẢI THÍCH:**

### **Tiêu đề:**
```
[H2] - Tiêu đề lớn
[H3] - Tiêu đề nhỏ

Cách dùng:
1. Bôi đen text: "Mã khuyến mãi"
2. Click [H2]
→ Kết quả: <h2>Mã khuyến mãi</h2>
```

### **Format text:**
```
[B] - In đậm (Bold)
[I] - In nghiêng (Italic)  
[U] - Gạch chân (Underline)

Cách dùng:
1. Bôi đen: "GK01"
2. Click [B]
→ Kết quả: <strong>GK01</strong>
```

### **Danh sách:**
```
[•] - Danh sách chấm
[1.] - Danh sách số

Cách dùng:
1. Click [•]
→ Insert: <ul><li>Item</li></ul>
```

### **Insert:**
```
[🔗] - Thêm link
[🖼️] - Thêm hình

Cách dùng link:
1. Bôi đen: "Đăng ký ngay"
2. Click [🔗]
3. Nhập URL: https://...
→ Kết quả: <a href="...">Đăng ký ngay</a>

Cách dùng hình:
1. Click [🖼️]
2. Nhập đường dẫn: /images/promo.jpg
→ Insert: <img src="..." />
```

### **Đặc biệt:**
```
[BR] - Xuống dòng
[Table] - Insert bảng mẫu
[🧡 Cam] - Format chữ màu cam

Cách dùng màu cam:
1. Bôi đen: "288K"
2. Click [🧡 Cam]
→ Kết quả: <span style="color: orange">288K</span>
```

---

## 📝 **VÍ DỤ THỰC TẾ:**

### **Tạo nội dung này:**

```
※ Mã khuyến mãi: GK99
※ Đối tượng: Tất cả thành viên

Nạp 1,000K nhận 288K thưởng!
```

### **Làm thế nào:**

**1. Click "Xem HTML"**

**2. Nhập:**
```
※ Mã khuyến mãi: GK99
※ Đối tượng: Tất cả thành viên

Nạp 1,000K nhận 288K thưởng!
```

**3. Bôi đen "GK99" → Click [🧡 Cam]**

**4. Bôi đen "288K" → Click [B] → Click [🧡 Cam]**

**5. Click "Chuyển sang Trực Quan"** → Xem kết quả

**6. Hài lòng → Click "Lưu"**

---

## 🎯 **TEMPLATE CÓ SẴN:**

### **Template 1: Khuyến mãi cơ bản**
```html
<h2>※ Mã khuyến mãi: <span style="color: orange; font-weight: bold;">GK88</span></h2>

<p>※ Đối tượng: Tất cả thành viên</p>
<p>※ Thời gian: Từ bây giờ</p>
<p>※ Lưu ý: 1 điểm = 1000 VND</p>

<h3>Chi tiết sự kiện:</h3>
<p>Nạp <strong>1,000K</strong> nhận <strong style="color: orange;">288K</strong> thưởng!</p>
```

### **Template 2: Có bảng**
```html
<h2>※ Bảng thưởng</h2>

<table border="1" style="width: 80%; border-collapse: collapse; margin: 0 auto;">
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
    <tr>
      <td style="border: 1px solid black; padding: 8px;">5,000K</td>
      <td style="border: 1px solid black; padding: 8px;">1,888K</td>
    </tr>
  </tbody>
</table>
```

**Copy template → Paste vào editor → Sửa số liệu → Done!**

---

## 💡 **MẸO HAY:**

### **Tip 1: Dùng template**
```
1. Copy template có sẵn (trên)
2. Paste vào editor
3. Sửa số liệu
4. Save
→ Nhanh hơn gõ từ đầu!
```

### **Tip 2: Xuống dòng**
```
HTML: Dùng <br /> để xuống dòng
Hoặc bọc trong <p>...</p>

Ví dụ:
Dòng 1<br />
Dòng 2

Hoặc:
<p>Dòng 1</p>
<p>Dòng 2</p>
```

### **Tip 3: Màu cam**
```
Bôi đen → Click [🧡 Cam]

Hoặc gõ trực tiếp:
<span style="color: orange">Text cam</span>
```

### **Tip 4: In đậm + màu cam**
```
<strong style="color: orange;">288K</strong>
```

### **Tip 5: Insert ký tự đặc biệt**
```
※ - Copy paste từ đây
→ Hoặc gõ: &#8251;
```

---

## 🎨 **STYLING CƠ BẢN:**

### **Màu chữ:**
```html
<span style="color: orange;">Chữ cam</span>
<span style="color: red;">Chữ đỏ</span>
```

### **In đậm:**
```html
<strong>Chữ đậm</strong>
<b>Chữ đậm</b>
```

### **Căn giữa:**
```html
<div style="text-align: center;">Nội dung</div>
```

### **Font size:**
```html
<span style="font-size: 18px;">Chữ lớn</span>
<span style="font-size: 12px;">Chữ nhỏ</span>
```

---

## ⚡ **WORKFLOW NHANH:**

```
1. Vào /admin/display-promotions
2. Click "Thêm Mới"
3. Điền: Mã, Tiêu đề, Hình
4. Phần "Nội Dung":
   → Click "Xem HTML"
   → Copy template có sẵn
   → Paste vào
   → Sửa số liệu
   → Click [🧡 Cam] cho số tiền
   → Click "Chuyển sang Trực Quan" xem kết quả
5. Click "Lưu"
→ XONG! ✅
```

---

## 🔥 **DEMO - TẠO TRONG 1 PHÚT:**

### **Mục tiêu:** Tạo khuyến mãi GK99

**Bước 1:** Copy template:
```html
<h2>※ Mã: <span style="color: orange; font-weight: bold;">GK99</span></h2>
<p>※ Nạp <strong>1,000K</strong> nhận <strong style="color: orange;">288K</strong></p>
```

**Bước 2:** Paste vào editor

**Bước 3:** Sửa:
- `GK99` → Mã của bạn
- `1,000K` → Số tiền nạp
- `288K` → Số tiền thưởng

**Bước 4:** Preview → Save

**Done!** 🎉

---

## 📊 **SO SÁNH 2 CHẾ ĐỘ:**

| Tính năng | Chế độ Trực Quan | Chế độ HTML |
|-----------|------------------|-------------|
| Xem kết quả | ✅ Có | ❌ Không |
| Chỉnh sửa | ❌ Không | ✅ Có |
| Toolbar | ❌ Không | ✅ Có |
| Cho người mới | ✅ Tốt (xem) | ⚠️ Cần học HTML |
| Toggle | → Xem HTML | → Trực Quan |

---

## ✅ **TÓM TẮT:**

```
✨ Chế độ Trực Quan
└── Xem preview nội dung đã format

✨ Chế độ HTML  
├── Toolbar hỗ trợ insert tags
├── Bôi đen → Click nút
└── Template có sẵn copy/paste

🎯 Người không biết code:
└── Dùng template → Sửa số liệu → Done!

🎯 Người biết HTML:
└── Gõ trực tiếp → Format thoải mái!
```

---

## 🎊 **ƯU ĐIỂM:**

✅ Không cần cài package  
✅ Toolbar đơn giản dễ dùng  
✅ Template có sẵn  
✅ Toggle HTML/Preview  
✅ Bôi đen → Click → Insert tag  
✅ Nút màu cam 🧡  
✅ Nút insert table  
✅ Đếm ký tự  

---

**🚀 BÂY GIỜ TẠO KHUYẾN MÃI DỄ NHƯ PASTE + SỬA!**

**Copy template → Paste → Sửa số → Save → XONG! 🎉**

