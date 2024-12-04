import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public', // Folder output build
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy untuk request ke backend
    },
  },
});
