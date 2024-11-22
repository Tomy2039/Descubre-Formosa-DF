import React from 'react';

const PDFBookModal = ({ pdfPath, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-11/12 max-w-md" style={{ backgroundColor: '#efe97f', borderColor: '#DAA520', borderWidth: '2px' }}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">Cerrar</button>
        
        {/* Incluir PDF usando la ruta proporcionada por el backend */}
        {pdfPath && (
          <iframe
            src={`http://localhost:5000/${pdfPath}`} // Ruta del archivo PDF cargado por Multer
            width="100%"
            height="500px"
            title="PDF Viewer"
          />
        )}
      </div>
    </div>
  );
};

export default PDFBookModal;
