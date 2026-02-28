// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  image: {
    domains: [], // Add your Strapi domain here when setting up
  },
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: ['localhost', 'vilma-unreverberated-undespondently.ngrok-free.dev'],
    },
  },
});
