import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/1.App/"),
            "@pages": path.resolve(__dirname, "./src/2.Pages/"),
            "@widgets": path.resolve(__dirname, "./src/3.Widgets/"),
            "@entities": path.resolve(__dirname, "./src/4.Entities/"),
            "@shared": path.resolve(__dirname, "./src/5.Shared/")
        }
    }
})
