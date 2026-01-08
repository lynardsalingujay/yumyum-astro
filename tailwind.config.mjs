/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // YumYum Brand Colors - Warm coral/red theme
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Main coral/red
          600: '#dc2626',  // Buttons, CTAs
          700: '#b91c1c',  // Hover states
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Accent color - Golden yellow/orange for highlights
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Main golden yellow
          600: '#d97706',  // Used for CTAs
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutral warm tones for backgrounds
        cream: {
          50: '#fefdfb',
          100: '#fef7ed',
          200: '#fde8cc',
          300: '#fbd9ab',
        },
      },
    },
  },
  plugins: [],
}
