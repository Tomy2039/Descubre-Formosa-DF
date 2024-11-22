import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import logo from '../../assets/loginregister/dflogo.png';
import mapApp from '../../assets/loginregister/undraw_my_location_re_r52x.png';
import wave from '../../assets/loginregister/wave.png';

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth(); // Obtienes la función login del contexto

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        console.log('Login exitoso');
        
        // Actualizamos el contexto con el usuario autenticado
        login(data.user); // Aquí se llama la función `login` que está en AuthContext

        // Redirigimos a la página del formulario
        window.location.href = 'http://localhost:5173/form'; 
      } else {
        alert('Login fallido: ' + data.message);
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  return (
    <div>
      <img
        src={wave}
        className="fixed hidden lg:block inset-0 h-full bg-yellow-100"
        style={{ zIndex: 0 }}
        alt="Wave Background"
      />
      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 bg-yellow-100">
        <img
          src={mapApp}
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          alt="Map Icon"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-1/2 mx-auto -translate-x-3 bg-yellow-100"
        >
          <img src={logo} className="w-3/4" alt="Logo" />
          <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
            Descubre Formosa
          </h2>
          <div className="relative">
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
          <a href="http://localhost:5173/register" className="self-end mt-4 text-gray-600 font-bold">
            ¿No tienes una cuenta? Regístrate
          </a>
          <button
            type="submit"
            className="py-3 px-20 bg-primarycolor rounded-full text-yellow-300 font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
