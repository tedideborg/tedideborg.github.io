import { defineConfig } from 'astro/config';
import alpine from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
    site: 'https://tedideborg.github.io',
    integrations: [alpine()],
});
