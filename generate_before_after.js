const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'images', 'gallery');

const images = [
    { name: 'bathroom-before.jpg', prompt: 'Close up of a dirty, uncleaned bathroom sink and mirror with water stains and grime, photorealistic, no people' },
    { name: 'bathroom-after.jpg', prompt: 'Close up of a sparkling clean, spotless modern bathroom sink and mirror, hotel quality, photorealistic, no people' },
    
    { name: 'kitchen-before.jpg', prompt: 'Close up of a messy, dirty kitchen stove and countertop with grease and food stains, photorealistic, no people' },
    { name: 'kitchen-after.jpg', prompt: 'Close up of a sparkling clean, spotless kitchen stove and countertop, gleaming surfaces, photorealistic, no people' },
    
    { name: 'sofa-before.jpg', prompt: 'Close up of a fabric sofa with visible stains, dust, and dirt spots on the cushions, photorealistic, no people' },
    { name: 'sofa-after.jpg', prompt: 'Close up of a perfectly clean, fresh fabric sofa cushion with spotless upholstery, photorealistic, no people' },
    
    { name: 'window-before.jpg', prompt: 'Close up of a dirty glass window with smudges, dust, and water spots blocking the view, photorealistic, no people' },
    { name: 'window-after.jpg', prompt: 'Close up of a perfectly crystal clear, spotless glass window letting in bright sunlight, streak-free, photorealistic, no people' }
];

function download(url, dest) {
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
                reject(new Error(`Failed with status: ${response.statusCode}`));
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
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    for (const item of images) {
        const dest = path.join(baseDir, item.name);
        console.log(`Generating ${item.name}...`);
        
        // Use a fixed seed to ensure the style is consistent, but different enough between before/after?
        // Actually, for a true before/after, we want the EXACT same seed but different prompts! 
        // That will make Pollinations try to generate the exact same composition!
        let baseSeed;
        if (item.name.includes('bathroom')) baseSeed = 1001;
        if (item.name.includes('kitchen')) baseSeed = 1002;
        if (item.name.includes('sofa')) baseSeed = 1003;
        if (item.name.includes('window')) baseSeed = 1004;

        const encodedPrompt = encodeURIComponent(item.prompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&seed=${baseSeed}`;
        
        let success = false;
        let attempts = 0;
        
        while (attempts < 3 && !success) {
            try {
                await download(url, dest);
                const stats = fs.statSync(dest);
                if (stats.size < 1000) throw new Error('File too small, likely 429');
                console.log(`  -> Success!`);
                success = true;
            } catch (e) {
                attempts++;
                console.error(`  -> Failed: ${e.message}`);
                if (fs.existsSync(dest)) fs.unlinkSync(dest);
                await new Promise(r => setTimeout(r, 5000));
            }
        }
        
        await new Promise(r => setTimeout(r, 15000)); // Rate limit delay
    }
    console.log("All done!");
}

main();
