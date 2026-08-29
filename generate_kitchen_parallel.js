const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'kitchen-cleaning');

const prompts = [
    { name: 'cabinets.jpg', prompt: 'Close up of beautiful, clean modern kitchen cabinet exteriors, wooden texture, professional photography, no people' },
    { name: 'sink.jpg', prompt: 'Close up of a sparkling clean stainless steel kitchen sink and faucet, professional photography, no people' },
    { name: 'tiles.jpg', prompt: 'Close up of spotless, clean modern kitchen wall tiles backsplash, professional photography, no people' },
    { name: 'surfaces.jpg', prompt: 'Wide shot of a completely spotless, premium modern kitchen interior showing all clean surfaces, professional photography, no people' }
];

function download(item) {
    const encodedPrompt = encodeURIComponent(item.prompt);
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&seed=${seed}`;
    const dest = path.join(targetDir, item.name);
    
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
        
        https.get(url, options, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                https.get(response.headers.location, options, (res2) => {
                     res2.pipe(file);
                     file.on('finish', () => file.close(resolve));
                }).on('error', reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed ${item.name}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    console.log('Starting parallel downloads...');
    await Promise.all(prompts.map(item => download(item)));
    console.log('All done!');
}

main();
