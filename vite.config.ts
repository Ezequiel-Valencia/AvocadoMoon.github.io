import { sveltekit } from "@sveltejs/kit/vite";
import { optimizeDeps } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    reporters: ['verbose'],
    silent: false,
    threads: true,
    
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
});
