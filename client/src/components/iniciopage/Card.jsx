import React from 'react';

const Card = ({ image, title, description, buttonText, onButtonClick }) => {
  return (
    <div className="card bg-yellow-100 border-2 border-yellow-400 w-96 shadow-xl transition-transform transform hover:scale-105">
      <figure className="px-10 pt-10">
        <img src={image} alt={title} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-yellow-600">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <div className="card-actions">
          <button 
            className="btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={onButtonClick} // Agregamos el manejador de clics
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
