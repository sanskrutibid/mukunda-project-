const fs = require('fs');
const sharp = require('sharp');
sharp.cache(false);

const D = 'src/assets/images/image/';
const MAP = {
  'home.jpg': 'carousel-3.jpg',
  'blog.jpg': 'blog.jpg',
  'karmabhumi.jpg': 'karma2.PNG',
  'ayodhya.jpg': 'ayodhya.jpeg',
  'vraj.jpg': 'vraj.jpg',
  'dwarka.jpg': 'dwarka.jpg',
  'keshavam-city-9.jpg': 'Keshavam-City-9.jpg',
  'keshavam-city-10.jpg': 'keshavam-city-10.jpg'
};

fs.mkdirSync('src/assets/og', { recursive: true });

(async () => {
  for (const [out, src] of Object.entries(MAP)) {
    if (!fs.existsSync(D + src)) { console.log('MISSING:', src); continue; }
    const input = fs.readFileSync(D + src);
    let q = 82, buf;
    do {
      buf = await sharp(input).rotate()
        .resize(1200, 630, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: q, mozjpeg: true }).toBuffer();
      q -= 6;
    } while (buf.length > 280 * 1024 && q >= 40);
    fs.writeFileSync('src/assets/og/' + out, buf);
    console.log(out, Math.round(buf.length / 1024) + ' KB');
  }
})();
