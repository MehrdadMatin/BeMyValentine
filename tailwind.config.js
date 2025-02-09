module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'move-hearts': 'moveHearts 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        moveHearts: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}