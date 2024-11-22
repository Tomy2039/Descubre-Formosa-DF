import React from "react";
import { Link } from "react-router-dom"; // Importa Link de React Router
import TermsSection from "../termsandguide/termsandcond"
const Footer = () => {
  return (
    <footer className="footer footer-center bg-yellow-200 text-yellow-600 rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        {/* Enlace para la Guía de Usuario usando Link de React Router */}
        <Link
          to="/guia-de-usuario"
          className="link link-hover text-brown-600 hover:text-brown-800"
        >
          Guía de Usuario
        </Link>

        {/* Enlace para los Términos & Condiciones usando Link de React Router */}
        <Link
          to="/TermsSection"
          className="link link-hover text-brown-600 hover:text-brown-800"
        >
          Términos & Condiciones
        </Link>
      </nav>
      <aside>
        <p className="text-brown-600">
          Copyright © {new Date().getFullYear()} - All rights reserved by Descubre Formosa
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
