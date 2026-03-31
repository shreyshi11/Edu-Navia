import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/recommendations': 'http://127.0.0.1:8000',
      '/predict': 'http://127.0.0.1:8000'
    }
  },
  build: {
    outDir: 'dist',
  }
});
