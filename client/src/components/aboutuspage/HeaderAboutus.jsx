import React from 'react';
import { useNavigate } from 'react-router-dom';
export const HeaderAboutus = () => {
    const navigate = useNavigate();
    const LinkRegister = () => {
        navigate('/register');
    };

    return (
        <header className="bg-yellow-300 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-yellow-800">Descubre Formosa</h1>
                <nav className="space-x-6">
                    <a href="/" className="text-black hover:text-yellow-800">Inicio</a>
                    <a href="/a" className="text-black hover:text-yellow-800">Lugares Históricos</a>
                    <a href="/map" className="text-black hover:text-yellow-800">Mapa Interactivo</a>
                </nav>
                <button
                    onClick={LinkRegister}
                    className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600"
                >
                    Unirse
                </button>
            </div>
        </header>
    );
};