import React from 'react';

export function OptionButton({ id, label, description, role, isSelected, onToggle }) {
  return (
    <button
      id={id}
      onClick={() => onToggle(role)}
      className={`w-full bg-yellow-100 hover:bg-yellow-300 text-yellow-800 p-4 rounded-lg focus:outline-none ${
        isSelected ? 'border-4 border-yellow-400' : ''
      }`}
    >
      {label} <br />
      <span className="text-sm text-yellow-700">{description}</span>
    </button>
  );
}
