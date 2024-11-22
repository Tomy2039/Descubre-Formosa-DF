import React, { useState } from "react";

const faqData = [
  {
    question: "¿Es necesario crear una cuenta para usar la plataforma?",
    answer: "No, puedes acceder a gran parte de la información sin necesidad de registrarte. Sin embargo, necesitarás una cuenta si deseas colaborar agregando información histórica o datos sobre próximos eventos.",
    aosDelay: "0",
  },
  {
    question: "¿Cómo funciona el mapa interactivo?",
    answer: "El mapa te permite explorar los lugares históricos de Formosa mediante ubicaciones marcadas, que al ser seleccionados muestran información detallada.",
    aosDelay: "300",
  },
  
  {
    question: "¿Cómo puedo sugerir un lugar histórico para que se incluya en la plataforma?",
    answer: "Puedes sugerir un nuevo lugar histórico utilizando el formulario de contacto en la plataforma. Nuestro equipo revisará tu propuesta antes de agregarla.",
    aosDelay: "900",
  },
  {
    question: "¿Cómo puedo encontrar eventos próximos en Formosa?",
    answer: "En la sección de eventos, podrás ver una lista de actividades programadas en Formosa, con detalles sobre fechas, horarios y ubicaciones.",
    aosDelay: "1200",
  },
  {
    question: "¿Puedo acceder a música local en la plataforma?",
    answer: "Sí, tenemos una sección de música local donde puedes escuchar canciones y conocer a los artistas de Formosa.",
    aosDelay: "1500",
  },
  {
    question: "¿Qué tipo de libros puedo encontrar en la biblioteca virtual?",
    answer: "La biblioteca virtual contiene libros sobre la historia, cultura y literatura de Formosa.",
    aosDelay: "1800",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <span id="faq"></span>
      <div className="bg-yellow-100 py-14 sm:pb-24">
        <div className="container mx-auto">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif text-yellow-600"
            >
              Preguntas Frecuentes
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44 text-gray-700">
              Aquí te respondemos algunas dudas que te podrían surgir.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b">
                <button
                  onClick={() => toggleFAQ(index)}
                  data-aos="fade-up"
                  data-aos-delay={faq.aosDelay}
                  className="w-full text-left py-3 px-4 text-white bg-yellow-500 hover:bg-yellow-300 duration-200"
                >
                  {faq.question}
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-yellow-300 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

