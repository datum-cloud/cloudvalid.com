// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://cloudvalid.com",
  trailingSlash: "always",
  output: 'static',
  adapter: node({
    mode: "middleware",
  }),
  integrations: [
    starlight({
      title: "Docs with Tailwind",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true,
    },
    ssr: {
      noExternal: ['zod'],
    },
  },
  experimental: {},
  prefetch: true,
});
