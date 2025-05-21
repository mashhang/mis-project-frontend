import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/save_user.php': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
      },
      '/login.php': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
