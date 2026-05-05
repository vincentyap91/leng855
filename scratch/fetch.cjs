const fs = require('fs');
(async () => {
  try {
    const res = await fetch('https://staging.riocity9.com/en', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const html = await res.text();
    console.log("HTML length:", html.length);
    
    // Find all CSS links
    const linkMatches = html.matchAll(/<link[^>]*rel=[\"']stylesheet[\"'][^>]*href=[\"']([^\"']+)[\"'][^>]*>/g);
    for (const match of linkMatches) {
        console.log("Found CSS URL:", match[1]);
        if (match[1].includes('theme')) {
            const cssUrl = match[1].startsWith('http') ? match[1] : new URL(match[1], 'https://staging.riocity9.com').href;
            console.log("Fetching theme CSS:", cssUrl);
            const cssRes = await fetch(cssUrl);
            const cssText = await cssRes.text();
            fs.writeFileSync('c:\\Users\\Vincent\\OneDrive\\Desktop\\leng855\\scratch\\riocity_theme.css', cssText);
            console.log("Saved to scratch/riocity_theme.css. Length:", cssText.length);
        }
    }
  } catch (err) {
    console.error("Error:", err);
  }
})();
