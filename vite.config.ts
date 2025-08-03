import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  base: '/sharunerajeev/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
