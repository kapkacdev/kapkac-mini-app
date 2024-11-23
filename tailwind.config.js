// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        't': '0 -2px 4px rgba(0, 0, 0, 0.1)', // Custom shadow for the top of the menu tab
      },
      animation: {
        'smooth-bounce': 'smooth-bounce 1.5s ease-in-out infinite',
        'slide-hint': 'slideHint 1s ease-in-out',
      },
      keyframes: {
        'smooth-bounce': {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'ease-in-out' },
          '50%': { transform: 'translateY(-10px)', animationTimingFunction: 'ease-in-out' },
        },
        slideHint: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
};