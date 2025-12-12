import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración por defecto para Vite + React
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173, 
  },
});
