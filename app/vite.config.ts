import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Algorithm-Trainer/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@server": path.resolve(__dirname, "./server"),
    },
  },
  root: "./client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    // Ensure CSS is properly processed
    cssCodeSplit: false, // Keep all CSS in one file
    minify: true,
    sourcemap: true,
  },
  css: {
    // Ensure PostCSS processes all CSS
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
});
