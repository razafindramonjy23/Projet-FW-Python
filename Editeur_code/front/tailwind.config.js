import { Opacity } from '@mui/icons-material';
import { transform } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"
    // "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:['Poppins', 'sans-serif']
      },
      animation: {
        blob: 'blob 7s infinite',
        fadeIn: 'fadeIn 1s ease-out'
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }, 
        fadeIn:{
          '0%': {Opacity:'0', transform:'translateY(20px)'},
          "100%" : {Opacity:'1', transform:'translateY(0)'}
        }
      },

      backgroundImage: {
        'pattern-subtle': `
          linear-gradient(to right, 
            rgba(59, 130, 246, 0.05), 
            rgba(59, 130, 246, 0.02)
          ),
          repeating-radial-gradient(
            circle at 20% 80%, 
            rgba(99, 102, 241, 0.05) 0px, 
            rgba(99, 102, 241, 0.05) 10px,
            transparent 10px, 
            transparent 20px
          )
        `
      }



    },
  },
  plugins: [],
};
