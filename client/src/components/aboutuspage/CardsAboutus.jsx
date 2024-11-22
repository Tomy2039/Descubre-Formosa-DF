import React from "react";

export const CardsAboutus = ({ title, description }) => {
    return (
        <div className="w-[300px] lg:w-[350px] bg-yellow-300 rounded-lg p-6 text-center snap-start"> 
            <h3 className="text-xl font-bold mb-4 text-yellow-900">{title}</h3>
            <p>{description}</p>
        </div>
    );
};
