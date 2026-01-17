import { defineConfig } from "cypress"

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:5001",
        env: {
            API_PREFIX: "/api/ardb",
        },
    },
})