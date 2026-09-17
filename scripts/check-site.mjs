import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const root = resolve('dist');
const pages = ['index.html', 'services.html', 'realisations.html'];
const errors = [];
for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${page}: duplicate id`);
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${page}: expected one h1`);
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(url)) continue;
    const [pathname, anchor] = url.split('#');
    const path = pathname === '/' ? resolve(root, 'index.html') : pathname ? resolve(dirname(resolve(root, page)), pathname) : resolve(root, page);
    if (!existsSync(path)) { errors.push(`${page}: missing ${url}`); continue; }
    if (anchor && path.endsWith('.html') && !readFileSync(path, 'utf8').includes(`id="${anchor}"`)) errors.push(`${page}: missing anchor ${url}`);
  }
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(tag[0])) errors.push(`${page}: missing image alt`);
  for (const tag of html.matchAll(/<a\b[^>]*>/g)) if (/target="_blank"/.test(tag[0]) && !/rel="[^"]*noopener/.test(tag[0])) errors.push(`${page}: unsafe external target`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${pages.length} pages, local assets, anchors, IDs, image alternatives and external link attributes.`);
