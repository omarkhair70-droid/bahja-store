import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bahja: {
          ivory: '#F8F4ED',
          cream: '#F3EADF',
          blush: '#EBCFCB',
          rose: '#D9B5B0',
          beige: '#DCC8B1',
          taupe: '#B59B86',
          brown: '#846857',
          terracotta: '#B5725A',
          champagne: '#C6A874'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(132,104,87,0.12)'
      }
    }
  },
  plugins: []
};

export default config;
