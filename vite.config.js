import { defineConfig } from 'vite';

import { resolve } from 'path';
import { readdirSync } from 'fs';

// Automatically find all HTML files to build safely
const root = process.cwd();
const htmlFiles = readdirSync(root).filter(file => file.endsWith('.html'));
const inputMap = {};
htmlFiles.forEach(file => {
  inputMap[file.replace('.html', '')] = resolve(root, file);
});

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
    rollupOptions: {
      input: inputMap
    }
  }
});
