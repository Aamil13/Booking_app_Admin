import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from `.env` file
dotenv.config();

const isProduction = process.env.VITE_ISPRODUCTION == 'true';

const proxyConfig = isProduction
  ? {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path: any) => path.replace(/^\/api/, '/api'),
      },
    }
  : {
      '/api': {
        target: 'https://bookings-app-lac.vercel.app',
        changeOrigin: true, // Ensures the origin of the request is adjusted
        secure: false, // Disables SSL verification (useful in dev with self-signed certificates)
        rewrite: (path: any) => path.replace(/^\/api/, '/api'),
      },
    };

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyConfig,
  },
});
