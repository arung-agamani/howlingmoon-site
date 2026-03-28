import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        TanStackRouterVite(),
        tsconfigPaths(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes("tsparticles")) {
                        return "tsparticles";
                    }
                    if (id.includes("three") || id.includes("@react-three")) {
                        return "three";
                    }
                },
            },
        },
    },
});
