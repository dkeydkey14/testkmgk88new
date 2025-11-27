// BACKEND API - Admin Login
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const credentialsFilePath = path.join(process.cwd(), 'data', 'admin-credentials.json');

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Đọc credentials
    const fileContent = fs.readFileSync(credentialsFilePath, 'utf-8');
    const credentials = JSON.parse(fileContent);
    
    // Kiểm tra
    if (username === credentials.username && password === credentials.password) {
      return NextResponse.json({ 
        success: true, 
        message: 'Đăng nhập thành công',
        token: 'admin-logged-in' // Simple token
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Sai tên đăng nhập hoặc mật khẩu' 
      }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi server',
      details: error.message 
    }, { status: 500 });
  }
}

