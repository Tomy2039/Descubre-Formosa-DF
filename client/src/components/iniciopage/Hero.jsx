import React, { useEffect } from "react";
import navigationIllustration from "../../assets/inicio/navegacion.png";
import AOS from "aos";

const Hero = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="bg-yellow-100 text-gray-700 transition duration-300">
      <div className="container mx-auto min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6 p-6">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={navigationIllustration}
              alt="Navigation Concept"
              className="sm:scale-125 max-h-[600px] drop-shadow-lg"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-16">
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-6xl font-semibold"
            >
              DESCUBRE FORMOSA
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000" className="text-lg">
            Descubre Formosa: Cultura, Historia y Arte en Cada Rincón.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
