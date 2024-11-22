import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importa tus páginas
import AboutUs from './pages/visitante/AboutusPage.jsx';
import RegisterPage from './pages/colaborator/registerPage.jsx';
import LoginPage from './pages/colaborator/loginPage.jsx';
import FormPage from './pages/colaborator/formPage.jsx'; // Asegúrate de que esté exportado por defecto
import ColaboratorPage from './pages/colaborator/colaboratorPage.jsx';
import PageInicio from './pages/visitante/iniciopage.jsx';
import MusicList from './pages/visitante/MusicPage.jsx';
import BookList from './pages/visitante/LibraryPage.jsx';
import GaleriaPublic from './pages/visitante/galeriapublic.jsx';  // Importa GaleriaPublic
import TermsSection from "./components/termsandguide/termsandcond.jsx";
import MapMarkers from './pages/visitante/markersMap.jsx';
import GaleryViews from './pages/visitante/galeryView.jsx';
import EventViews from './pages/visitante/CalendaryWithEvents.jsx'
import MusicViewer from './pages/visitante/musicViewer.jsx';
import LibraryViews from './pages/visitante/libraryViews.jsx';

import './styles/index.css';

const DFsa = () => {
  return (
    <Router>
      <Routes>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/colaborator" element={<ColaboratorPage />} />
        <Route path="/" element={<PageInicio />} />
        <Route path="/BookList" element={<BookList />} />
        <Route path="/MusicList" element={<MusicList />} />
        <Route path="/GaleriaPublic" element={<GaleriaPublic />} />  {/* Asegúrate de que esta ruta esté bien configurada */}
        <Route path="/TermsSection" element={<TermsSection />} />
        <Route path="/MapMarkers" element={<MapMarkers/>}/>
        <Route path="/GaleryViews" element={<GaleryViews/>}/>
        <Route path="/EventViews" element={<EventViews/>}/>
        <Route path="/MusicViewer" element={<MusicViewer/>}/>
        <Route path="/LibraryViews" element={<LibraryViews/>}/>
      </Routes>
    </Router>
  );
};

export default DFsa;
