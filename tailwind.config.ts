import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors:{
        'primary': '#FFEEEF',
        'secondary': '#B12753',
        'text': '#482F33',
        tremor: {
          brand: {
            faint: '#B12753',
            DEFAULT: '#B12753'
          },
          borderRadius: {
            'tremor-small': '0.375rem',
            'tremor-default': '0.5rem',
            'tremor-full': '9999px',
          },
          background: {
            muted: '#B12753',
            // subtle: colors.gray[800],
            // DEFAULT: colors.gray[900],
            // emphasis: colors.gray[300],
          },
          content: {
            subtle: '#482F33',
          }
          
        }

      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config