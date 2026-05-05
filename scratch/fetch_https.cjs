const https = require('https');
const fs = require('fs');

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const html = await fetch('https://staging.riocity9.com/en', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log("HTML length:", html.length);
    
    // Find all CSS links
    const linkMatches = html.matchAll(/<link[^>]*rel=[\"']stylesheet[\"'][^>]*href=[\"']([^\"']+)[\"'][^>]*>/g);
    for (const match of linkMatches) {
        console.log("Found CSS URL:", match[1]);
        if (match[1].includes('theme')) {
            const cssUrl = match[1].startsWith('http') ? match[1] : new URL(match[1], 'https://staging.riocity9.com').href;
            console.log("Fetching theme CSS:", cssUrl);
            const cssText = await fetch(cssUrl);
            fs.writeFileSync('c:\\Users\\Vincent\\OneDrive\\Desktop\\leng855\\scratch\\riocity_theme.css', cssText);
            console.log("Saved to scratch/riocity_theme.css. Length:", cssText.length);
        }
    }
  } catch (err) {
    console.error("Error:", err);
  }
})();
