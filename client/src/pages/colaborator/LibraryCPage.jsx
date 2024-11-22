import React, { useState, useEffect } from "react";
import BookForm from "../../components/libreria/BookForm";

const CollaboratorBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Obtener libros del backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    };

    fetchBooks();
  }, []);

  // Agregar un libro
  const addBook = async (newBookData) => {
    try {
      const formData = new FormData();
      formData.append("title", newBookData.title);
      formData.append("author", newBookData.author);
      formData.append("category", newBookData.category);
      formData.append("description", newBookData.description);

      if (newBookData.image) formData.append("image", newBookData.image);
      if (newBookData.pdf) formData.append("pdf", newBookData.pdf);

      const response = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });
      const addedBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("Error al agregar libro:", error);
    }
  };

  // Editar un libro
  const editBook = async (updatedBook) => {
    try {
      const response = await fetch(`/api/books/${updatedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
      const data = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? data : book))
      );
    } catch (error) {
      console.error("Error al editar libro:", error);
    }
  };

  // Eliminar un libro
  const deleteBook = async (bookId) => {
    try {
      await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  return (
    <div className="p-6 bg-yellow-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 mb-8 shadow-lg">
          Mis Libros
        </h1>
        <p className="text-center text-lg text-gray-800 mb-8 italic">
          Comparte tus libros favoritos o contribuye a la biblioteca de la comunidad.
        </p>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setIsFormOpen(true);
              setIsEditing(false);
              setSelectedBook(null);
            }}
            className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-md shadow-xl hover:bg-yellow-500 transform transition duration-200 ease-in-out"
          >
            Agregar Libro
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-yellow-300 p-4 rounded-lg shadow-md border-2 border-yellow-500 cursor-pointer transition-transform hover:scale-105"
            >
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
              )}
              <h3 className="text-xl font-bold text-gray-700 text-center">{book.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">{book.author}</p>
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsEditing(true);
                    setIsFormOpen(true);
                  }}
                  className="text-lg text-yellow-700 hover:text-yellow-600 font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="text-lg text-red-600 hover:text-red-500 font-semibold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <BookForm
            book={isEditing ? selectedBook : null}
            onSave={(bookData) => {
              isEditing ? editBook(bookData) : addBook(bookData);
              setIsFormOpen(false);
            }}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CollaboratorBook;
