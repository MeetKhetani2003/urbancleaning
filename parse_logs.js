const fs = require('fs');

const transcriptPath = 'C:\\Users\\meetk\\.gemini\\antigravity-ide\\brain\\5ebb49a3-1a63-4184-9b21-b77e67491644\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        
        // The output of execute_browser_javascript is usually in a TOOL_RESPONSE
        if (obj.type === 'TOOL_RESPONSE') {
            const content = typeof obj.content === 'string' ? obj.content : JSON.stringify(obj.content);
            if (content.includes('prices') && content.includes('description') && content.includes('title')) {
                console.log(content.substring(0, 1000));
            }
        }
    } catch (e) {
    }
}
