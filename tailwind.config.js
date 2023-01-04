/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        bias: "bias 10s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "transalte(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "transalte(0px, 0px) scale(1)",
          },
        },
        bias: {
          "0%, 100%": {
            'background-size': '100% 100%',
            'background-image': 'linear-gradient(to bottom right, MistyRose,NavajoWhite,LightCyan,Thistle,Pink,Salmon,Sienna)',
            'background-position': 'left center'
          },  
          "50%": {
            'background-size':'300% 300%',
            'background-image': 'linear-gradient(to bottom right, MistyRose,NavajoWhite,LightCyan,Thistle,Pink,Salmon,Sienna)',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
