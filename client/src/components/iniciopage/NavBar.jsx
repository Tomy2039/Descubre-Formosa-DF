import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BookList  from '../../pages/visitante/LibraryPage';
import MusicList from'../../pages/visitante/MusicPage'
import GaleriaPublic from '../../pages/visitante/galeriapublic';
import MapMarkers from '../../pages/visitante/markersMap';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-yellow-200 p-4 shadow-md">
      <div className="text-center flex-grow">
        <span className="text-xl font-bold text-yellow-800">Descubre Formosa</span>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-yellow-800 hover:bg-yellow-100 px-4 py-2 rounded-md">
          Inicio
        </Link>
        <Link to="/LibraryViews" className="text-yellow-800 hover:bg-yellow-100 px-4 py-2 rounded-md">
          Biblioteca
        </Link>
        <Link to="/MusicViewer" className="text-yellow-800 hover:bg-yellow-100 px-4 py-2 rounded-md">
          Música
        </Link>
        <Link to="/GaleryViews" className="text-yellow-800 hover:bg-yellow-100 px-4 py-2 rounded-md">
          Galería
        </Link>
        <Link to="/EventViews" className="text-yellow-800 hover:bg-yellow-100 px-4 py-2 rounded-md">
          Eventos
        </Link>
        <Link to="/MapMarkers" className="text-yellow-800 hover:bg-yellow-100 px-4 py-2 rounded-md">
          Mapa Histórico Interactivo
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/register"
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Unirse
        </Link>
      </div>
    </div>
  );
};

export default Navbar;