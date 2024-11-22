import React from 'react';

export function NextButton({ onClick }) {
  return (
    <button
      id="next-btn"
      onClick={onClick}
      className="w-full bg-yellow-400 text-yellow-800 font-semibold py-3 rounded-lg focus:outline-none hover:opacity-90"
    >
      Siguiente
    </button>
  );
}
