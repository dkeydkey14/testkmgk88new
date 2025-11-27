'use client';
// FRONTEND - Admin quản lý Khuyến Mãi FORM ĐĂNG KÝ

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaToggleOn, FaToggleOff, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import { getApiUrl } from '@/config/api';
import AdminAuthGuard from '@/components/AdminAuthGuard';

interface FormPromotion {
  id: number;
  code: string;
  title: string;
  apiEndpoint: string;
  active: boolean;
  order: number;
}

function FormPromotionsAdminContent() {
  const [promotions, setPromotions] = useState<FormPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<FormPromotion>>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const apiUrl = getApiUrl('/api/form-promotions');
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
      title: '',
      apiEndpoint: '',
      active: true,
      order: promotions.length + 1
    });
  };

  const startEdit = (promo: FormPromotion) => {
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
        const apiUrl = getApiUrl('/api/form-promotions');
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          showMessage('Tạo khuyến mãi form thành công!', 'success');
          loadPromotions();
          cancelEdit();
        }
      } else {
        const apiUrl = getApiUrl('/api/form-promotions');
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
      const apiUrl = getApiUrl(`/api/form-promotions?id=${id}`);
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

  const toggleActive = async (promo: FormPromotion) => {
    try {
      const apiUrl = getApiUrl('/api/form-promotions');
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

  const moveOrder = async (promo: FormPromotion, direction: 'up' | 'down') => {
    const currentIndex = promotions.findIndex(p => p.id === promo.id);
    if ((direction === 'up' && currentIndex === 0) || 
        (direction === 'down' && currentIndex === promotions.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const swapPromo = promotions[newIndex];

    try {
      const apiUrl = getApiUrl('/api/form-promotions');
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
            <h1 className="text-3xl font-bold text-blue-600">Khuyến Mãi FORM</h1>
            <p className="text-gray-600 mt-1">Dropdown chọn khuyến mãi trong form đăng ký</p>
          </div>
          <button
            onClick={startCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
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
              {isCreating ? 'Tạo Khuyến Mãi Form Mới' : 'Chỉnh Sửa Khuyến Mãi Form'}
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
                  placeholder="Mô tả ngắn gọn"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block font-semibold mb-1">API Endpoint *</label>
                <input
                  type="text"
                  value={formData.apiEndpoint || ''}
                  onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="https://api.83868668.com/..."
                />
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
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">Thứ Tự</th>
                  <th className="p-3 text-left">Mã</th>
                  <th className="p-3 text-left">Tiêu Đề</th>
                  <th className="p-3 text-left">API Endpoint</th>
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
                          className="text-blue-500 hover:text-blue-700 disabled:text-gray-300"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          onClick={() => moveOrder(promo, 'down')}
                          disabled={index === promotions.length - 1}
                          className="text-blue-500 hover:text-blue-700 disabled:text-gray-300"
                        >
                          <FaArrowDown />
                        </button>
                        <span className="ml-2">{promo.order}</span>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-blue-600">{promo.code}</td>
                    <td className="p-3">{promo.title}</td>
                    <td className="p-3 text-xs text-gray-600">{promo.apiEndpoint}</td>
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
        <p>Tổng số: {promotions.length} khuyến mãi form</p>
      </div>
    </div>
  );
}

export default function FormPromotionsAdmin() {
  return (
    <AdminAuthGuard>
      <FormPromotionsAdminContent />
    </AdminAuthGuard>
  );
}

