const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'tiles.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Alban_chambon%2C_decorazione_in_marmo_e_ceramica%2C_dal_castello_reale_delle_ardenne%2C_houyet%2C_1905_ca._02.jpg' },
    { name: 'washbasin.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Luxury_sink.jpg' },
    { name: 'shower.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Clawfoot_bathtub.jpg' }
];

const targetDir = path.join(__dirname, 'public', 'images', 'bathroom-cleaning');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        };
        https.get(url, options, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
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
            await new Promise(r => setTimeout(r, 2000)); // Sleep 2s
        } catch (err) {
            console.error(`Error downloading ${img.name}:`, err);
        }
    }
}

main();
