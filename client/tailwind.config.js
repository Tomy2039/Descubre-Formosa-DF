/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",            // Asegúrate de que index.html está en la raíz
  "./src/**/*.{js,jsx,ts,tsx}",  // Asegura que tus archivos JSX estén dentro de src
];

export const theme = {
  extend: {},
};

export const plugins = [require("daisyui")];
