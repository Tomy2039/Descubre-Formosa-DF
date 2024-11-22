import React, { useState, useCallback } from 'react';
import { OptionButton } from '../../components/formpage/OptionButton';
import { NextButton } from '../../components/formpage/NextButton';

export function FormPage() {
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const toggleOption = useCallback((roleName) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = new Set(prevSelectedOptions);
      newSelectedOptions.has(roleName) ? newSelectedOptions.delete(roleName) : newSelectedOptions.add(roleName);
      return newSelectedOptions;
    });
  }, []);

  const handleNextClick = useCallback(() => {
    localStorage.setItem('userSelections', JSON.stringify(Array.from(selectedOptions)));
    window.location.href = '/colaborator';
  }, [selectedOptions]);

  // Opciones de botones para pasar como props
  const options = [
    { id: 'interactive-map', label: '🗺️ Mapa Interactivo', description: 'Explora Formosa a través de un mapa interactivo.', role: 'Mapa Interactivo' },
    { id: 'art-media', label: '🎨 Arte y Medios', description: 'Compartir y ver Multimedias de otros usuarios.', role: 'Arte y Medios' },
    { id: 'musica-local', label: '🎶 Música Local', description: 'Disfruta de música y sonidos autóctonos de Formosa.', role: 'Música Local' },  // Cambio aquí
    { id: 'biblioteca', label: '📚 Biblioteca', description: 'Accede a la biblioteca de contenidos sobre Formosa.', role: 'Biblioteca' },  // Nueva opción
    { id: 'eventos-culturales', label: '🎭 Eventos Culturales', description: 'Conoce los eventos culturales y actividades en Formosa.', role: 'Eventos Culturales' },  // Nueva opción
    { id: 'all', label: '💬 De todo un poco', description: 'Sé libre de compartir en cada sección.', role: 'De todo un poco' },
  ];
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg color-fondo mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-yellow-800 text-center">
          ¿Qué quieres hacer en Descubre Formosa?
        </h1>
        <p className="text-yellow-800 mb-6 text-center">Selecciona una o más opciones:</p>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => (
            <OptionButton
              key={option.id}
              id={option.id}
              label={option.label}
              description={option.description}
              role={option.role}
              isSelected={selectedOptions.has(option.role)}
              onToggle={toggleOption}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <NextButton onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
}
export default FormPage