#!/bin/bash

# Hiển thị banner
echo "====== Triển khai ứng dụng GK88 ======"

# Di chuyển vào thư mục dự án
cd "$(dirname "$0")"

# Đặt biến môi trường
export NODE_ENV=production

# Cài đặt dependencies
echo "Đang cài đặt dependencies..."
npm install

# Xóa thư mục .next nếu tồn tại để build mới hoàn toàn
echo "Xóa bản build cũ nếu có..."
if [ -d ".next" ]; then
    rm -rf .next
fi

# Build ứng dụng Next.js
echo "Đang build ứng dụng..."
npm run build

# Kiểm tra xem build có thành công không
if [ ! -f ".next/BUILD_ID" ]; then
    echo "Lỗi: Quá trình build không thành công. Không tìm thấy file .next/BUILD_ID"
    echo "Kiểm tra logs npm để biết thêm chi tiết về lỗi."
    exit 1
fi

# Thiết lập quyền thích hợp
echo "Thiết lập quyền cho thư mục build..."
chmod -R 755 .next

# Dừng ứng dụng hiện tại nếu đang chạy
echo "Dừng ứng dụng hiện tại nếu đang chạy..."
pm2 stop gk88-site 2>/dev/null || true

# Khởi động với PM2
echo "Khởi động ứng dụng với PM2..."
pm2 start ecosystem.config.js

# Lưu cấu hình PM2 để tự khởi động sau khi reboot
echo "Lưu cấu hình PM2..."
pm2 save

# Hiển thị trạng thái PM2
echo "Trạng thái PM2:"
pm2 status

echo ""
echo "Ứng dụng đã được triển khai và đang chạy!"
echo "Để xem logs, chạy: pm2 logs gk88-site"
echo "Truy cập ứng dụng tại: http://localhost:9900" 