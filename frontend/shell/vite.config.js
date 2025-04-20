import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'shell',
      remotes: {
        auth: 'http://localhost:4173/assets/remoteEntry.js',
        community: 'http://localhost:4174/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', '@apollo/client']
    })
  ],
  build: { target: 'esnext' },
  server: { port: 3000 }
});