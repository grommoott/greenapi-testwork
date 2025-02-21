import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@app": "./src/1.App/",
            "@pages": "./src/2.Pages/",
            "@widgets": "./src/3.Widgets/",
            "@entities": "./src/4.Entities/",
            "@shared": "./src/5.Shared/",
        },
    },
})
