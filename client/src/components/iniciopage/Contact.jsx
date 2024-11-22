import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  // Inicialización de EmailJS con tu userID
  emailjs.init("HZfiuuRRreUGbd94f");  // Usa tu userID de EmailJS

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const btn = document.getElementById("button");
    btn.value = "Sending...";  // Cambia el texto del botón mientras se envía el correo

    // Configura tu serviceID y templateID de EmailJS
    const serviceID = "default_service";  // Usa tu service ID de EmailJS
    const templateID = "template_952sqbf";  // Usa tu template ID de EmailJS

    // Enviar el formulario con EmailJS
    emailjs
      .sendForm(serviceID, templateID, e.target)
      .then(() => {
        btn.value = "Enviar Mensaje";
        alert("¡Correo enviado exitosamente!");
      })
      .catch((err) => {
        btn.value = "Enviar Mensaje";
        alert("Hubo un error: " + JSON.stringify(err));
      });
  };

  return (
    <section id="contact" className="py-16 bg-yellow-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-yellow-50 p-8 rounded-lg shadow-xl border-4 border-yellow-400">
            <h2 className="text-4xl font-bold text-center text-yellow-600 mb-4">Contáctanos</h2>
            <p className="text-center text-gray-700 mb-6">
              Si tienes preguntas, comentarios o necesitas asistencia, no dudes
              en enviarnos un mensaje.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Tu Nombre"
                  value={formData.from_name}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 placeholder-yellow-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="reply_to"
                  placeholder="Tu Correo Electrónico"
                  value={formData.reply_to}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 placeholder-yellow-500"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tu Mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-yellow-50 border-2 border-yellow-300 text-yellow-700 placeholder-yellow-500"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  id="button"
                  className="btn bg-yellow-500 text-white hover:bg-yellow-400 px-6 py-2 font-semibold text-lg transition-colors duration-300 rounded-full"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

