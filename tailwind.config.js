/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EE',
        cream: '#EFE9DF',
        charcoal: '#24211F',
        taupe: '#77716B',
        burgundy: '#722F37',
        'warm-grey': '#D9D2C8',
        espresso: '#29221F',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Bodoni Moda', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-bodoni)', 'Bodoni Moda', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'widest-editorial': '0.25em',
        'tight-editorial': '-0.03em',
      },
    },
  },
  plugins: [],
};

