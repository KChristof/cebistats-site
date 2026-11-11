import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cebistats.com',
  trailingSlash: 'never',
  integrations: [
    // Adresses sans barre finale, identiques aux balises canonical des pages
    sitemap({
      serialize: (item) => {
        const u = new URL(item.url);
        if (u.pathname !== '/' && u.pathname.endsWith('/')) u.pathname = u.pathname.slice(0, -1);
        return { ...item, url: u.href };
      },
    }),
  ],
});
