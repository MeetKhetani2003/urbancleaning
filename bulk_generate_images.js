const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'images');

const queues = [
    {
        dir: 'bathroom-cleaning',
        items: [
            { name: 'washbasin.jpg', prompt: 'Close up of a sparkling clean modern bathroom washbasin and faucet, highly detailed, photorealistic, luxury hotel style, no people' },
            { name: 'tiles.jpg', prompt: 'Close up of spotless clean modern bathroom wall tiles, glossy finish, photorealistic, luxury hotel style, no people' },
            { name: 'fixtures.jpg', prompt: 'Close up of sparkling clean chrome bathroom fixtures and showerhead, gleaming, photorealistic, luxury hotel style, no people' }
        ]
    },
    {
        dir: 'kitchen-cleaning',
        items: [
            { name: 'cabinets.jpg', prompt: 'Close up of beautiful, spotless clean modern kitchen cabinet exteriors, wooden texture, photorealistic, no people' },
            { name: 'wall_tiles.jpg', prompt: 'Close up of spotless clean modern kitchen wall tiles backsplash, glossy, photorealistic, no people' },
            { name: 'surfaces.jpg', prompt: 'Wide shot of a completely spotless, premium modern kitchen interior showing all clean surfaces, photorealistic, no people' },
            { name: 'countertops.jpg', prompt: 'Close up of a spotless, sparkling clean modern kitchen marble countertop, professional photography, natural lighting, no people' },
            { name: 'cooktop.jpg', prompt: 'Close up of a sparkling clean modern gas cooktop stove in a premium kitchen, professional photography, no people' }
        ]
    },
    {
        dir: 'sofa-cleaning',
        items: [
            { name: 'seat_cushions.jpg', prompt: 'Close up of fresh, deeply cleaned fabric sofa seat cushions, spotless, soft lighting, photorealistic, no people' },
            { name: 'back_cushions.jpg', prompt: 'Close up of plump, freshly cleaned sofa back cushions, spotless upholstery, photorealistic, no people' },
            { name: 'armrests.jpg', prompt: 'Close up of a spotless clean sofa armrest, premium fabric texture, photorealistic, no people' },
            { name: 'fabric_surfaces.jpg', prompt: 'Close up macro shot of clean, fresh sofa fabric upholstery texture, photorealistic, no people' },
            { name: 'crevices.jpg', prompt: 'Close up of deeply cleaned crevices between sofa cushions, spotless, photorealistic, no people' },
            { name: 'frame.jpg', prompt: 'Close up of a polished wooden base frame of a modern sofa, completely dust-free, photorealistic, no people' }
        ]
    },
    {
        dir: 'mattress-cleaning',
        items: [
            { name: 'top_surface.jpg', prompt: 'Close up of a deeply cleaned, bright white mattress top surface, fresh and hygienic, photorealistic, no people' },
            { name: 'side_panels.jpg', prompt: 'Close up of spotless clean mattress side panels, premium fabric, photorealistic, no people' },
            { name: 'stitched_edges.jpg', prompt: 'Close up of the stitched edges of a fresh, clean premium mattress, highly detailed, photorealistic, no people' },
            { name: 'contact_areas.jpg', prompt: 'Close up of a clean mattress resting on a spotless bed frame, hygienic, photorealistic, no people' },
            { name: 'visible_marks.jpg', prompt: 'Close up of a perfectly spotless white mattress fabric with no stains or marks, photorealistic, no people' },
            { name: 'corners.jpg', prompt: 'Close up of a deeply cleaned, crisp corner of a modern mattress, photorealistic, no people' }
        ]
    },
    {
        dir: 'office-cleaning',
        items: [
            { name: 'workstations.jpg', prompt: 'Close up of a perfectly clean and organized modern office desk workstation, spotless, photorealistic, no people' },
            { name: 'shared_desks.jpg', prompt: 'Wide shot of a spotless clean shared coworking desk space, hygienic, photorealistic, no people' },
            { name: 'common_areas.jpg', prompt: 'Wide shot of a deeply cleaned modern corporate office common area, pristine, photorealistic, no people' },
            { name: 'reception.jpg', prompt: 'Wide shot of a spotless, welcoming corporate office reception desk area, luxury, photorealistic, no people' },
            { name: 'meeting_spaces.jpg', prompt: 'Wide shot of a pristine, freshly cleaned modern office meeting room, photorealistic, no people' },
            { name: 'accessible_surfaces.jpg', prompt: 'Close up of a dust-free, shiny modern office table surface, photorealistic, no people' }
        ]
    },
    {
        dir: 'meeting-room-cleaning',
        items: [
            { name: 'meeting_tables.jpg', prompt: 'Close up of a spotless, highly polished meeting room conference table, photorealistic, no people' },
            { name: 'seating.jpg', prompt: 'Close up of clean, fresh ergonomic meeting room office chairs, spotless, photorealistic, no people' },
            { name: 'whiteboards.jpg', prompt: 'Close up of a perfectly wiped clean, blank office whiteboard, spotless, photorealistic, no people' },
            { name: 'glass_surfaces.jpg', prompt: 'Close up of sparkling clean, streak-free glass partition walls in a modern meeting room, photorealistic, no people' },
            { name: 'presentation_areas.jpg', prompt: 'Close up of a dust-free presentation screen and equipment area in a meeting room, photorealistic, no people' },
            { name: 'entry_touchpoints.jpg', prompt: 'Close up of a polished, sanitized meeting room door handle and frame, hygienic, photorealistic, no people' }
        ]
    },
    {
        dir: 'balcony-cleaning',
        items: [
            { name: 'balcony_floor.jpg', prompt: 'Close up of a deeply washed and clean outdoor balcony tile floor, spotless, photorealistic, no people' },
            { name: 'railings.jpg', prompt: 'Close up of polished, dust-free metal balcony railings, photorealistic, no people' },
            { name: 'glass_panels.jpg', prompt: 'Close up of streak-free, sparkling clean balcony glass safety panels overlooking a view, photorealistic, no people' },
            { name: 'corners.jpg', prompt: 'Close up of a perfectly swept and clean corner of an outdoor balcony, photorealistic, no people' },
            { name: 'planter_exteriors.jpg', prompt: 'Close up of clean, wiped outdoor balcony planter pots, photorealistic, no people' },
            { name: 'accessible_ledges.jpg', prompt: 'Close up of a dust-free, clean outdoor balcony ledge, photorealistic, no people' }
        ]
    },
    {
        dir: 'gas-stove-cleaning',
        items: [
            { name: 'stove_top.jpg', prompt: 'Close up of a completely grease-free, sparkling clean gas stove top, photorealistic, no people' },
            { name: 'burner_surroundings.jpg', prompt: 'Close up of spotless clean gas stove burners and metal grates, highly detailed, photorealistic, no people' },
            { name: 'knobs.jpg', prompt: 'Close up of perfectly degreased, shiny gas stove control knobs, photorealistic, no people' },
            { name: 'drip_area.jpg', prompt: 'Close up of the spotless metal drip area underneath gas stove burners, photorealistic, no people' },
            { name: 'nearby_counter.jpg', prompt: 'Close up of a clean kitchen counter immediately next to a gas stove, spotless, photorealistic, no people' },
            { name: 'crevices.jpg', prompt: 'Close up of perfectly degreased crevices on a modern kitchen gas stove, photorealistic, no people' }
        ]
    },
    {
        dir: 'exhaust-fan-cleaning',
        items: [
            { name: 'outer_cover.jpg', prompt: 'Close up of a completely degreased and clean kitchen exhaust fan outer cover, spotless plastic, photorealistic, no people' },
            { name: 'grill.jpg', prompt: 'Close up of the clean, dust-free front grill of an exhaust fan, photorealistic, no people' },
            { name: 'surrounding_wall.jpg', prompt: 'Close up of clean, grease-free kitchen wall tiles surrounding an exhaust fan, photorealistic, no people' },
            { name: 'blades.jpg', prompt: 'Close up of deeply cleaned, grease-free exhaust fan blades inside the housing, photorealistic, no people' },
            { name: 'switch_plate.jpg', prompt: 'Close up of a perfectly sanitized, clean electrical switch plate on a wall, photorealistic, no people' },
            { name: 'nearby_surfaces.jpg', prompt: 'Close up of clean upper kitchen cabinets near an exhaust fan, photorealistic, no people' }
        ]
    },
    {
        dir: 'ceiling-fan-cleaning',
        items: [
            { name: 'blade_surfaces.jpg', prompt: 'Close up of completely dust-free, wiped clean ceiling fan blades, photorealistic, no people' },
            { name: 'motor_housing.jpg', prompt: 'Close up of a spotless, polished motor housing of a modern ceiling fan, photorealistic, no people' },
            { name: 'canopy.jpg', prompt: 'Close up of a clean, dust-free ceiling fan canopy attached to the ceiling, photorealistic, no people' },
            { name: 'pull_chain.jpg', prompt: 'Close up of a shiny, clean ceiling fan pull chain and switch, photorealistic, no people' },
            { name: 'ceiling_area.jpg', prompt: 'Close up of a spotless white ceiling immediately above a ceiling fan, photorealistic, no people' },
            { name: 'fittings.jpg', prompt: 'Close up of clean, polished metal fittings on a modern ceiling fan, photorealistic, no people' }
        ]
    },
    {
        dir: 'window-cleaning',
        items: [
            { name: 'glass_panels.jpg', prompt: 'Close up of sparkling clean, completely streak-free window glass letting in sunlight, photorealistic, no people' },
            { name: 'window_frames.jpg', prompt: 'Close up of spotless, wiped clean white window frames, photorealistic, no people' },
            { name: 'slider_frames.jpg', prompt: 'Close up of a clean, dust-free sliding glass door metal frame, photorealistic, no people' },
            { name: 'tracks.jpg', prompt: 'Close up of deeply vacuumed and wiped window slider tracks, completely free of dirt, photorealistic, no people' },
            { name: 'handles.jpg', prompt: 'Close up of a polished, sanitized window latch and handle, photorealistic, no people' },
            { name: 'sills.jpg', prompt: 'Close up of a perfectly wiped and dust-free interior window sill, photorealistic, no people' }
        ]
    },
    {
        dir: 'garden-cleaning',
        items: [
            { name: 'pathways.jpg', prompt: 'Close up of a swept, deeply cleaned outdoor garden stone pathway, tidy, photorealistic, no people' },
            { name: 'planter_exteriors.jpg', prompt: 'Close up of wiped down, clean outdoor garden planters, tidy landscaping, photorealistic, no people' },
            { name: 'outdoor_seating.jpg', prompt: 'Close up of washed and clean outdoor patio garden seating furniture, pristine, photorealistic, no people' },
            { name: 'visible_edges.jpg', prompt: 'Close up of neatly trimmed and swept garden lawn edges next to concrete, photorealistic, no people' },
            { name: 'accessible_surfaces.jpg', prompt: 'Close up of a clean outdoor garden table surface, spotless, photorealistic, no people' },
            { name: 'entry_areas.jpg', prompt: 'Wide shot of a swept and tidy outdoor garden entry area, welcoming, photorealistic, no people' }
        ]
    },
    {
        dir: 'appliance-cleaning',
        items: [
            { name: 'appliance_exteriors.jpg', prompt: 'Close up of a sparkling clean, polished stainless steel refrigerator exterior, streak-free, photorealistic, no people' },
            { name: 'control_panels.jpg', prompt: 'Close up of a perfectly wiped, sanitized kitchen oven digital control panel, photorealistic, no people' },
            { name: 'handles.jpg', prompt: 'Close up of a polished, sanitized metal appliance door handle, photorealistic, no people' },
            { name: 'surrounding_counters.jpg', prompt: 'Close up of a spotless kitchen counter immediately next to a major appliance, photorealistic, no people' },
            { name: 'visible_vents.jpg', prompt: 'Close up of a deeply cleaned, dust-free ventilation grill on a kitchen appliance, photorealistic, no people' },
            { name: 'accessible_spaces.jpg', prompt: 'Close up of a swept and mopped clean floor space right underneath a kitchen appliance, photorealistic, no people' }
        ]
    }
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
    let successCount = 0;
    let failCount = 0;

    for (const queue of queues) {
        const dirPath = path.join(baseDir, queue.dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        for (const item of queue.items) {
            const dest = path.join(dirPath, item.name);
            if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
                console.log(`Skipping ${queue.dir}/${item.name}, already exists.`);
                continue;
            }

            console.log(`Generating ${queue.dir}/${item.name}...`);
            const encodedPrompt = encodeURIComponent(item.prompt);
            const seed = Math.floor(Math.random() * 100000);
            const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&seed=${seed}`;
            
            let attempts = 0;
            let success = false;
            
            while (attempts < 3 && !success) {
                try {
                    await download(url, dest);
                    const stats = fs.statSync(dest);
                    if (stats.size < 1000) throw new Error('File too small, likely a 429 page.');
                    
                    console.log(`  -> Success!`);
                    success = true;
                    successCount++;
                } catch(e) {
                    attempts++;
                    console.error(`  -> Attempt ${attempts} failed: ${e.message}`);
                    if (fs.existsSync(dest)) fs.unlinkSync(dest);
                    if (attempts < 3) {
                        console.log(`  -> Waiting 10s before retry...`);
                        await new Promise(r => setTimeout(r, 10000));
                    }
                }
            }
            
            if (!success) {
                console.error(`  -> GAVE UP on ${queue.dir}/${item.name}`);
                failCount++;
            }

            // 15-second delay to avoid 429
            await new Promise(r => setTimeout(r, 15000));
        }
    }
    console.log(`\nDONE! Successful: ${successCount}, Failed: ${failCount}`);
}

main();
