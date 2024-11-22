import React from 'react';
export const BannerAboutus = () => {
    return (
        <div 
            className="hero min-h-screen flex items-center justify-center bg-black bg-opacity-20 relative"
            style={{ 
                backgroundImage: `url(src/assets/aboutus/sobrenosotros.png)`,
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
        >
            <div className="hero-overlay absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center relative z-10">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-yellow-600">Sobre Nosotros</h1>
                    <p className="mb-5 text-white">
                        Centralizando la historia de Formosa para estudiantes, educadores y ciudadanos.
                    </p>
                </div>
            </div>
        </div>
    );
};
