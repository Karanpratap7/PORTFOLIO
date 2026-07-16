import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Project page served at https://karanpratap7.github.io/PORTFOLIO/
export default defineConfig({
  base: '/PORTFOLIO/',
  plugins: [react()],
});
