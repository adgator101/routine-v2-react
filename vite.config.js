import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Routine-BIC',
          description: 'A routine planning application',
        },
      },
    }),
  ],
})
