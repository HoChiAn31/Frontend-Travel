/** @type {import('tailwindcss').Config} */
// import animations from '@midudev/tailwind-animations';
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            colors: {
                orange: '#f79517',
                blue: '#009FE5',
                bluelogo: '#19619E',
                blueButton: '#007AFF',
                black1: '#1A1A1A',
                darkHF: '#242526', // using header and footer
                darkbody: '#18191A',
                darkOutStanding: '#3E3E3F',
                red: '#DC2720',
                green: '#68FD87',
                green1: '#21BA45',
            },
        },
    },
    darkMode: 'class',
    plugins: [require('tailwindcss'), require('autoprefixer'), require('tailwindcss-animated')],
    important: true,
};
