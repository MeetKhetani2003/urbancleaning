const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'kitchen-cleaning');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const prompts = [
    { name: 'countertops.jpg', prompt: 'Close up of a spotless, sparkling clean modern kitchen marble countertop, professional photography, natural lighting, no people' },
    { name: 'cooktop.jpg', prompt: 'Close up of a sparkling clean modern gas cooktop stove in a premium kitchen, professional photography, no people' },
    { name: 'cabinets.jpg', prompt: 'Close up of beautiful, clean modern kitchen cabinet exteriors, wooden texture, professional photography, no people' },
    { name: 'sink.jpg', prompt: 'Close up of a sparkling clean stainless steel kitchen sink and faucet, professional photography, no people' },
    { name: 'tiles.jpg', prompt: 'Close up of spotless, clean modern kitchen wall tiles backsplash, professional photography, no people' },
    { name: 'surfaces.jpg', prompt: 'Wide shot of a completely spotless, premium modern kitchen interior showing all clean surfaces, professional photography, no people' }
];

function download(promptStr, dest) {
    const encodedPrompt = encodeURIComponent(promptStr);
    // Add a random seed to avoid caching
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&seed=${seed}`;
    
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };
        https.get(url, options, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // follow redirect
                https.get(response.headers.location, options, (res2) => {
                     res2.pipe(file);
                     file.on('finish', () => file.close(resolve));
                }).on('error', reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get image (${response.statusCode})`));
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
    for (const item of prompts) {
        try {
            console.log(`Generating ${item.name}...`);
            await download(item.prompt, path.join(targetDir, item.name));
            console.log(`Success: ${item.name}`);
        } catch (err) {
            console.error(`Error generating ${item.name}:`, err);
        }
    }
}

main();
