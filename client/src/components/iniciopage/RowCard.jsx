import React from 'react';
import Card from './Card'; // Asegúrate de ajustar la ruta según tu estructura de carpetas.

const RowCard = ({ cards }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          buttonText={card.buttonText}
        />
      ))}
    </div>
  );
};

export default RowCard;
