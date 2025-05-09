/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        yellow: {
          100: '#fef9c3',
          800: '#854d0e',
        },
        blue: {
          100: '#dbeafe',
          800: '#1e40af',
        },
        purple: {
          100: '#f3e8ff',
          800: '#6b21a8',
        },
        green: {
          100: '#dcfce7',
          500: '#22c55e',
          800: '#166534',
        },
        red: {
          500: '#ef4444',
        },
      },
    },
  },
  plugins: [],
} 