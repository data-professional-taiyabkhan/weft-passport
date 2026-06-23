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
        // Weft Passport Brand Palette — refined heritage system
        weft: {
          ink:           '#16233f',  // Primary text / deepest
          indigo:        '#243b6b',  // Primary brand
          'indigo-light':'#2a4378',
          'indigo-dark': '#192c54',
          'indigo-deep': '#192c54',
          zari:          '#c2932f',  // Gold accent
          'zari-bright': '#dcb24c',
          madder:        '#a8412c',  // Terracotta / madder red
          green:         '#3c7a52',  // Verified / eco
          amber:         '#b07916',
          'amber-soft':  '#fbf0db',
          // Surfaces
          paper:         '#f4f0e7',
          canvas:        '#f7f4ec',
          surface:       '#ffffff',
          'surface-2':   '#faf7ef',
          line:          '#e6e0d0',
          'line-strong': '#d6cdb8',
          muted:         '#6f6857',
          'muted-soft':  '#9b927f',
          // Legacy aliases kept so older markup still resolves
          ivory:         '#f7f4ec',
          sand:          '#e6e0d0',
          loom:          '#c2932f',
          terracotta:    '#a8412c',
          silk:          '#6f6857',
          moss:          '#3c7a52',
          gold:          '#c2932f',
          charcoal:      '#16233f',
          text:          '#16233f',
          border:        '#e6e0d0',
        },
        // Override default indigo scale → brand indigos (cascades to dashboard pages)
        indigo: {
          50:  '#eef2fb',
          100: '#eef2fb',
          200: '#aab6d6',
          300: '#c4cce0',
          400: '#7e8bb0',
          500: '#3a5290',
          600: '#243b6b',
          700: '#2a4378',
          800: '#243b6b',
          900: '#192c54',
          950: '#16233f',
        },
        cream: {
          50:  '#faf7ef',
          100: '#f7f4ec',
          200: '#e6e0d0',
        },
        saffron: {
          400: '#dcb24c',
        },
        earth: {
          100: '#f4f0e7',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'heritage-gradient': 'linear-gradient(135deg, #192c54 0%, #16233f 55%, #243b6b 100%)',
        'ivory-gradient':    'linear-gradient(180deg, #f7f4ec 0%, #f4f0e7 100%)',
        'loom-gradient':     'linear-gradient(135deg, #c2932f 0%, #946c14 100%)',
        'gradient-weft':     'linear-gradient(160deg, #192c54 0%, #16233f 60%, #243b6b 100%)',
      },
      boxShadow: {
        'heritage':  '0 4px 14px rgba(36,59,107,.22)',
        'card':      '0 1px 2px rgba(22,35,63,.05), 0 6px 20px rgba(22,35,63,.06)',
        'gold':      '0 4px 18px rgba(194,147,47,.25)',
        'weft-lg':   '0 24px 60px rgba(22,35,63,.16)',
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
