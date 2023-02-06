/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/*.{js,jsx,ts,tsx}'],
  safelist: [
    'text-[#D91023]',
    'text-[#FFFFFF]',
    'text-[#002654]',
    'text-[#ED2939]',
    'text-[#006434]',
    'text-[#C6210B]',
    'text-[#000000]',
    'text-[#C9243F]',
    'text-[#28B858]',
    'text-[#014751]',
    'text-[#E13A3E]',
    'text-[#231F20]',
    'text-[#E13A3E]',
    'text-[#002B5D]',
    'text-[#C81025]',
    'text-[#101010]',
    'text-[#553184]',
    'text-[#D6221B]',
    'text-[#C9271A]',
    'text-[#2C2079]'
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite',
        bias: 'bias 10s infinite'
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'transalte(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'transalte(0px, 0px) scale(1)'
          }
        },
        bias: {
          '0%, 100%': {
            'background-size': '100% 100%',
            'background-image': 'linear-gradient(to bottom right, MistyRose,NavajoWhite,LightCyan,Thistle,Pink,Salmon,Sienna)',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '300% 300%',
            'background-image': 'linear-gradient(to bottom right, MistyRose,NavajoWhite,LightCyan,Thistle,Pink,Salmon,Sienna)',
            'background-position': 'right center'
          }
        }
      }
    }
  },
  plugins: []
};
