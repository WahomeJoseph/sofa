/** @type {import('tailwindcss').Config} */
export const theme = {
    extend: {
        animation: {
            rotate: "rotate 10s linear infinite",
            'blob-bounce': 'blob-bounce 5s infinite ease'
        },
        boxShadow: {
            '2xl': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff'
        },
        keyframes: {
            rotate: {
                "0%": { transform: "rotate(0deg) scale(10)" },
                "100%": { transform: "rotate(-360deg) scale(10)" }
            },
            'blob-bounce': {
                '0%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
                '25%': { transform: 'translate(-100%, -100%) translate3d(100%, 0, 0)' },
                '50%': { transform: 'translate(-100%, -100%) translate3d(100%, 100%, 0)' },
                '75%': { transform: 'translate(-100%, -100%) translate3d(0, 100%, 0)' },
                '100%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' }
            }
        }
    }
};
export const plugins = [];
  