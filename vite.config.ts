import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/items': {  // Proxy requests to /items to backend
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});
