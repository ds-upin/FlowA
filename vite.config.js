import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate', // keeps your service worker fresh
            includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
                name: 'My React Vite PWA',
                short_name: 'MyPWA',
                description: 'A Progressive Web App built with React and Vite',
                theme_color: '#0d6efd',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                        src: '/flowiconcrop.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/flowiconcrop.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/flowiconcrop.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ]
})