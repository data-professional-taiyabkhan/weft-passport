import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Weft Passport Brand Colors
        ink: '#16233f',
        indigo: {
          DEFAULT: '#243b6b',
          deep: '#192c54',
          soft: '#eef2fb',
        },
        zari: {
          DEFAULT: '#c2932f',
          bright: '#dcb24c',
          soft: '#fbf0db',
        },
        madder: {
          DEFAULT: '#a8412c',
          soft: '#fdeee9',
        },
        paper: '#f4f0e7',
        canvas: '#f7f4ec',
        surface: {
          DEFAULT: '#ffffff',
          2: '#faf7ef',
        },
        border: '#e6e0d0',
        'border-strong': '#d6cdb8',
        muted: {
          DEFAULT: '#6f6857',
          soft: '#9b927f',
        },
        sage: {
          DEFAULT: '#3c7a52',
          soft: '#e7f1ea',
        },
        amber: {
          DEFAULT: '#b07916',
          soft: '#fbf0db',
        },
      },
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '16px',
        sm: '11px',
        lg: '20px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,35,63,.05), 0 6px 20px rgba(22,35,63,.06)',
        lg: '0 24px 60px rgba(22,35,63,.16)',
        xl: '0 32px 80px rgba(22,35,63,.20)',
      },
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(185deg, #192c54, #15264a)',
        'hero-gradient': 'linear-gradient(135deg, #16233f 0%, #243b6b 50%, #192c54 100%)',
        'zari-gradient': 'linear-gradient(135deg, #c2932f, #dcb24c)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
