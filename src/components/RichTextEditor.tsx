'use client';
// FRONTEND - Rich Text Editor WYSIWYG - Chỉnh sửa trực tiếp như Word

import { useState, useRef, useEffect } from 'react';
import { FaCode, FaEye, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink, FaImage, FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableCols, setTableCols] = useState(3);
  const [tableRows, setTableRows] = useState(3);

  // Sync value to editor
  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value, isHtmlMode]);

  // Toggle giữa WYSIWYG và HTML
  const toggleMode = () => {
    if (isHtmlMode) {
      // Từ HTML → WYSIWYG
      onChange(htmlValue);
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlValue;
      }
    } else {
      // Từ WYSIWYG → HTML
      const content = editorRef.current?.innerHTML || '';
      setHtmlValue(content);
    }
    setIsHtmlMode(!isHtmlMode);
  };

  // Khi sửa HTML trực tiếp
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setHtmlValue(newValue);
    onChange(newValue);
  };

  // Khi sửa trong WYSIWYG mode
  const handleEditorInput = () => {
    const content = editorRef.current?.innerHTML || '';
    onChange(content);
  };

  // Format commands - Giống Word
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleEditorInput();
  };

  // Insert HTML at cursor
  const insertHtml = (html: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const fragment = range.createContextualFragment(html);
      range.insertNode(fragment);
      handleEditorInput();
    }
  };

  // Create table with custom size
  const createCustomTable = () => {
    const numCols = tableCols;
    const numRows = tableRows;
    
    // Tạo header
    let headerHtml = '<tr style="background-color: orange;">';
    for (let i = 0; i < numCols; i++) {
      headerHtml += `<th style="border: 1px solid black; padding: 8px;">Cột ${i + 1}</th>`;
    }
    headerHtml += '</tr>';
    
    // Tạo body rows
    let bodyHtml = '';
    for (let i = 0; i < numRows; i++) {
      bodyHtml += '<tr>';
      for (let j = 0; j < numCols; j++) {
        bodyHtml += `<td style="border: 1px solid black; padding: 8px;">Dữ liệu ${i + 1}.${j + 1}</td>`;
      }
      bodyHtml += '</tr>';
    }
    
    insertHtml(`
<table border="1" style="width: 80%; border-collapse: collapse; margin: 20px auto;">
  <thead>
    ${headerHtml}
  </thead>
  <tbody>
    ${bodyHtml}
  </tbody>
</table>
<p><br /></p>
    `);
    
    setShowTableModal(false);
  };

  // Insert custom elements
  const insertElement = (type: string) => {
    switch(type) {
      case 'table':
        // Hiển thị modal thay vì prompt
        setShowTableModal(true);
        break;
      
      case 'orange-text':
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          execCommand('foreColor', 'orange');
        }
        break;

      case 'orange-bold':
        insertHtml('<span style="color: orange; font-weight: bold;">TEXT</span>');
        break;

      case 'br':
        insertHtml('<br />');
        break;

      case 'symbol':
        insertHtml('※ ');
        break;

      case 'table-merge-example':
        // Bảng mẫu với các ô gộp
        insertHtml(`
<table border="1" style="width: 80%; border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr style="background-color: orange;">
      <th style="border: 1px solid black; padding: 8px;" colspan="3">BẢNG KHUYẾN MÃI (Gộp 3 cột)</th>
    </tr>
    <tr style="background-color: #ffa500;">
      <th style="border: 1px solid black; padding: 8px;">Nạp</th>
      <th style="border: 1px solid black; padding: 8px;">Thưởng</th>
      <th style="border: 1px solid black; padding: 8px;">Tổng nhận</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">1,000K</td>
      <td style="border: 1px solid black; padding: 8px;">288K</td>
      <td style="border: 1px solid black; padding: 8px;" rowspan="2">Liên hệ CSKH (Gộp 2 dòng)</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;">5,000K</td>
      <td style="border: 1px solid black; padding: 8px;">888K</td>
    </tr>
    <tr>
      <td style="border: 1px solid black; padding: 8px;" colspan="2">Nạp từ 10,000K trở lên (Gộp 2 cột)</td>
      <td style="border: 1px solid black; padding: 8px;">1,888K</td>
    </tr>
  </tbody>
</table>
<p><br /></p>
        `);
        break;

      case 'link':
        const url = prompt('Nhập URL:', 'https://');
        if (url) {
          execCommand('createLink', url);
        }
        break;

      case 'image':
        const imgUrl = prompt('Nhập đường dẫn hình:', '/images/');
        if (imgUrl) {
          insertHtml(`<img src="${imgUrl}" alt="Image" style="max-width: 100%; height: auto;" />`);
        }
        break;
    }
  };

  return (
    <>
      {/* Modal chọn kích thước bảng */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4 text-gray-800">📊 Tạo Bảng Mới</h3>
            
            <div className="space-y-4">
              {/* Số cột */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Số cột: <span className="text-orange-500 text-xl">{tableCols}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2</span>
                  <span>10</span>
                </div>
              </div>

              {/* Số hàng */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Số hàng: <span className="text-blue-500 text-xl">{tableRows}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Preview:</strong> Bảng {tableCols} cột × {tableRows} hàng
                </p>
                <div className="text-xs text-gray-500">
                  = {tableCols * tableRows + tableCols} ô (Header + Body)
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={createCustomTable}
                className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
              >
                ✅ Tạo Bảng
              </button>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="flex-1 bg-gray-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
                ❌ Hủy
              </button>
            </div>
          </div>
        </div>
      )}

    <div className="border-2 rounded-xl overflow-hidden bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-orange-500 px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-white flex items-center gap-2 text-lg">
          {isHtmlMode ? (
            <>
              <FaCode className="text-yellow-300" />
              <span>Chế độ HTML Code</span>
            </>
          ) : (
            <>
              <FaEye className="text-yellow-300" />
              <span>Chế độ Trực Quan - Sửa như Word</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={toggleMode}
          className={`px-5 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-lg hover:scale-105 ${
            isHtmlMode 
              ? 'bg-white text-blue-600 hover:bg-gray-100' 
              : 'bg-white text-green-600 hover:bg-gray-100'
          }`}
        >
          {isHtmlMode ? (
            <>
              <FaEye /> Chế độ Trực Quan
            </>
          ) : (
            <>
              <FaCode /> Xem HTML Code
            </>
          )}
        </button>
      </div>

      {/* Toolbar - Chỉ hiển thị ở WYSIWYG mode */}
      {!isHtmlMode && (
        <div className="bg-gray-50 px-3 py-3 border-b-2 border-gray-200">
          <div className="flex flex-wrap gap-2">
            {/* Text Style */}
            <div className="flex gap-1 border-r-2 pr-3">
              <button
                type="button"
                onClick={() => execCommand('formatBlock', '<h2>')}
                className="px-3 py-2 bg-white border-2 rounded-lg hover:bg-orange-100 hover:border-orange-500 text-sm font-bold transition-all"
                title="Tiêu đề H2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => execCommand('formatBlock', '<h3>')}
                className="px-3 py-2 bg-white border-2 rounded-lg hover:bg-orange-100 hover:border-orange-500 text-sm font-bold transition-all"
                title="Tiêu đề H3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => execCommand('formatBlock', '<p>')}
                className="px-3 py-2 bg-white border-2 rounded-lg hover:bg-orange-100 hover:border-orange-500 text-sm font-bold transition-all"
                title="Đoạn văn"
              >
                P
              </button>
            </div>
            
            {/* Format */}
            <div className="flex gap-1 border-r-2 pr-3">
              <button
                type="button"
                onClick={() => execCommand('bold')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-blue-100 hover:border-blue-500 transition-all"
                title="In đậm (Ctrl+B)"
              >
                <FaBold className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => execCommand('italic')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-blue-100 hover:border-blue-500 transition-all"
                title="In nghiêng (Ctrl+I)"
              >
                <FaItalic className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => execCommand('underline')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-blue-100 hover:border-blue-500 transition-all"
                title="Gạch chân (Ctrl+U)"
              >
                <FaUnderline className="text-gray-700" />
              </button>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 border-r-2 pr-3">
              <button
                type="button"
                onClick={() => execCommand('justifyLeft')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-green-100 hover:border-green-500 transition-all"
                title="Căn trái"
              >
                <FaAlignLeft className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => execCommand('justifyCenter')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-green-100 hover:border-green-500 transition-all"
                title="Căn giữa"
              >
                <FaAlignCenter className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => execCommand('justifyRight')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-green-100 hover:border-green-500 transition-all"
                title="Căn phải"
              >
                <FaAlignRight className="text-gray-700" />
              </button>
            </div>

            {/* Lists */}
            <div className="flex gap-1 border-r-2 pr-3">
              <button
                type="button"
                onClick={() => execCommand('insertUnorderedList')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-purple-100 hover:border-purple-500 transition-all"
                title="Danh sách chấm"
              >
                <FaListUl className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => execCommand('insertOrderedList')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-purple-100 hover:border-purple-500 transition-all"
                title="Danh sách số"
              >
                <FaListOl className="text-gray-700" />
              </button>
            </div>

            {/* Insert */}
            <div className="flex gap-1 border-r-2 pr-3">
              <button
                type="button"
                onClick={() => insertElement('link')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-indigo-100 hover:border-indigo-500 transition-all"
                title="Thêm link"
              >
                <FaLink className="text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => insertElement('image')}
                className="p-2 bg-white border-2 rounded-lg hover:bg-indigo-100 hover:border-indigo-500 transition-all"
                title="Thêm hình"
              >
                <FaImage className="text-gray-700" />
              </button>
            </div>

            {/* Special */}
            <div className="flex gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => insertElement('orange-text')}
                className="px-3 py-2 bg-orange-500 text-white font-bold border-2 border-orange-600 rounded-lg hover:bg-orange-600 transition-all shadow-md"
                title="Chữ màu cam"
              >
                🧡 Cam
              </button>
              <button
                type="button"
                onClick={() => insertElement('table')}
                className="px-3 py-2 bg-green-500 text-white font-bold border-2 border-green-600 rounded-lg hover:bg-green-600 transition-all shadow-md"
                title="Thêm bảng tùy chỉnh"
              >
                📊 Bảng
              </button>
              <button
                type="button"
                onClick={() => insertElement('table-merge-example')}
                className="px-3 py-2 bg-teal-500 text-white font-bold border-2 border-teal-600 rounded-lg hover:bg-teal-600 transition-all shadow-md text-xs"
                title="Bảng mẫu có gộp ô"
              >
                📊 Bảng Gộp
              </button>
              <button
                type="button"
                onClick={() => insertElement('symbol')}
                className="px-3 py-2 bg-purple-500 text-white font-bold border-2 border-purple-600 rounded-lg hover:bg-purple-600 transition-all shadow-md"
                title="Thêm ký tự ※"
              >
                ※
              </button>
            </div>
          </div>

          {/* Helper text */}
          <div className="mt-2 text-xs text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            <strong>💡 Tip:</strong> Bôi đen text → Click nút format | Phím tắt: <kbd>Ctrl+B</kbd> (Đậm), <kbd>Ctrl+I</kbd> (Nghiêng), <kbd>Ctrl+U</kbd> (Gạch chân)
            <br />
            <strong>📊 Bảng:</strong> [Bảng] = Tùy chỉnh số cột/dòng | [Bảng Gộp] = Mẫu có sẵn gộp ô
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="bg-white">
        {isHtmlMode ? (
          // HTML Mode
          <div className="relative">
            <textarea
              id="html-editor"
              value={htmlValue}
              onChange={handleHtmlChange}
              className="w-full p-4 font-mono text-sm border-0 focus:outline-none focus:ring-4 focus:ring-orange-300"
              rows={25}
              placeholder="Nhập HTML code..."
              style={{ 
                minHeight: '600px',
                tabSize: 2,
                backgroundColor: '#f9fafb'
              }}
            />
            <div className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-3 py-1 rounded-full font-mono">
              {htmlValue.length} ký tự
            </div>
          </div>
        ) : (
          // WYSIWYG Mode - ContentEditable
          <div 
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            className="p-6 focus:outline-none focus:ring-4 focus:ring-blue-300 prose max-w-none"
            style={{ 
              minHeight: '600px',
              cursor: 'text'
            }}
            data-placeholder={placeholder || "Click vào đây để bắt đầu nhập..."}
            suppressContentEditableWarning
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 text-sm text-gray-700 border-t-2">
        {isHtmlMode ? (
          <div>
            <strong>📝 Chế độ HTML:</strong> Chỉnh sửa code trực tiếp. Click <strong>"Chế độ Trực Quan"</strong> để xem kết quả.
          </div>
        ) : (
          <div>
            <strong>✏️ Chế độ WYSIWYG:</strong> Click vào và gõ như Word! Bôi đen text → Dùng toolbar phía trên để format.
          </div>
        )}
      </div>

      <style jsx global>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          cursor: text;
        }
        
        [contenteditable] {
          outline: none;
        }
        
        [contenteditable] table {
          border-collapse: collapse;
          margin: 20px auto;
        }
        
        [contenteditable] th,
        [contenteditable] td {
          border: 1px solid #000;
          padding: 8px;
        }
        
        [contenteditable] thead {
          background-color: orange;
          font-weight: bold;
        }
        
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        [contenteditable] p {
          margin: 0.5em 0;
        }
        
        [contenteditable] strong {
          font-weight: bold;
        }
        
        [contenteditable] em {
          font-style: italic;
        }
        
        [contenteditable] u {
          text-decoration: underline;
        }

        [contenteditable] a {
          color: blue;
          text-decoration: underline;
        }

        kbd {
          background-color: #eee;
          border: 1px solid #b4b4b4;
          border-radius: 3px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
          color: #333;
          display: inline-block;
          font-size: 0.85em;
          font-weight: 700;
          line-height: 1;
          padding: 2px 4px;
          white-space: nowrap;
        }
      `}</style>
    </div>
    </>
  );
}
