import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({

    plugins: [
        react()
    ],

    resolve: {

        alias: {

            "@": path.resolve(__dirname, "src"),

            "@context": path.resolve(__dirname, "context"),

            "@styles": path.resolve(__dirname, "styles")

        }

    },

    server: {

        proxy: {

            "/api": {

                target: "http://localhost:8080",

                changeOrigin: true,

                secure: false

            }

        }

    }

});