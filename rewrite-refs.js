const fs = require('fs');
const path = require('path');

const walk = d => fs.readdirSync(d, { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

const re = /assets\/images\/([\w\-./ ]+?)\.(jpe?g|png)/gi;
let changed = 0;

const files = walk('src/app').filter(
  f => /\.(html|ts|css)$/.test(f) && !/seo(-data|\.service)\.ts$/.test(f)
);

for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  const out = text.replace(re, (match, p) => {
    const lower = p.toLowerCase().replace(/ /g, '-');
    const webp = path.join('src/assets/images', lower + '.webp');
    return fs.existsSync(webp) ? `assets/images/${lower}.webp` : match;
  });
  if (out !== text) {
    fs.writeFileSync(f, out);
    changed++;
    console.log('Updated:', f);
  }
}
console.log('Files updated:', changed);
