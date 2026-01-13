const fs = require('fs');
const path = require('path');

const adListPath = path.join(__dirname, '../adlist.txt');
const rulesPath = path.join(__dirname, '../rules.json');

function buildRules() {
    try {
        const adList = fs.readFileSync(adListPath, 'utf-8');
        const lines = adList.split(/\r?\n/);
        const rules = [];
        let id = 1;

        const MAX_RULES = 2000; // Chrome MV3 static rule limit is huge, but we limit for MVP performance

        for (let line of lines) {
            if (rules.length >= MAX_RULES) break;

            line = line.trim();

            // Filter out comments, metadata, cosmetic filters (##), and exceptions (@@)
            if (!line ||
                line.startsWith('!') ||
                line.startsWith('[') ||
                line.includes('##') ||
                line.startsWith('@@')) {
                continue;
            }

            // For this MVP, we strictly look for simple domain blocking rules: ||example.com^
            // This ensures high compatibility with declarativeNetRequest 'urlFilter' without complex parsing
            if (!line.startsWith('||') || !line.endsWith('^')) {
                continue;
            }

            // Check for unsupported options (lines with $)
            if (line.includes('$')) {
                // If it has options, we skip for MVP unless we write a parser for options
                continue;
            }

            const rule = {
                id: id++,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: line, // ||example.com^ is valid in MV3
                    resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "main_frame"]
                }
            };
            rules.push(rule);
        }

        fs.writeFileSync(rulesPath, JSON.stringify(rules, null, 2));
        console.log(`Successfully generated ${rules.length} rules.`);
    } catch (error) {
        console.error('Error building rules:', error);
    }
}

buildRules();
