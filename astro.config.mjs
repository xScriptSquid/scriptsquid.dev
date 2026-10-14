import { cp, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config.ts';

const comingSoonKeep = new Set([
  '_astro',
  '.well-known',
  '_headers',
  'favicon.svg',
  'og.png',
  'robots.txt',
  'index.html',
  '404.html',
]);

function comingSoon() {
  return {
    name: 'coming-soon',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const landing = join(out, 'coming-soon');
        if (site.launched) {
          await rm(landing, { recursive: true, force: true });
          return;
        }
        await cp(join(landing, 'index.html'), join(out, 'index.html'));
        await cp(join(landing, 'index.html'), join(out, '404.html'));
        for (const entry of await readdir(out)) {
          if (!comingSoonKeep.has(entry)) await rm(join(out, entry), { recursive: true, force: true });
        }
        await writeFile(join(out, 'robots.txt'), 'User-agent: *\nAllow: /\n');
        logger.info('site.launched is false: shipped the coming-soon page only.');
      },
    },
  };
}

export default defineConfig({
  site: 'https://scriptsquid.dev',
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'never',
  },
  integrations: [
    mdx(),
    ...(site.launched ? [sitemap({ filter: (page) => !page.endsWith('/coming-soon/') })] : []),
    comingSoon(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    },
  },
});
