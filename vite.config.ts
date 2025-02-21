import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const dirname = __dirname || process.cwd()

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@app": path.resolve(dirname, "./src/1.App/"),
            "@pages": path.resolve(dirname, "./src/2.Pages/"),
            "@widgets": path.resolve(dirname, "./src/3.Widgets/"),
            "@entities": path.resolve(dirname, "./src/4.Entities/"),
            "@shared": path.resolve(dirname, "./src/5.Shared/"),
        },
    },
})
