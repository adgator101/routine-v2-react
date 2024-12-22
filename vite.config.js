import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
