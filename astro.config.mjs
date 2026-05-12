import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  site: 'https://ludwigmattsson.github.io',
  base: '/CMS-Exp-site',
});
