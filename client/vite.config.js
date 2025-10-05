import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import the tailwind plugin
import path from 'path'; // Import the built-in 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // 1. Include the TailwindCSS plugin
    react(),
  ],
  resolve: {
    alias: {
      // 2. Add the alias configuration for shadcn/ui
      "@": path.resolve(__dirname, "./src"),
    },
  },
});