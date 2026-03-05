// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://cloudvalid.com",
  trailingSlash: "always",
  output: 'static',
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
  },
  prefetch: true,
});
