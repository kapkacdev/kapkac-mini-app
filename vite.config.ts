import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // React plugin with SWC for faster builds
import svgr from 'vite-plugin-svgr'; // Plugin for importing SVG files as React components

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), svgr() // Enables React support with SWC compiler for optimized builds
  ],
  server: {
    // Configure the development server
    hmr: true, // Enable Hot Module Replacement (HMR)
    watch: {
      // Watch all files in the 'src' directory for changes
      ignored: ['!**/src/**'],
    },
  },
  resolve: {
    alias: {
      // Add any necessary path aliases here
      // Example: '@components': '/src/components',
    },
  },
  build: {
    target: 'esnext', // Use the latest JavaScript features
    minify: 'esbuild', // Use esbuild for faster minification
  },
  
});
