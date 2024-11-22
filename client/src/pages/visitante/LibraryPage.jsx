import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookModal from "../../components/libreria/BookModal";
import PDFBookModal from "../../components/libreria/PDFBookModal";

const BookList = () => {
  const [books, setBooks] = useState([]); // Estado para almacenar los libros
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Configuración del slider de categorías
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Cargar los libros desde el backend al montar el componente
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://tu-backend-api.com/libros');
        setBooks(response.data); // Suponiendo que la respuesta tenga un arreglo de libros
      } catch (error) {
        console.error("Error al cargar los libros:", error);
      }
    };

    fetchBooks();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Filtrar libros solo por el título
  const filteredBooks = books.filter(
    (book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-yellow-200 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 mb-8 shadow-lg">
        Biblioteca Virtual
      </h1>

      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          className="input input-bordered w-full max-w-md bg-white text-gray-700 rounded-md shadow-md text-center"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full max-w-4xl mb-6">
        <Slider {...settings}>
          {["Todos", "Ficción", "No Ficción", "Historia", "Ciencia"].map((category) => (
            <div
              key={category}
              className={`px-4 py-2 mx-2 font-bold rounded-md transition-all ${selectedCategory === category ? "bg-yellow-300 text-white scale-105" : "bg-yellow-300 text-gray-700 hover:bg-yellow-400"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        {filteredBooks
          .filter((book) =>
            selectedCategory === "Todos" ? true : book.category === selectedCategory
          )
          .map((book) => (
            <div
              key={book.id}
              className="bg-yellow-400 p-4 rounded-lg shadow-md border-2 border-yellow-600 cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
              <h3 className="text-sm font-bold text-gray-700 text-center">{book.title}</h3>
              <p className="text-xs text-gray-600 text-center">{book.author}</p>
            </div>
          ))}
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          onReadMore={() => setIsPDFOpen(true)}
        />
      )}

      {isPDFOpen && selectedBook && (
        <PDFBookModal
          pdfUrl={selectedBook.pdfUrl}
          isOpen={isPDFOpen}
          onClose={() => setIsPDFOpen(false)}
        />
      )}
    </div>
  );
};

export default BookList;
