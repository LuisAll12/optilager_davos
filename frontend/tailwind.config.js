/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    800: '#0E1A2B',
                    900: '#0A1020',
                },
            },
        },
    },
    plugins: [],
}
