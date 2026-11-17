/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          cream: '#FAF8F5',
          card: '#FFFFFF',
          border: '#F0ECE1',
          text: '#2D3748',
          subtext: '#718096',
          // Lavender
          lilac: {
            50: '#FAF5FF',
            100: '#F3E8FF',
            200: '#E9D5FF',
            300: '#D8B4FE',
            500: '#A855F7',
          },
          // Sage Mint
          sage: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            500: '#22C55E',
          },
          // Sky Water
          sky: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            500: '#0EA5E9',
          },
          // Warm Peach
          peach: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            500: '#F97316',
          },
          // Butter Yellow
          butter: {
            50: '#FEFCE8',
            100: '#FEF9C3',
            200: '#FEF08A',
            300: '#FDE047',
            500: '#EAB308',
          },
          // Soft Coral/Rose
          rose: {
            50: '#FFF1F2',
            100: '#FFE4E6',
            200: '#FECDD3',
            300: '#FDA4AF',
            500: '#F43F5E',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 16px 40px rgba(0, 0, 0, 0.06)',
        'pastel-purple': '0 10px 25px -5px rgba(216, 180, 254, 0.4)',
        'pastel-blue': '0 10px 25px -5px rgba(186, 230, 253, 0.5)',
        'pastel-green': '0 10px 25px -5px rgba(187, 247, 208, 0.4)',
        'pastel-peach': '0 10px 25px -5px rgba(254, 215, 170, 0.4)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'wave': 'wave 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-4px) rotate(1deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)' },
          '70%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
