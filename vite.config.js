import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base : '/Blood/', // ✅ REQUIRED for GitHub Pages

  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: '**/*.{js,jsx}',
    }),
  ],

  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  server: {
    port: 3000,
  },
});
