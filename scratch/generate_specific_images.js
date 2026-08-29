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

const imagesToGenerate = [
    { name: "balcony-cleaning", prompt: "A dirty apartment balcony floor and metal railings being cleaned with a mop and bucket by a professional cleaner in a blue uniform, bright daylight, realistic professional photography" },
    { name: "gas-stove-cleaning", prompt: "A close-up of a stainless steel gas stove in a kitchen being wiped and cleaned with a sponge and cleaning spray, realistic professional photography" },
    { name: "exhaust-fan-cleaning", prompt: "A close up of a dirty kitchen exhaust fan mounted on a wall being cleaned by a gloved hand with a microfiber cloth, realistic professional photography" },
    { name: "ceiling-fan-cleaning", prompt: "A close up of a dusty wooden ceiling fan in a living room being cleaned with an extendable long duster, bright daylight, realistic professional photography" },
    { name: "window-cleaning", prompt: "A professional cleaner in a blue uniform using a squeegee to wash large glass sliding doors in a modern home, bright daylight, realistic professional photography" },
    { name: "garden-cleaning", prompt: "A professional cleaner sweeping a stone patio in an outdoor garden area surrounded by green plants, bright daylight, realistic professional photography" },
    { name: "appliance-cleaning", prompt: "A close-up of a stainless steel refrigerator and microwave in a modern kitchen being wiped down with a microfiber cloth by a professional, realistic professional photography" }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    const targetDir = path.join(__dirname, '../public/images/services');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const seed = 123456789; // Fixed seed for consistency

    for (let i = 0; i < imagesToGenerate.length; i++) {
        const item = imagesToGenerate[i];
        const filepath = path.join(targetDir, `${item.name}.jpg`);
        try {
            await generateImage(item.prompt, seed, filepath);
            if (i < imagesToGenerate.length - 1) {
                console.log("Waiting 10 seconds before next request...");
                await sleep(10000);
            }
        } catch (e) {
            console.error("Error:", e);
        }
    }
    console.log("Done generating 7 images.");
}

main();
