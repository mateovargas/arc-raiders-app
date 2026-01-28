import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                arc: {
                    bg: "#0b0e11",
                    border: "#2a2f36",
                    text: "#e6e8eb",
                    muted: "#9aa0a6",

                    // Arc Raiders stripe colors
                    cyan: "#6ee7e5",
                    green: "#4ade80",
                    yellow: "#facc15",
                    red: "#ef4444",
                    white: "#ffffff",
                }
            },
            fontFamily: {
                arc: ["Inter", "ui-sans-serif", "system-ui"],
            },
            boxShadow: {
                arc: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.6)",
            },
        },
    },
    plugins: [],
} satisfies Config;
