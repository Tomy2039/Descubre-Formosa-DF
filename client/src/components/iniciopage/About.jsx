import React from "react";
import { Link } from "react-router-dom";
import softwareIlutration from "../../assets/inicio/proyecto.png";

const About = () => {
  return (
    <div className="bg-yellow-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-8">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={softwareIlutration}
              alt="Ilustración de Proyecto Universitario"
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-lg"
            />
          </div>
          <div className="space-y-5 sm:p-8">
            <h1 data-aos="fade-up" className="text-3xl text-yellow-600 sm:text-4xl font-bold font-serif">
              Sobre Nosotros
            </h1>
            <p data-aos="fade-up" className="leading-8 tracking-wide text-gray-700">
              Nuestra misión es conectar a ciudadanos y visitantes con la vibrante cultura de Formosa. Creemos que el patrimonio local, desde su historia hasta sus expresiones artísticas, es clave para nuestra identidad, y buscamos que todos tengan la oportunidad de descubrir, valorar y disfrutar de este legado único.
            </p>
            <Link to="/aboutus">
              <button data-aos="fade-up" className="btn btn-outline btn-primary">
                Saber más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;