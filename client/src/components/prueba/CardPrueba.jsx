import React from "react";

export function Card({ title, price }) {
    return (
      <div className="p-4 bg-yellow-700 rounded-lg shadow-lg text-center hover:bg-yellow-600 transition duration-300 ease-in-out">
        <h4 className="text-lg font-semibold text-yellow-200">{title}</h4>
        <p className="text-sm text-yellow-300 mt-2">{price}</p>
      </div>
    );
}
