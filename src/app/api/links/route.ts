// BACKEND API - Quản lý Links
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const linksFilePath = path.join(process.cwd(), 'data', 'links.json');

// Đọc links
function readLinks() {
  try {
    const fileContent = fs.readFileSync(linksFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Lỗi đọc links:', error);
    return {
      header: { loginUrl: '', registerUrl: '' },
      topSection: { homeUrl: '', cskhUrl: '' },
      footer: { mainSiteUrl: '', telegramUrl: '', facebookUrl: '', spotifyUrl: '', linkedinUrl: '' }
    };
  }
}

// Ghi links
function writeLinks(links: any) {
  try {
    fs.writeFileSync(linksFilePath, JSON.stringify(links, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('❌ Lỗi ghi links:', error);
    return false;
  }
}

// GET - Lấy tất cả links
export async function GET() {
  try {
    const links = readLinks();
    return NextResponse.json({ success: true, links });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi khi đọc links',
      details: error.message 
    }, { status: 500 });
  }
}

// PUT - Cập nhật links
export async function PUT(request: NextRequest) {
  try {
    const newLinks = await request.json();
    
    const success = writeLinks(newLinks);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Cập nhật links thành công',
        links: newLinks
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Không thể ghi file' 
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi khi cập nhật links',
      details: error.message 
    }, { status: 500 });
  }
}

