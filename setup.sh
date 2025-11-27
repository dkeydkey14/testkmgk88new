#!/bin/bash

# Hiển thị thông báo
echo "====== Cài đặt môi trường cho ứng dụng GK88 ======"

# Kiểm tra hệ điều hành
if [ -f /etc/redhat-release ]; then
    # CentOS/RHEL (thường dùng trong aaPanel)
    echo "Phát hiện CentOS/RHEL - Cài đặt cho aaPanel..."
    
    # Cài đặt Node.js 18
    echo "Cài đặt Node.js 18..."
    if ! command -v node &> /dev/null || [[ $(node -v) != *"v18"* ]]; then
        curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
        yum install -y nodejs
    else
        echo "Node.js 18 đã được cài đặt."
    fi
else
    # Ubuntu/Debian
    echo "Phát hiện Ubuntu/Debian..."
    
    # Cài đặt công cụ cần thiết
    echo "Cài đặt công cụ cần thiết..."
    apt-get update
    apt-get install -y npm git
    
    # Cài đặt Node.js 18
    echo "Cài đặt Node.js 18..."
    if ! command -v node &> /dev/null || [[ $(node -v) != *"v18"* ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    else
        echo "Node.js 18 đã được cài đặt."
    fi
fi

# Kiểm tra phiên bản
echo "Phiên bản Node.js:"
node -v
echo "Phiên bản NPM:"
npm -v

# Cài đặt PM2 global
echo "Cài đặt PM2..."
npm install -g pm2

# Thiết lập quyền thư mục
echo "Thiết lập quyền thư mục..."
current_dir=$(pwd)
# Đảm bảo thư mục có quyền đầy đủ
chmod -R 755 "$current_dir"

echo "Hoàn tất cài đặt môi trường!"
echo "Để triển khai ứng dụng, chạy: ./start.sh" 