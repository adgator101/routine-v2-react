import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa'

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
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Routine-BIC',
        short_name: 'Routine',
        description: 'A routine planning application',
        theme_color: '#F84178',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
