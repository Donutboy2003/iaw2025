import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        baskervville: ['Baskervville', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        gold: '#bbae72',
      },
      
      keyframes: {
        borderHeartbeat: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
          },
          "15%, 45%": {
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
          },
          "30%": {
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
          },
        },
      },
      animation: {
        borderHeartbeat: "borderHeartbeat 2s infinite",
      },
      boxShadow: {
        neomorphic: '8px 8px 16px #0c0c0c, -8px -8px 16px #282828',
        neomorphicInset: 'inset 3px 3px 6px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(255,255,255,0.1)',
      },

      
      
      
    },
    
  },
  plugins: [],
}

export default config
