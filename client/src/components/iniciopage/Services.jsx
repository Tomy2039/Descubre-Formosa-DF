import React from "react";
import { FaMap } from "react-icons/fa"; 
import { GiCalendar } from "react-icons/gi"; 
import { MdLibraryBooks } from "react-icons/md"; 
import { HiPhotograph } from "react-icons/hi"; 
import { FaMusic } from "react-icons/fa"; 

const skillsData = [
  {
    name: "Mapa Interactivo",
    icon: (
      <FaMap className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Explora la historia de Formosa a través de un mapa interactivo que destaca lugares de interés, con información detallada sobre su origen y relevancia cultural.",
    aosDelay: "0",
  },
  {
    name: "Calendario de Eventos",
    icon: (
      <GiCalendar className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Consulta nuestro calendario para conocer los próximos eventos históricos, actividades culturales y días de apertura en los lugares de interés de la ciudad.",
    aosDelay: "500",
  },
  {
    name: "Biblioteca Virtual",
    icon: (
      <MdLibraryBooks className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "Accede a una amplia variedad de recursos históricos, documentos, imágenes y audios que te permitirán profundizar en la historia y el patrimonio de Formosa.",
    aosDelay: "1000",
  },
  {
    name: "Galería",
    icon: (
      <HiPhotograph className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Disfruta de una galería visual con imágenes que capturan la esencia de la historia, cultura y paisajes de Formosa.",
    aosDelay: "1500",
  },
  {
    name: "Música Local",
    icon: (
      <FaMusic className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Escucha y apoya a los artistas locales con nuestra plataforma de música, donde podrás descubrir canciones y artistas de Formosa.",
    aosDelay: "2000",
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-yellow-100 py-14">
      <div className="container mx-auto">
        <div className="pb-12 text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl font-serif text-yellow-600">
            Funcionalidades
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              data-aos="fade-up"
              data-aos-delay={skill.aosDelay}
              className="card bg-yellow-50 shadow-lg p-6 text-center rounded-lg hover:bg-yellow-300 hover:text-black duration-300"
            >
              <div className="grid place-items-center mb-4">{skill.icon}</div>
              <h2 className="text-2xl font-bold text-yellow-600">{skill.name}</h2>
              <p className="text-gray-700 my-2">{skill.description}</p>
              <a
                href={skill.link}
                className="text-primary font-semibold hover:text-black duration-300"
              >
                Ver más
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
