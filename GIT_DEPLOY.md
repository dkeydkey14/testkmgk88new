# 📤 PUSH CODE LÊN GIT & DEPLOY TỰ ĐỘNG

## 🚀 CÁCH 1: PUSH LÊN GITHUB (Khuyến nghị)

### **Bước 1: Tạo repository trên GitHub**

1. Truy cập: https://github.com/new
2. Tên repo: `gk88-khuyenmai`
3. Để Private hoặc Public
4. **KHÔNG** tick "Initialize with README"
5. Click "Create repository"

### **Bước 2: Commit code hiện tại**

```powershell
# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit - GK88 Khuyến Mãi System"
```

### **Bước 3: Push lên GitHub**

```powershell
# Thêm remote (thay YOUR_USERNAME bằng tên GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/gk88-khuyenmai.git

# Đổi branch thành main
git branch -M main

# Push lên GitHub
git push -u origin main
```

**Nhập username & password GitHub khi được hỏi**

---

## 🔄 AUTO DEPLOY VỚI CLOUDFLARE PAGES

### **Bước 1: Kết nối GitHub với Cloudflare Pages**

1. Truy cập: https://dash.cloudflare.com/
2. Pages → Create a project → Connect to Git
3. Chọn GitHub
4. Authorize Cloudflare
5. Chọn repository: `gk88-khuyenmai`

### **Bước 2: Cấu hình Build**

```
Framework preset: Next.js
Build command:    npm run build
Build output:     out
Root directory:   /
Branch:          main
```

### **Bước 3: Environment Variables**

Thêm trong Settings → Environment variables:

```
NEXT_PUBLIC_BASE_URL = https://your-backend-url.com
```

### **Bước 4: Deploy!**

Click "Save and Deploy"

---

## 🎯 SAU KHI SETUP:

Từ giờ, mỗi khi push code mới:

```powershell
git add .
git commit -m "Update features"
git push
```

→ **Cloudflare tự động build và deploy!** 🚀

---

## 📝 WORKFLOW ĐẦY ĐỦ:

```
1. Code → git add . → git commit -m "message" → git push
2. Cloudflare tự động:
   - Detect push
   - Run: npm install
   - Run: npm run build
   - Deploy folder out/
   - Update: https://gk88-khuyenmai.pages.dev
3. Done! (2-5 phút)
```

---

## 🔧 CẬP NHẬT CODE SAU NÀY:

```powershell
# Sửa code...

# Xem files đã thay đổi
git status

# Add files
git add .

# Commit với message mô tả
git commit -m "Add slider feature"

# Push lên GitHub
git push

# Cloudflare tự động deploy!
```

---

## 🌿 QUẢN LÝ BRANCHES:

### **Development branch:**

```powershell
# Tạo branch dev
git checkout -b dev

# Code trên dev...
git add .
git commit -m "Testing new feature"
git push origin dev
```

### **Merge vào main khi ready:**

```powershell
git checkout main
git merge dev
git push origin main
```

---

## 🐛 TROUBLESHOOTING:

### **Lỗi: "remote origin already exists"**

```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/gk88-khuyenmai.git
```

### **Lỗi: "failed to push"**

```powershell
git pull origin main --rebase
git push origin main
```

### **Lỗi: "Permission denied"**

Sử dụng Personal Access Token thay vì password:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token
3. Copy token
4. Dùng token làm password khi push

---

## ✅ CHECKLIST:

- [ ] Repository đã tạo trên GitHub
- [ ] `git init` trong project
- [ ] `.gitignore` đã có (tránh commit node_modules)
- [ ] `git add .` → Stage files
- [ ] `git commit -m "message"` → Commit
- [ ] `git remote add origin ...` → Add remote
- [ ] `git push -u origin main` → Push lần đầu
- [ ] Kết nối Cloudflare Pages với GitHub
- [ ] Cấu hình build settings
- [ ] Thêm environment variables
- [ ] Test auto deploy

---

## 🎉 KẾT QUẢ:

```
✅ Code trên GitHub: https://github.com/YOUR_USERNAME/gk88-khuyenmai
✅ Auto deploy:      https://gk88-khuyenmai.pages.dev
✅ Every push → Auto build & deploy!
```

**Miễn phí, tự động, và cực kỳ tiện lợi!** 🚀

