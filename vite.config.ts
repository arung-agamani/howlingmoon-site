import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), splitVendorChunkPlugin(), TanStackRouterVite()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes("tsparticles")) {
                        return "tsparticles";
                    }
                },
            },
        },
    },
});
