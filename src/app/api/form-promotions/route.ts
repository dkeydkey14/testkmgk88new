// BACKEND API - Quản lý khuyến mãi cho FORM ĐĂNG KÝ
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'form-promotions.json');

// Đọc dữ liệu từ file
function readData() {
  try {
    console.log('📂 Đường dẫn file:', DATA_FILE);
    console.log('📍 process.cwd():', process.cwd());
    
    if (!fs.existsSync(DATA_FILE)) {
      console.error('❌ File không tồn tại:', DATA_FILE);
      return { promotions: [] };
    }
    
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    console.log('✅ Đọc file thành công, length:', data.length);
    const parsed = JSON.parse(data);
    console.log('✅ Parse JSON thành công, promotions:', parsed.promotions?.length);
    return parsed;
  } catch (error) {
    console.error('❌ Lỗi đọc file:', error);
    return { promotions: [] };
  }
}

// Ghi dữ liệu vào file
function writeData(data: any) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET - Lấy tất cả khuyến mãi form
export async function GET(request: NextRequest) {
  try {
    console.log('🔵 API Form Promotions được gọi');
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    console.log('📋 Active only:', activeOnly);
    
    const data = readData();
    let promotions = data.promotions || [];
    console.log('📊 Số lượng promotions:', promotions.length);
    
    // Lọc chỉ lấy khuyến mãi đang hoạt động nếu cần
    if (activeOnly) {
      promotions = promotions.filter((p: any) => p.active === true);
      console.log('📊 Sau khi lọc active:', promotions.length);
    }
    
    // Sắp xếp theo order
    promotions.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    
    console.log('✅ Trả về', promotions.length, 'promotions');
    return NextResponse.json({ 
      success: true, 
      promotions 
    });
  } catch (error) {
    console.error('❌ Lỗi trong GET handler:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi khi đọc dữ liệu',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST - Tạo khuyến mãi mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();
    
    // Tạo ID mới
    const newId = data.promotions.length > 0 
      ? Math.max(...data.promotions.map((p: any) => p.id)) + 1 
      : 1;
    
    const newPromotion = {
      id: newId,
      code: body.code,
      title: body.title,
      apiEndpoint: body.apiEndpoint,
      active: body.active !== undefined ? body.active : true,
      order: body.order || newId
    };
    
    data.promotions.push(newPromotion);
    writeData(data);
    
    return NextResponse.json({ 
      success: true, 
      promotion: newPromotion 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi khi tạo khuyến mãi' 
    }, { status: 500 });
  }
}

// PUT - Cập nhật khuyến mãi
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readData();
    
    const index = data.promotions.findIndex((p: any) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Không tìm thấy khuyến mãi' 
      }, { status: 404 });
    }
    
    // Cập nhật
    data.promotions[index] = {
      ...data.promotions[index],
      ...body
    };
    
    writeData(data);
    
    return NextResponse.json({ 
      success: true, 
      promotion: data.promotions[index] 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi khi cập nhật khuyến mãi' 
    }, { status: 500 });
  }
}

// DELETE - Xóa khuyến mãi
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');
    
    const data = readData();
    const index = data.promotions.findIndex((p: any) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Không tìm thấy khuyến mãi' 
      }, { status: 404 });
    }
    
    data.promotions.splice(index, 1);
    writeData(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Xóa thành công' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Lỗi khi xóa khuyến mãi' 
    }, { status: 500 });
  }
}

