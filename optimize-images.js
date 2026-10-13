const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

sharp.cache(false);

const SRC = 'src/assets/images';
const BACKUP = 'image-originals';

const KEEP = [
  'carousel-3.jpg', 'blog.jpg', 'karma2.png', 'ayodhya.jpeg', 'vraj.jpg',
  'dwarka.jpg', 'keshavam-city-9.jpg', 'keshavam-city-10.jpg',
  'u-logo.png', 'mukunda-logo-02.png'
];

const walk = d => fs.readdirSync(d, { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

async function toWebp(input, outFile, maxWidth, maxKB) {
  let quality = 80;
  let buf;
  do {
    buf = await sharp(input)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    quality -= 7;
  } while (buf.length > maxKB * 1024 && quality >= 30);
  fs.writeFileSync(outFile, buf);
  return Math.round(buf.length / 1024);
}

(async () => {
  const skipped = [];
  const files = walk(SRC).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const f of files) {
    const dir = path.dirname(f);
    const base = path.basename(f, path.extname(f)).toLowerCase().replace(/\s+/g, '-');

    const input = fs.readFileSync(f);
    const big = await toWebp(input, path.join(dir, base + '.webp'), 1920, 250);
    const small = await toWebp(input, path.join(dir, base + '-800.webp'), 800, 80);
    console.log(`${path.relative(SRC, f)}  ->  ${base}.webp (${big} KB), ${base}-800.webp (${small} KB)`);

    if (KEEP.includes(path.basename(f).toLowerCase())) {
      console.log('   (original rakha gaya)');
      continue;
    }

    const dest = path.join(BACKUP, path.relative('src', f));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      fs.renameSync(f, dest);
    } catch (e) {
      try {
        fs.copyFileSync(f, dest);
        fs.unlinkSync(f);
      } catch (e2) {
        skipped.push(f);
        console.log('   SKIPPED (locked):', f);
      }
    }
  }

  console.log('Done. Originals are in', BACKUP);
  if (skipped.length) {
    console.log('\nYe files locked thi, haath se hata dena:');
    skipped.forEach(s => console.log(' -', s));
  }
})();
