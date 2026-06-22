import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Weft Passport Brand Palette — Heritage & Craft
        weft: {
          ivory:        '#F9F5EE',  // Background cream
          sand:         '#E8DCC8',  // Card backgrounds / borders
          loom:         '#C4A882',  // Accent warm tan
          terracotta:   '#B85C38',  // CTA / Highlights
          indigo:       '#2D4A7A',  // Primary brand deep blue
          'indigo-light': '#3D5F96',
          'indigo-dark':  '#1E3358',
          silk:         '#8B6F5E',  // Secondary warm brown
          moss:         '#4A5E40',  // Eco / artisan verified green
          gold:         '#C9A227',  // Premium / certified badge
          charcoal:     '#2C2C2C',  // Body text
          muted:        '#6B7280',  // Muted text
          // Semantic aliases used throughout components
          text:         '#2C2C2C',  // alias → charcoal
          border:       '#E8DCC8',  // alias → sand
        },
        // Cream shades (alias of weft-ivory family)
        cream: {
          50:  '#FDFBF7',
          100: '#F9F5EE',
          200: '#E8DCC8',
        },
        // Saffron – sidebar active state, notification dot
        saffron: {
          400: '#F59E0B',
        },
        // Earth – artisan avatar placeholder
        earth: {
          100: '#F5EDE0',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'heritage-gradient': 'linear-gradient(135deg, #2D4A7A 0%, #1E3358 50%, #B85C38 100%)',
        'ivory-gradient':    'linear-gradient(180deg, #F9F5EE 0%, #E8DCC8 100%)',
        'loom-gradient':     'linear-gradient(135deg, #C4A882 0%, #8B6F5E 100%)',
        // Alias used in login panel
        'gradient-weft':     'linear-gradient(135deg, #2D4A7A 0%, #1E3358 50%, #B85C38 100%)',
      },
      boxShadow: {
        'heritage':  '0 4px 24px rgba(45, 74, 122, 0.12)',
        'card':      '0 2px 16px rgba(44, 44, 44, 0.08)',
        'gold':      '0 4px 20px rgba(201, 162, 39, 0.25)',
        'weft-lg':   '0 8px 32px rgba(45, 74, 122, 0.18)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out',
        'fade-in':    'fadeIn 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
