import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      context: 'window'
    }
  },

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
});
