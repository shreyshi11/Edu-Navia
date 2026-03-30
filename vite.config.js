import { defineConfig } from 'vite';

export default defineConfig({
  // Vite looks for .env files automatically
  // For basic static sites, no extra config is needed
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
