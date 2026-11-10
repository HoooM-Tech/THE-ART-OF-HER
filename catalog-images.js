const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'peimage');
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));
files.sort();

console.log(`Found ${files.length} images.`);

// Fast image size parser without external heavy libraries
function getJpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  return { width: 1200, height: 1600 }; // fallback
}

const manifest = [];
files.forEach((file, index) => {
  const srcPath = path.join(srcDir, file);
  const targetName = `photo-${String(index + 1).padStart(2, '0')}.jpg`;
  const destPathNumbered = path.join(destDir, targetName);
  const destPathOriginal = path.join(destDir, file);

  const buf = fs.readFileSync(srcPath);
  fs.writeFileSync(destPathNumbered, buf);
  fs.writeFileSync(destPathOriginal, buf);

  let size = { width: 1200, height: 1600 };
  try {
    size = getJpegSize(buf);
  } catch (e) {
    console.error('Error getting size for', file, e);
  }

  const orientation = size.width > size.height ? 'landscape' : (size.height > size.width ? 'portrait' : 'square');
  const aspect = +(size.width / size.height).toFixed(2);

  manifest.push({
    index: index + 1,
    id: `photo-${String(index + 1).padStart(2, '0')}`,
    name: targetName,
    src: `/images/${targetName}`,
    original: file,
    width: size.width,
    height: size.height,
    aspect,
    orientation
  });
});

fs.writeFileSync(path.join(destDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Images cataloged successfully:', manifest.length);
manifest.forEach(m => console.log(`${m.id}: ${m.width}x${m.height} (${m.orientation})`));

