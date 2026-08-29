const fs = require('fs');
const https = require('https');
const path = require('path');

const generateImage = (prompt, seed, filepath) => {
    return new Promise((resolve, reject) => {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=800&height=500&nologo=true`;
        console.log(`Generating image for prompt: "${prompt}" -> ${filepath}`);
        
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed with status code: ${res.statusCode}`));
                return;
            }
            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Saved ${filepath}`);
                resolve(filepath);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

async function main() {
    const targetDir = path.join(__dirname, '../public/images/services');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const seed = Math.floor(Math.random() * 1000000); // Random seed for a fresh image
    const prompt = "A sparkling clean modern apartment balcony with a fresh tiled floor, glass railings, and a small potted plant, bright sunny daylight, beautiful architectural photography, no people";
    const filepath = path.join(targetDir, `balcony-cleaning-v3.jpg`);
    
    try {
        await generateImage(prompt, seed, filepath);
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
