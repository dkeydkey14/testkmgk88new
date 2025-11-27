// ========================================
// 🚀 GK88 BACKEND API SERVER
// ========================================
require('dotenv').config(); // Load .env file

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3781;

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors({
  origin: '*', // Cho phép tất cả origins
  credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========================================
// SERVE STATIC FILES (IMAGES)
// ========================================
// Serve ảnh từ thư mục backend/images/
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
console.log('📂 Serving images from:', imagesPath);

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ========================================
// FILE UPLOAD SETUP
// ========================================
const UPLOAD_DIR = path.join(__dirname, 'images', 'uploads');

// Tạo folder uploads nếu chưa tồn tại
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'promo-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// ========================================
// HELPER FUNCTIONS
// ========================================
const DATA_DIR = path.join(__dirname, '..', 'data');

function readJSONFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    throw error;
  }
}

function writeJSONFile(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filename}:`, error.message);
    throw error;
  }
}

// ========================================
// API ROUTES - FORM PROMOTIONS
// ========================================
app.get('/api/form-promotions', (req, res) => {
  try {
    console.log('🔵 GET /api/form-promotions');
    const activeOnly = req.query.active === 'true';
    const data = readJSONFile('form-promotions.json');
    console.log('📊 Data type:', typeof data, 'Is array:', Array.isArray(data));
    console.log('📊 Data.promotions type:', typeof data.promotions, 'Is array:', Array.isArray(data.promotions));
    
    let promotions = Array.isArray(data) ? data : (data.promotions || []);
    console.log('📊 Final promotions type:', typeof promotions, 'Is array:', Array.isArray(promotions), 'Length:', promotions.length);
    
    if (activeOnly && Array.isArray(promotions)) {
      promotions = promotions.filter(p => p.active);
    }
    
    if (Array.isArray(promotions)) {
      promotions.sort((a, b) => a.order - b.order);
    }
    
    console.log(`✅ Returning ${promotions.length} form promotions`);
    res.json({ success: true, promotions });
  } catch (error) {
    console.error('❌ GET /api/form-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi đọc dữ liệu' });
  }
});

app.post('/api/form-promotions', (req, res) => {
  try {
    console.log('🟢 POST /api/form-promotions');
    const data = readJSONFile('form-promotions.json');
    const promotions = data.promotions || data;
    const newPromotion = req.body;
    
    newPromotion.id = Date.now().toString();
    newPromotion.order = promotions.length;
    
    promotions.push(newPromotion);
    writeJSONFile('form-promotions.json', { promotions });
    
    console.log('✅ Created new form promotion:', newPromotion.id);
    res.json({ success: true, promotion: newPromotion });
  } catch (error) {
    console.error('❌ POST /api/form-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi tạo khuyến mãi' });
  }
});

app.put('/api/form-promotions', (req, res) => {
  try {
    console.log('🟡 PUT /api/form-promotions');
    const updatedPromotion = req.body;
    console.log('📝 Updating promotion:', updatedPromotion.id, updatedPromotion.code);
    
    // Đọc toàn bộ promotions hiện có
    const data = readJSONFile('form-promotions.json');
    let promotions = Array.isArray(data) ? data : (data.promotions || []);
    
    // Tìm và cập nhật promotion cụ thể
    const index = promotions.findIndex(p => p.id === updatedPromotion.id);
    if (index !== -1) {
      promotions[index] = { ...promotions[index], ...updatedPromotion };
      console.log(`✅ Updated promotion at index ${index}`);
    } else {
      console.log('⚠️ Promotion not found, adding as new');
      promotions.push(updatedPromotion);
    }
    
    writeJSONFile('form-promotions.json', { promotions });
    console.log('✅ Saved form promotions, total:', promotions.length);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ PUT /api/form-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi cập nhật' });
  }
});

app.delete('/api/form-promotions', (req, res) => {
  try {
    console.log('🔴 DELETE /api/form-promotions');
    const { id } = req.query;
    const data = readJSONFile('form-promotions.json');
    let promotions = data.promotions || data;
    promotions = promotions.filter(p => p.id !== id);
    writeJSONFile('form-promotions.json', { promotions });
    console.log('✅ Deleted form promotion:', id);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ DELETE /api/form-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi xóa' });
  }
});

// ========================================
// API ROUTES - DISPLAY PROMOTIONS
// ========================================
app.get('/api/display-promotions', (req, res) => {
  try {
    console.log('🔵 GET /api/display-promotions');
    const activeOnly = req.query.active === 'true';
    const data = readJSONFile('display-promotions.json');
    console.log('📊 Data type:', typeof data, 'Is array:', Array.isArray(data));
    console.log('📊 Data.promotions type:', typeof data.promotions, 'Is array:', Array.isArray(data.promotions));
    
    let promotions = Array.isArray(data) ? data : (data.promotions || []);
    console.log('📊 Final promotions type:', typeof promotions, 'Is array:', Array.isArray(promotions), 'Length:', promotions.length);
    
    if (activeOnly && Array.isArray(promotions)) {
      promotions = promotions.filter(p => p.active);
    }
    
    if (Array.isArray(promotions)) {
      promotions.sort((a, b) => a.order - b.order);
    }
    
    console.log(`✅ Returning ${promotions.length} display promotions`);
    res.json({ success: true, promotions });
  } catch (error) {
    console.error('❌ GET /api/display-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi đọc dữ liệu' });
  }
});

app.post('/api/display-promotions', (req, res) => {
  try {
    console.log('🟢 POST /api/display-promotions');
    const data = readJSONFile('display-promotions.json');
    const promotions = data.promotions || data;
    const newPromotion = req.body;
    
    newPromotion.id = Date.now().toString();
    newPromotion.order = promotions.length;
    
    promotions.push(newPromotion);
    writeJSONFile('display-promotions.json', { promotions });
    
    console.log('✅ Created new display promotion:', newPromotion.id);
    res.json({ success: true, promotion: newPromotion });
  } catch (error) {
    console.error('❌ POST /api/display-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi tạo khuyến mãi' });
  }
});

app.put('/api/display-promotions', (req, res) => {
  try {
    console.log('🟡 PUT /api/display-promotions');
    const updatedPromotion = req.body;
    console.log('📝 Updating promotion:', updatedPromotion.id, updatedPromotion.code);
    
    // Đọc toàn bộ promotions hiện có
    const data = readJSONFile('display-promotions.json');
    let promotions = Array.isArray(data) ? data : (data.promotions || []);
    
    // Tìm và cập nhật promotion cụ thể
    const index = promotions.findIndex(p => p.id === updatedPromotion.id);
    if (index !== -1) {
      promotions[index] = { ...promotions[index], ...updatedPromotion };
      console.log(`✅ Updated promotion at index ${index}`);
    } else {
      console.log('⚠️ Promotion not found, adding as new');
      promotions.push(updatedPromotion);
    }
    
    writeJSONFile('display-promotions.json', { promotions });
    console.log('✅ Saved display promotions, total:', promotions.length);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ PUT /api/display-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi cập nhật' });
  }
});

app.delete('/api/display-promotions', (req, res) => {
  try {
    console.log('🔴 DELETE /api/display-promotions');
    const { id } = req.query;
    const data = readJSONFile('display-promotions.json');
    let promotions = data.promotions || data;
    promotions = promotions.filter(p => p.id !== id);
    writeJSONFile('display-promotions.json', { promotions });
    console.log('✅ Deleted display promotion:', id);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ DELETE /api/display-promotions error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi xóa' });
  }
});

// ========================================
// API ROUTES - LINKS
// ========================================
app.get('/api/links', (req, res) => {
  try {
    console.log('🔵 GET /api/links');
    const links = readJSONFile('links.json');
    console.log('✅ Returning links');
    res.json({ success: true, links });
  } catch (error) {
    console.error('❌ GET /api/links error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi đọc links' });
  }
});

app.put('/api/links', (req, res) => {
  try {
    console.log('🟡 PUT /api/links');
    const links = req.body;
    writeJSONFile('links.json', links);
    console.log('✅ Updated links');
    res.json({ success: true, message: 'Links đã được cập nhật thành công' });
  } catch (error) {
    console.error('❌ PUT /api/links error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi cập nhật links' });
  }
});

// ========================================
// API ROUTES - ADMIN AUTH
// ========================================
app.post('/api/auth/login', (req, res) => {
  try {
    console.log('🔑 POST /api/auth/login');
    const { username, password } = req.body;
    const credentials = readJSONFile('admin-credentials.json');
    
    if (username === credentials.username && password === credentials.password) {
      // Tạo token đơn giản (trong production nên dùng JWT)
      const token = `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log('✅ Login successful, token:', token);
      res.json({ 
        success: true, 
        message: 'Đăng nhập thành công',
        token: token 
      });
    } else {
      console.log('❌ Login failed: Invalid credentials');
      res.status(401).json({ success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  } catch (error) {
    console.error('❌ POST /api/auth/login error:', error);
    res.status(500).json({ success: false, error: 'Lỗi server khi đăng nhập' });
  }
});

app.post('/api/auth/change-password', (req, res) => {
  try {
    console.log('🔑 POST /api/auth/change-password');
    const { currentPassword, newPassword } = req.body;
    const credentials = readJSONFile('admin-credentials.json');
    
    if (currentPassword !== credentials.password) {
      console.log('❌ Change password failed: Invalid current password');
      return res.status(401).json({ success: false, error: 'Mật khẩu hiện tại không đúng' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }
    
    credentials.password = newPassword;
    writeJSONFile('admin-credentials.json', credentials);
    
    console.log('✅ Password changed successfully');
    res.json({ success: true, message: 'Mật khẩu đã được thay đổi thành công' });
  } catch (error) {
    console.error('❌ POST /api/auth/change-password error:', error);
    res.status(500).json({ success: false, error: 'Lỗi server khi thay đổi mật khẩu' });
  }
});

// ========================================
// FILE UPLOAD API
// ========================================
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    console.log('📤 POST /api/upload-image');
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Không có file được upload' });
    }
    
    // Trả về đường dẫn relative để frontend sử dụng
    const imagePath = `/images/uploads/${req.file.filename}`;
    console.log('✅ File uploaded:', imagePath);
    
    res.json({ 
      success: true, 
      imagePath: imagePath,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('❌ POST /api/upload-image error:', error);
    res.status(500).json({ success: false, error: 'Lỗi khi upload ảnh' });
  }
});

// ========================================
// HEALTH CHECK
// ========================================
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'GK88 Backend API Server is running' });
});

// ========================================
// 404 HANDLER
// ========================================
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 GK88 BACKEND API SERVER');
  console.log('========================================');
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`📂 Data directory: ${DATA_DIR}`);
  console.log(`🌐 CORS: OPEN (All Origins)`);
  console.log('========================================');
});

