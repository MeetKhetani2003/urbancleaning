const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = 'c:\\Users\\meetk\\OneDrive\\Desktop\\Projects\\15-08-2026 to 15-08-2026\\MKDigital\\2000 projects\\premium-education-board-ui (1)\\public\\images';

const images = [
    { path: 'services/bathroom-cleaning.jpg', query: 'bathroom,cleaning' },
    { path: 'services/kitchen-cleaning.jpg', query: 'kitchen,cleaning' },
    { path: 'services/full-home-cleaning.jpg', query: 'home,cleaning' },
    { path: 'services/sofa-cleaning.jpg', query: 'sofa,cleaning' },
    { path: 'services/mattress-cleaning.jpg', query: 'mattress,cleaning' },
    { path: 'services/office-cleaning.jpg', query: 'office,cleaning' },
    { path: 'services/meeting-room-cleaning.jpg', query: 'meeting,room,cleaning' },
    { path: 'services/outdoor-cleaning.jpg', query: 'outdoor,cleaning' },
    { path: 'hero/cleaning-team.jpg', query: 'cleaning,team' },
    { path: 'hero/clean-home.jpg', query: 'clean,home' },
    { path: 'logo/urban-shine-logo.png', query: 'logo,cleaning,shining' },
    { path: 'packages/2bhk-cleaning.jpg', query: 'apartment,living,room' },
    { path: 'packages/3bhk-cleaning.jpg', query: 'apartment,living,room,spacious' },
    { path: 'packages/4bhk-cleaning.jpg', query: 'luxury,apartment,interior' }
];

async function downloadImage(filepath, query) {
    const fullPath = path.join(targetDir, filepath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const url = `https://loremflickr.com/800/600/${query}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(fullPath, Buffer.from(buffer));
}

async function main() {
    console.log(`Starting downloads to ${targetDir}...`);
    for (const img of images) {
        console.log(`Downloading ${img.path}...`);
        try {
            await downloadImage(img.path, img.query);
            console.log(`Successfully downloaded ${img.path}`);
        } catch (error) {
            console.error(`Failed to download ${img.path}:`, error.message);
        }
    }
    console.log('All downloads completed!');
}

main();
