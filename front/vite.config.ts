import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";// vérification de types TypeScript en temps réel
import mdx from '@mdx-js/rollup'



export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }),
    mdx(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});