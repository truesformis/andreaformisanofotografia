const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const inputDir  = path.join(__dirname, 'images/full');
const outputDir = path.join(__dirname, 'images/thumbs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.readdirSync(inputDir).forEach(file => {
  sharp(path.join(inputDir, file))
    .resize({ width: 400 })
    .jpeg({ quality: 60 })
    .toFile(path.join(outputDir, file), err => {
      if (err) console.error(err);
      else console.log(`Thumb creato: ${file}`);
    });
});
