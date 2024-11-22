import React from 'react';

const BookModal = ({ book, isOpen, onClose, onReadMore }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(5px)' }}>
      <div className="relative p-6 rounded-lg shadow-lg w-11/12 max-w-md border-4" style={{ borderColor: '#DAA520', backgroundColor: '#efe97f' }}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">Cerrar</button>
        
        <div className="flex flex-col items-center">
          {/* Mostrar imagen si está disponible */}
          {book.image && (
            <img
              src={`http://localhost:5000/${book.image}`} // Ruta para acceder a la imagen cargada por Multer
              alt={book.title}
              className="w-32 h-48 object-cover mb-4 rounded-md border-2 border-yellow-500"
            />
          )}
          <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
          <p className="text-md font-medium text-gray-700 mb-4">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4">{book.description}</p>
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded-md shadow hover:bg-yellow-600"
            onClick={onReadMore}
          >
            Leer más
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
