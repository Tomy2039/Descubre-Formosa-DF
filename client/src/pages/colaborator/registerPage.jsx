import React, { useState } from 'react';
import logo from '../../assets/loginregister/dflogo.png';
import register from '../../assets/loginregister/unlock.png';
import wave from '../../assets/loginregister/wave.png';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email } = formData;

    try {
      const response = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password: password, email: email }), // Simplificado al tener nombres iguales
      });
    
      // Verificamos si el servidor envía JSON, pero también manejamos texto plano en caso de error.
      let data;
      try {
        data = await response.json(); // Intentamos parsear la respuesta como JSON
      } catch (err) {
        data = { message: await response.text() }; // Si no es JSON, tratamos como texto plano
      }
    
      if (response.ok) {
        alert('Registro exitoso');
        window.location.href = 'http://localhost:5173/login'; // Redirigir al login
      } else {
        // Mostramos el mensaje de error recibido del servidor
        alert('Error en el registro: ' + (data.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('No se pudo conectar con el servidor. Intenta nuevamente más tarde.');
    }
    
  };

  return (
    <div>
      <img
        src={wave}
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: 0 }}
        alt="Wave Background"
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 bg-yellow-100">
        <img
          src={register}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          alt="Register Icon"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-1/2 mx-auto -translate-x-3"
        >
          <img src={logo} className="w-3/4" alt="Logo" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Descubre Formosa
          </h2>
          <div className="relative">
            <i className="fa fa-user absolute text-primarycolor text-xl"></i>
            <input
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleInputChange}
              className="pl-8 border-b-2 border-yellow-500 font-display focus:outline-none focus:border-yellow-500 transition-all duration-500 capitalize text-lg"/>
          </div>
          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className="pl-8 border-b-2 border-yellow-500 font-display focus:outline-none focus:border-yellow-500 transition-all duration-500 capitalize text-lg"
            />
          </div>
          <div className="relative mt-8">
            <i className="fa fa-envelope absolute text-primarycolor text-xl"></i>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-8 border-b-2 border-yellow-500 font-display focus:outline-none focus:border-yellow-500 transition-all duration-500 capitalize text-lg" 
            />
          </div>
          
          <a href="http://localhost:5173/login" className="self-end mt-4 text-gray-600 font-bold">
            ¿Ya tienes una cuenta? Inicia sesión
          </a>
          
          <button
            type="submit"
            className="py-3 px-20 bg-primarycolor rounded-full text-yellow-500 font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
