import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    //tailwindcss(),
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/RemoteEntry.jsx'
      },
      shared: ['react', 'react-dom', '@apollo/client']
    })
  ],
  build: { target: 'esnext' },
  server: { port: 4173, cors: true }
});
