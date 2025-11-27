'use client';
// FRONTEND - Admin quản lý Khuyến Mãi HIỂN THỊ (Body)

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaToggleOn, FaToggleOff, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import { getApiUrl } from '@/config/api';
import RichTextEditor from '@/components/RichTextEditor';
import AdminAuthGuard from '@/components/AdminAuthGuard';

interface DisplayPromotion {
  id: number;
  code: string;
  image: string;
  title: string;
  active: boolean;
  order: number;
  content: string;
}

// Helper: Lấy full URL cho ảnh (gọi từ backend)
const getImageUrl = (imagePath: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (!baseUrl) return imagePath;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${baseUrl}${imagePath}`;
};

function DisplayPromotionsAdminContent() {
  const [promotions, setPromotions] = useState<DisplayPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<DisplayPromotion>>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const apiUrl = getApiUrl('/api/display-promotions');
      console.log('🔵 Admin fetching from:', apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('📦 Admin received:', data);
      
      if (data.success && Array.isArray(data.promotions)) {
        console.log('✅ Valid array, setting promotions');
        setPromotions(data.promotions);
      } else {
        console.error('❌ Invalid data format:', data);
        setPromotions([]);
        showMessage('Dữ liệu không hợp lệ', 'error');
      }
    } catch (error) {
      console.error('❌ Lỗi khi tải dữ liệu:', error);
      setPromotions([]);
      showMessage('Lỗi khi tải dữ liệu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const startCreate = () => {
    setIsCreating(true);
    setFormData({
      code: '',
      image: '',
      title: '',
      active: true,
      order: promotions.length + 1,
      content: ''
    });
  };

  const startEdit = (promo: DisplayPromotion) => {
    setEditingId(promo.id);
    setFormData(promo);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        const apiUrl = getApiUrl('/api/display-promotions');
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          showMessage('Tạo khuyến mãi hiển thị thành công!', 'success');
          loadPromotions();
          cancelEdit();
        }
      } else {
        const apiUrl = getApiUrl('/api/display-promotions');
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          showMessage('Cập nhật thành công!', 'success');
          loadPromotions();
          cancelEdit();
        }
      }
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
      showMessage('Lỗi khi lưu dữ liệu', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa khuyến mãi này?')) return;
    
    try {
      const apiUrl = getApiUrl(`/api/display-promotions?id=${id}`);
      const response = await fetch(apiUrl, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        showMessage('Xóa thành công!', 'success');
        loadPromotions();
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      showMessage('Lỗi khi xóa khuyến mãi', 'error');
    }
  };

  const toggleActive = async (promo: DisplayPromotion) => {
    try {
      const apiUrl = getApiUrl('/api/display-promotions');
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...promo, active: !promo.active })
      });
      const data = await response.json();
      if (data.success) {
        showMessage(`${promo.active ? 'Đã tắt' : 'Đã bật'} khuyến mãi`, 'success');
        loadPromotions();
      }
    } catch (error) {
      console.error('Lỗi khi toggle:', error);
    }
  };

  const moveOrder = async (promo: DisplayPromotion, direction: 'up' | 'down') => {
    const currentIndex = promotions.findIndex(p => p.id === promo.id);
    if ((direction === 'up' && currentIndex === 0) || 
        (direction === 'down' && currentIndex === promotions.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const swapPromo = promotions[newIndex];

    try {
      const apiUrl = getApiUrl('/api/display-promotions');
      await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...promo, order: swapPromo.order })
      });
      await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...swapPromo, order: promo.order })
      });
      loadPromotions();
    } catch (error) {
      console.error('Lỗi khi di chuyển:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Đang tải...</div>
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">Khuyến Mãi HIỂN THỊ</h1>
            <p className="text-gray-600 mt-1">Danh sách khuyến mãi có hình ảnh trong Body</p>
          </div>
          <button
            onClick={startCreate}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <FaPlus /> Thêm Mới
          </button>
        </div>
      </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.includes('Lỗi') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Form tạo mới/chỉnh sửa */}
        {(isCreating || editingId) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {isCreating ? 'Tạo Khuyến Mãi Hiển Thị Mới' : 'Chỉnh Sửa Khuyến Mãi Hiển Thị'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Mã Khuyến Mãi *</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="VD: GK01"
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Tiêu Đề *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Tiêu đề khuyến mãi"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block font-semibold mb-1">Đường Dẫn Hình Ảnh *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="/images/..."
                  />
                  <label className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer flex items-center gap-2 whitespace-nowrap">
                    📤 Upload Ảnh
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        const formDataUpload = new FormData();
                        formDataUpload.append('image', file);
                        
                        try {
                          const response = await fetch(getApiUrl('/api/upload-image'), {
                            method: 'POST',
                            body: formDataUpload
                          });
                          const data = await response.json();
                          if (data.success) {
                            setFormData({ ...formData, image: data.imagePath });
                            showMessage('Upload ảnh thành công!', 'success');
                          } else {
                            showMessage('Lỗi upload: ' + data.error, 'error');
                          }
                        } catch (error) {
                          console.error('Upload error:', error);
                          showMessage('Lỗi khi upload ảnh', 'error');
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={getImageUrl(formData.image)} alt="Preview" className="h-24 w-auto object-cover rounded border" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block font-semibold mb-1">Thứ tự</label>
                <input
                  type="number"
                  value={formData.order || 1}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active || false}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5"
                />
                <label className="font-semibold">Kích Hoạt</label>
              </div>
              
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2 text-lg">Nội Dung Khuyến Mãi</label>
                <RichTextEditor
                  value={formData.content || ''}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  placeholder="Nhập nội dung khuyến mãi... (Format như Word)"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <FaSave /> Lưu
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
              >
                <FaTimes /> Hủy
              </button>
            </div>
          </div>
        )}

        {/* Danh sách khuyến mãi */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="p-3 text-left">Thứ Tự</th>
                  <th className="p-3 text-left">Mã</th>
                  <th className="p-3 text-left">Tiêu Đề</th>
                  <th className="p-3 text-left">Hình Ảnh</th>
                  <th className="p-3 text-center">Trạng Thái</th>
                  <th className="p-3 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promo, index) => (
                  <tr key={promo.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveOrder(promo, 'up')}
                          disabled={index === 0}
                          className="text-orange-500 hover:text-orange-700 disabled:text-gray-300"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          onClick={() => moveOrder(promo, 'down')}
                          disabled={index === promotions.length - 1}
                          className="text-orange-500 hover:text-orange-700 disabled:text-gray-300"
                        >
                          <FaArrowDown />
                        </button>
                        <span className="ml-2">{promo.order}</span>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-orange-600">{promo.code}</td>
                    <td className="p-3">{promo.title}</td>
                    <td className="p-3">
                      <img src={getImageUrl(promo.image)} alt={promo.code} className="h-12 w-20 object-cover rounded" />
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleActive(promo)}
                        className="flex items-center justify-center gap-1 mx-auto"
                      >
                        {promo.active ? (
                          <FaToggleOn className="text-green-500 text-2xl" />
                        ) : (
                          <FaToggleOff className="text-gray-400 text-2xl" />
                        )}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => startEdit(promo)}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(promo.id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      <div className="mt-6 text-center text-gray-500">
        <p>Tổng số: {promotions.length} khuyến mãi hiển thị</p>
      </div>
    </div>
  );
}

export default function DisplayPromotionsAdmin() {
  return (
    <AdminAuthGuard>
      <DisplayPromotionsAdminContent />
    </AdminAuthGuard>
  );
}

