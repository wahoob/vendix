/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato"],
      },
      boxShadow: {
        shadow1: "5px 5px 15px 0px rgba(0, 0, 0, 0.05)",
        shadow2:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        shadow3: "0px 1px 2px 0px #010F1C1A",
        shadow4: "0px 15px 30px rgba(0, 0, 0, 0.1)",
        shadow5: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
        shadow6:
          "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
      },
      backgroundImage: {
        "slider-tabpanel": "url('/images/tabpanel.png')",
        "footer-tabpanel": "url('/images/tabpanel2.png')",
        "auth-login": "url('/images/auth-login.jpg')",
        "auth-signup": "url('/images/auth-signup.jpg')",
      },
      keyframes: {
        openPanel: {
          "0%": { opacity: "0", transform: "scaleY(0.9)" },
          "100%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        openPanel: "openPanel 150ms ease-in-out forwards",
      },
    },
    screens: {
      sm: "740px",
      md: "920px",
      lg: "1200px",
      xl: "1480px",
      "2xl": "1658px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2.25rem",
      },
      screens: {
        sm: "740px",
        md: "920px",
        lg: "1200px",
        xl: "1480px",
        "2xl": "1658px",
      },
    },
  },
};
