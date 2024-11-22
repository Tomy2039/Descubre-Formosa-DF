import React from 'react';
import { HeaderAboutus as Header } from '../../components/aboutuspage/HeaderAboutus';
import { BannerAboutus as Banner } from '../../components/aboutuspage/BannerAboutus';
import { CardsAboutus as Cards } from '../../components/aboutuspage/CardsAboutus';

const AboutUs = () => {
    return (
        <div>
            <Header />
            <Banner />
            <div className="container mx-auto overflow-x-auto py-6 bg-yellow-100"> 
  <div className="flex space-x-6">
    <div className="snap-start">
      <Cards title="Equipo de Trabajo" description="El proyecto está desarrollado por: Alonso Arianne, Cespedes Ayelén, y Ramos Tomas." />
    </div>
    <div className="snap-start">
      <Cards title="Misión y Visión" description="Nuestro objetivo es preservar la historia y cultura de Formosa, y promover el acceso a eventos locales, talleres de música y arte, además de una biblioteca con recursos literarios y musicales de la región." />
    </div>
    <div className="snap-start">
      <Cards title="Historia del Proyecto" description="Descubre Formosa nació para centralizar la historia y cultura de la ciudad, ofreciendo un recurso digital innovador que ahora también abarca eventos culturales y actividades locales." />
    </div>
    <div className="snap-start">
      <Cards title="Características Principales" description="El sitio web incluye un mapa interactivo de lugares históricos, una galería de eventos y talleres, así como una biblioteca con libros y música de artistas formoseños, todo diseñado para enriquecer el conocimiento y la exploración cultural." />
    </div>
    <div className="snap-start">
      <Cards title="Valores y Compromiso con la Comunidad" description="Nos guiamos por el respeto hacia la cultura local y el acceso abierto a la información. Nos comprometemos a ser un recurso clave para el aprendizaje histórico, artístico y cultural de Formosa." />
    </div>
    <div className="snap-start">
      <Cards title="Colaboraciones y Socios" description="Colaboramos con historiadores, artistas locales, instituciones educativas y el gobierno para garantizar una presentación precisa y rica de la cultura formoseña." />
    </div>
    <div className="snap-start">
      <Cards title="Contacto" description="Para preguntas, sugerencias o reportar problemas, no dudes en contactarnos a través de nuestro formulario de contacto o enviarnos un correo a descubreformosa@gmail.com" />
    </div>
  </div>
</div>
        </div>
    );
};

export default AboutUs;
