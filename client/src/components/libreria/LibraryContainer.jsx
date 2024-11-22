import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import CollaboratorSection from "./CollaboratorSection";
import axios from "axios";

const LibraryContainer = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Obtener los libros del backend
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error al obtener los libros", error));
  }, []);

  // Función para agregar un libro al estado global
  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <div>
      {/* Sección de visitante */}
      <BookList books={books} />

      {/* Sección de colaborador */}
      <CollaboratorSection addBook={addBook} />
    </div>
  );
};

export default LibraryContainer;
