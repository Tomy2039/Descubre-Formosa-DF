import React, { useState } from 'react';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CollaboratorMusic from './MusicCPage';
import MapComponent from './mapComponent';
import CollaboratorGalery from './collaboratorGalery';
import CollaboratorEvent from './collaboratorEvent';
import CollaboratorSong from './collaboratorSong';
import CollaboratorLibrary from './collaboratorLibrary';
import logo from "../../assets/loginregister/dflogo.png";
import TermsSection from '../../components/termsandguide/termsandcond';

// Opciones con los contenidos correspondientes, incluyendo emojis
const options = [
  { id: 'interactive-map', description: '🗺️ Explora Formosa a través de un mapa interactivo.', role: '🗺️ Mapa Interactivo' },
  { id: 'art-media', description: '🎨 Compartir y ver Multimedias de otros usuarios.', role: '🎨 Arte y Medios' },
  { id: 'musica-local', description: '🎶 Disfruta de música y sonidos autóctonos de Formosa.', role: '🎶 Música Local' },
  { id: 'biblioteca', description: '📚 Accede a la biblioteca de contenidos sobre Formosa.', role: '📚 Biblioteca' },
  { id: 'eventos-culturales', description: '🎭 Conoce los eventos culturales y actividades en Formosa.', role: '🎭 Eventos Culturales' },
  { id: 'terms-conditions', description: '📜 Lee las reglas y términos de uso de la plataforma.', role: '📜 Reglas y Términos' },
];

function ButtonGroupPrueba({ onSelect }) {
  return (
    <div className="flex space-x-3 overflow-x-auto">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className="px-5 py-2 bg-yellow-200 text-yellow-800 rounded-full font-semibold hover:bg-yellow-300 hover:text-yellow-900 transition duration-200 ease-in-out shadow-md"
        >
          {option.role}
        </button>
      ))}
    </div>
  );
}

function Content() {
  const [selectedPage, setSelectedPage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar la visibilidad del menú desplegable
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedPage) {
      case 'musica-local':
        return <CollaboratorSong/>;
      
      case 'biblioteca':
        return <CollaboratorLibrary/>;

      case 'interactive-map':
        return <MapComponent />;
      case 'art-media':
        return <CollaboratorGalery />;
      
      case 'eventos-culturales':
        return <CollaboratorEvent/>

      case 'terms-conditions':
        return <TermsSection/>
      default:
        const selectedOption = options.find((option) => option.id === selectedPage);
        return selectedOption ? <p>{selectedOption.description}</p> : <p>Selecciona una opción del menú para comenzar.</p>;
    }
  };

  // Función de logout con confirmación
  const handleLogout = () => {
    const confirmation = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmation) {
      // Elimina la información de sesión (ejemplo con localStorage)
      localStorage.removeItem('userToken');
      // Redirige al inicio
      navigate('/'); // Cambia la ruta si es necesario
    }
  };

  const handleChangeRole = () => {
    alert("Redirigiendo a la página de cambio de rol...");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-yellow-200 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo Descubre Formosa" className="h-12" />
          <span className="text-yellow-800 font-semibold text-2xl">Descubre Formosa</span>
        </div>

        <div className="relative">
          <AiOutlineUser
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-yellow-800 text-2xl cursor-pointer hover:text-yellow-900 transition duration-200 ease-in-out"
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-yellow-200 shadow-lg rounded-lg p-2">
              <button
                onClick={handleChangeRole}
                className="block w-full text-left px-4 py-2 text-yellow-800 hover:bg-yellow-300 hover:text-yellow-900 transition duration-200 ease-in-out"
              >
                Cambiar Rol
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-yellow-800 hover:bg-yellow-300 hover:text-yellow-900 transition duration-200 ease-in-out"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 bg-yellow-100 text-yellow-900">
        <div className="flex flex-col space-y-4">
          <ButtonGroupPrueba onSelect={setSelectedPage} />
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-200px)]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default Content;
