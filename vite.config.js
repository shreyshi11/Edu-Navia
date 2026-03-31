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
  define: {
    'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify("AIzaSyAPXYOQk3LPxayuymhac79P4QsX13xvMZA"),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify("edu-navigator-cc4a0.firebaseapp.com"),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify("edu-navigator-cc4a0"),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify("edu-navigator-cc4a0.appspot.com"),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify("33607968332"),
    'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify("1:33607968332:web:59cbf34a0aae68375736e9"),
    'import.meta.env.VITE_API_URL': JSON.stringify("https://edu-navia-api.onrender.com")
  },
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
