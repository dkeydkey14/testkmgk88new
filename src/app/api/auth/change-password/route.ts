// BACKEND API - Đổi mật khẩu admin
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const credentialsFilePath = path.join(process.cwd(), 'data', 'admin-credentials.json');

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();
    
    // Đọc credentials hiện tại
    const fileContent = fs.readFileSync(credentialsFilePath, 'utf-8');
    const credentials = JSON.parse(fileContent);
    
    // Kiểm tra mật khẩu hiện tại
    if (currentPassword !== credentials.password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Mật khẩu hiện tại không đúng' 
      }, { status: 401 });
    }
    
    // Cập nhật mật khẩu mới
    credentials.password = newPassword;
    fs.writeFileSync(credentialsFilePath, JSON.stringify(credentials, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Đổi mật khẩu thành công' 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi server',
      details: error.message 
    }, { status: 500 });
  }
}

