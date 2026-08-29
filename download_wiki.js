const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'tiles.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ceramic_tiles_04.jpg/800px-Ceramic_tiles_04.jpg' },
    { name: 'washbasin.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Luxury_sink.jpg' },
    { name: 'toilet.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Toilet_photo.jpg' },
    { name: 'shower.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Shower_Cabin.jpg/800px-Shower_Cabin.jpg' },
    { name: 'fixtures.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Wasserhahn.jpg' }
];

const targetDir = path.join(__dirname, 'public', 'images', 'bathroom-cleaning');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'NodeJS/14.0' } }, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    for (const img of images) {
        try {
            console.log(`Downloading ${img.name}...`);
            await download(img.url, path.join(targetDir, img.name));
            console.log(`Success: ${img.name}`);
            await new Promise(r => setTimeout(r, 1000)); // Sleep 1s to avoid 429
        } catch (err) {
            console.error(`Error downloading ${img.name}:`, err);
        }
    }
}

main();
