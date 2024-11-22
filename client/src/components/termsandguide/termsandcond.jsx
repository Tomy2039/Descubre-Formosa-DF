import React from "react";

const TermsSection = () => {
  return (
    <div className="bg-yellow-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Términos y Condiciones
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Última actualización: [31-10-2024]
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Bienvenido a Descubre Formosa. Al utilizar nuestros servicios, incluidos el acceso a la plataforma, la subida de contenido y la interacción con otros usuarios, aceptas estos Términos y Condiciones. Por favor, léelos detenidamente.
          </p>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Aceptación de los Términos</h3>
          <p className="text-lg text-gray-700 mb-4">
            Al registrarte en Descubre Formosa y/o subir contenido, declaras que has leído, comprendido y aceptado estos Términos y Condiciones, así como nuestras Políticas de Privacidad.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. Responsabilidad del Usuario</h3>
          <p className="text-lg text-gray-700 mb-4">
            Cada usuario es responsable del contenido que sube a Descubre Formosa, incluidos textos, imágenes, audios, y otros archivos (en adelante, el “Contenido”). Al cargar cualquier Contenido, garantizas que:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
            <li>Eres el propietario del Contenido o tienes los derechos necesarios y/o permisos para subirlo.</li>
            <li>El Contenido no infringe los derechos de autor, marca registrada u otros derechos de propiedad intelectual de terceros.</li>
            <li>El Contenido no contiene material ofensivo, difamatorio o ilegal.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. Licencia de Uso del Contenido</h3>
          <p className="text-lg text-gray-700 mb-4">
            Al subir Contenido a Descubre Formosa, otorgas a nuestra plataforma una licencia no exclusiva, mundial y sin regalías para usar, distribuir, reproducir y mostrar tu Contenido dentro de la plataforma y en redes asociadas para propósitos de promoción y difusión de Descubre Formosa.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Propiedad Intelectual de Terceros</h3>
          <p className="text-lg text-gray-700 mb-4">
            Descubre Formosa respeta los derechos de propiedad intelectual de terceros. No permitimos la publicación de Contenido que infrinja estos derechos. En caso de que subas Contenido que contenga materiales de terceros, es tu responsabilidad obtener los permisos necesarios de los titulares de esos derechos.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Si un titular de derechos considera que su contenido ha sido usado sin autorización en nuestra plataforma, puede notificarlo a nuestro equipo mediante el proceso de Denuncia de Infracciones (ver sección 6).
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Remoción de Contenido</h3>
          <p className="text-lg text-gray-700 mb-4">
            Nos reservamos el derecho a eliminar cualquier Contenido que consideremos, a nuestra discreción, que viola estos Términos y Condiciones o que pueda infringir derechos de terceros. Además, nos reservamos el derecho a suspender o eliminar cuentas de usuarios que infrinjan repetidamente nuestros términos o los derechos de propiedad intelectual de terceros.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">6. Denuncia de Infracciones</h3>
          <p className="text-lg text-gray-700 mb-4">
            Si consideras que algún Contenido de la plataforma infringe tus derechos de autor, puedes enviar una notificación a nuestro equipo de soporte con la siguiente información:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
            <li>Identificación del Contenido presuntamente infractor y su ubicación en la plataforma.</li>
            <li>Una declaración firmada bajo la pena de perjurio en la que afirmas que la información proporcionada es precisa y que eres el titular de los derechos de autor o estás autorizado a actuar en nombre del titular.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-4">
            Responderemos a las solicitudes válidas eliminando el Contenido infractor en el menor tiempo posible.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">7. Indemnización</h3>
          <p className="text-lg text-gray-700 mb-4">
            Al utilizar Descubre Formosa, aceptas indemnizar y mantener libre de responsabilidad a nuestra plataforma, incluyendo a sus administradores y empleados, frente a cualquier reclamo, demanda o gasto (incluyendo honorarios legales) derivados de:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
            <li>La subida de Contenido que infrinja los derechos de propiedad intelectual de terceros.</li>
            <li>Cualquier violación de estos Términos y Condiciones.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">8. Modificaciones de los Términos</h3>
          <p className="text-lg text-gray-700 mb-4">
            Nos reservamos el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento. Si hacemos cambios significativos, notificaremos a los usuarios por correo electrónico o mediante un aviso en nuestra plataforma. El uso continuado de Descubre Formosa después de dichos cambios implica tu aceptación de los nuevos Términos y Condiciones.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">9. Contacto</h3>
          <p className="text-lg text-gray-700 mb-4">
          Para cualquier consulta sobre estos Términos y Condiciones o para reportar infracciones, puedes contactarnos en{" "}
          <a href="mailto:descubreformosa@gmail.com" className="text-blue-500 hover:text-blue-700">
         descubreformosa@gmail.com
 </a>.
</p>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
