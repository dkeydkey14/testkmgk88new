module.exports = {
  apps: [
    {
      name: 'gk88-site', // Tên ứng dụng hiển thị trong PM2
      script: 'node_modules/next/dist/bin/next', // Đường dẫn đến script Next.js
      args: 'start', // Tham số chạy Next.js ở chế độ production
      instances: '1', // Số instance chạy (1 để tránh xung đột)
      exec_mode: 'cluster', // Chế độ thực thi để tận dụng đa nhân CPU
      watch: false, // Không theo dõi thay đổi file để tự động khởi động lại
      max_memory_restart: '3G', // Tự động khởi động lại nếu sử dụng quá 1GB RAM
      env: {
        NODE_ENV: 'production', // Biến môi trường chạy ở chế độ production
        PORT: 6722 // Port để ứng dụng Next.js lắng nghe
      },
      exp_backoff_restart_delay: 100 // Độ trễ (ms) khi khởi động lại nếu có lỗi
    }
  ]
}; 