# 🔗 HƯỚNG DẪN QUẢN LÝ LINKS

## 🎯 **QUẢN LÝ TẤT CẢ LINKS Ở 1 NƠI!**

Không còn phải tìm trong code nữa! Tất cả links giờ quản lý tập trung!

---

## 📍 **Ở ĐÂU?**

```
http://localhost:3781/admin/links
```

Hoặc từ Admin Dashboard → Click "🔗 Quản Lý Links"

---

## 🎨 **GIAO DIỆN:**

```
┌────────────────────────────────────────────────────┐
│  🔗 Quản Lý Links              [← Quay lại]       │
├────────────────────────────────────────────────────┤
│                                                     │
│  🔗 Header (Đăng nhập / Đăng ký)                  │
│  ┌──────────────────────────────────────────────┐ │
│  │ URL Đăng Nhập:                                │ │
│  │ [https://pr1gk.xyz/                       ]   │ │
│  │                                                │ │
│  │ URL Đăng Ký:                                  │ │
│  │ [https://pr1gk.xyz/                       ]   │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  🏠 Top Section (Trang chủ / CSKH)                │
│  ┌──────────────────────────────────────────────┐ │
│  │ URL Trang Chủ:                                │ │
│  │ [https://gk8801.99886633.pro/             ]   │ │
│  │                                                │ │
│  │ URL CSKH (Telegram):                          │ │
│  │ [https://t.me/GK88HOTRO24H_BOT            ]   │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  🎧 Footer (Liên kết nhanh & Mạng xã hội)         │
│  ┌──────────────────────────────────────────────┐ │
│  │ URL Trang Chính:                              │ │
│  │ [https://8386.io/                         ]   │ │
│  │ (Dùng cho: Liên kết nhanh, FB, Spotify...)   │ │
│  │                                                │ │
│  │ URL Telegram:                                  │ │
│  │ [https://t.me/GK88HOTRO24H_BOT            ]   │ │
│  │                                                │ │
│  │ Hoặc tùy chỉnh riêng:                         │ │
│  │ Facebook: [...]  Spotify: [...]              │ │
│  │ LinkedIn: [...]                               │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│          [✅ Lưu Tất Cả Links]                     │
└────────────────────────────────────────────────────┘
```

---

## 🚀 **CÁCH DÙNG:**

### **Bước 1: Vào trang Admin Links**
```
http://localhost:3781/admin/links
```

### **Bước 2: Sửa URLs**
```
- Header: Đăng nhập + Đăng ký
- Top Section: Trang chủ + CSKH
- Footer: Trang chính + Telegram + Mạng xã hội
```

### **Bước 3: Click [✅ Lưu Tất Cả Links]**

### **Bước 4: Refresh trang chủ**
```
http://localhost:3781
→ Tất cả links đã thay đổi! ✅
```

---

## 📊 **PHÂN LOẠI LINKS:**

### **1. Header Links (2 links)**
```
┌─ Nút "Đăng Nhập"    → loginUrl
└─ Nút "Đăng Ký"      → registerUrl
```

**Vị trí:** Góc trên bên phải trang chủ

### **2. Top Section Links (2 links)**
```
┌─ Nút "TRANG CHU"    → homeUrl
└─ Nút "CSKH"         → cskhUrl
```

**Vị trí:** Dưới banner, trên form đăng ký

### **3. Footer Links (5+ links)**
```
├─ Liên kết nhanh (4 links)     → mainSiteUrl
├─ Liên hệ & Hỗ trợ (3 links)   → telegramUrl, mainSiteUrl
├─ Facebook icon                 → facebookUrl (hoặc mainSiteUrl)
├─ Spotify icon                  → spotifyUrl (hoặc mainSiteUrl)
├─ Telegram icon                 → telegramUrl
├─ LinkedIn icon                 → linkedinUrl (hoặc mainSiteUrl)
└─ Copyright links               → mainSiteUrl
```

**Vị trí:** Cuối trang

---

## 💡 **TÍNH NĂNG ĐẶC BIỆT:**

### **✅ Shared Links:**
Footer có **URL Trang Chính** dùng chung cho nhiều link:
- Liên kết nhanh (Trang chủ, Khuyến mãi, Hướng dẫn, Đăng ký)
- Facebook, Spotify, LinkedIn icons

**Lợi ích:** Chỉ cần sửa 1 chỗ → Đổi nhiều links cùng lúc!

### **✅ Custom Links:**
Nếu muốn từng mạng xã hội khác URL:
```
Facebook:  https://facebook.com/gk88
Spotify:   https://spotify.com/gk88  
LinkedIn:  https://linkedin.com/company/gk88
```

Chỉ cần điền vào phần "Hoặc tùy chỉnh riêng"!

---

## 🔥 **VÍ DỤ THỰC TẾ:**

### **Case 1: Đổi domain tất cả links**
```
Tình huống: Domain mới là https://new-domain.com

Bước:
1. Vào /admin/links
2. Sửa:
   - Header: loginUrl = https://new-domain.com/login
   - Header: registerUrl = https://new-domain.com/register
   - Top Section: homeUrl = https://new-domain.com
   - Footer: mainSiteUrl = https://new-domain.com
   - Footer: telegramUrl = giữ nguyên
3. Lưu
4. Refresh trang chủ → Done! ✅
```

### **Case 2: Chỉ đổi Telegram**
```
Tình huống: Có bot Telegram mới

Bước:
1. Vào /admin/links
2. Sửa:
   - Top Section: cskhUrl = https://t.me/NEW_BOT
   - Footer: telegramUrl = https://t.me/NEW_BOT
3. Lưu
4. Done! Chỉ mất 30 giây! ✅
```

### **Case 3: Thêm mạng xã hội riêng**
```
Tình huống: Muốn FB link riêng

Bước:
1. Vào /admin/links
2. Phần "Hoặc tùy chỉnh riêng"
3. Facebook: https://facebook.com/gk88official
4. Lưu
5. Done! FB icon giờ dùng link riêng! ✅
```

---

## 📝 **WORKFLOW:**

```
1. Có link mới cần đổi
   ↓
2. Vào /admin/links
   ↓
3. Tìm phần tương ứng:
   - Header
   - Top Section  
   - Footer
   ↓
4. Sửa URL
   ↓
5. Click [Lưu]
   ↓
6. Refresh trang chủ
   ↓
7. Kiểm tra link → Done! ✅
```

**Thời gian: 1-2 phút!**

---

## 🎯 **TẤT CẢ LINKS ĐƯỢC QUẢN LÝ:**

### **Components cũ (Hardcode):**
```tsx
// ❌ TRƯỚC
<a href="https://pr1gk.xyz/">Đăng nhập</a>
```

### **Components mới (Dynamic):**
```tsx
// ✅ SAU
const [links, setLinks] = useState({ loginUrl: '' });

useEffect(() => {
  fetch('/api/links')
    .then(res => res.json())
    .then(data => setLinks(data.links.header));
}, []);

<a href={links.loginUrl || '#'}>Đăng nhập</a>
```

**Kết quả:** Link đọc từ API → Đổi trong admin → Tất cả đổi theo!

---

## 🔧 **CẤU TRÚC DATA:**

```json
{
  "header": {
    "loginUrl": "https://pr1gk.xyz/",
    "registerUrl": "https://pr1gk.xyz/"
  },
  "topSection": {
    "homeUrl": "https://gk8801.99886633.pro/",
    "cskhUrl": "https://t.me/GK88HOTRO24H_BOT"
  },
  "footer": {
    "mainSiteUrl": "https://8386.io/",
    "telegramUrl": "https://t.me/GK88HOTRO24H_BOT",
    "facebookUrl": "https://8386.io/",
    "spotifyUrl": "https://8386.io/",
    "linkedinUrl": "https://8386.io/"
  }
}
```

**File:** `data/links.json`

---

## ✅ **CHECKLIST:**

- [x] Tạo data file `links.json`
- [x] Tạo API `/api/links` (GET, PUT)
- [x] Tạo admin page `/admin/links`
- [x] Update `Header.tsx` đọc từ API
- [x] Update `TopSection.tsx` đọc từ API
- [x] Tạo `Footer.tsx` component mới
- [x] Update `page.tsx` dùng Footer component
- [x] Thêm menu "Quản Lý Links" vào Sidebar

---

## 🎊 **ƯU ĐIỂM:**

### **Trước (Hardcode):**
```
❌ Links nằm rải rác trong 5+ files
❌ Muốn đổi phải tìm từng file
❌ Dễ sót, dễ nhầm
❌ Mất 15-30 phút
❌ Phải biết code
```

### **Sau (Centralized):**
```
✅ Tất cả links ở 1 nơi
✅ Giao diện trực quan
✅ Sửa 1 lần → Đổi nhiều chỗ
✅ Mất 1-2 phút
✅ Không cần biết code! 🎉
```

---

## 📖 **TỔNG KẾT:**

```
✨ Admin Links Manager
├── Quản lý Header links (2)
├── Quản lý Top Section links (2)
├── Quản lý Footer links (5+)
├── Shared URLs (tiết kiệm thời gian)
├── Custom URLs (linh hoạt)
└── Save 1 lần → Update toàn bộ!

🎯 Vị trí:
http://localhost:3781/admin/links

🚀 Thời gian:
1-2 phút đổi tất cả links!

💡 Không cần code:
UI trực quan, click & save!
```

---

**🎉 GIỜ ĐỔI LINK DỄ NHƯ CHƠI!**

**Vào /admin/links → Sửa → Lưu → Xong! 🚀**

