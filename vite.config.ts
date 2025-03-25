import { sveltekit } from "@sveltejs/kit/vite";
import { optimizeDeps } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    reporters: ['verbose'],
    silent: false,
    globals: true,
    environment: "jsdom",
  },

  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@use "./routes/variables.scss" as *;',
      },
    },
  },
});
