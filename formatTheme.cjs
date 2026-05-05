const fs = require('fs');

let content = fs.readFileSync('src/theme.css', 'utf-8');

const extractedVars = [
  '--primary', '--primary-dark', '--primary-bright', '--crimson-deep', 
  '--gold', '--gold-bright', '--bg', '--surface', '--text', '--muted', 
  '--on-primary', '--on-gold', '--footer-strip-bg', '--mobile-nav-bg',
  '--header-auth-panel-bg', '--header-auth-chip-bg', '--header-auth-target-bg', 
  '--header-auth-wallet-ddl-bg', '--header-auth-logout-color', '--header-auth-balance-amount',
  '--sidebar-bg', '--sidebar-item-bg', '--sidebar-daily-bg', '--sidebar-spin-bg', 
  '--sidebar-download-bg', '--game-rtp-badge-bg', '--game-rtp-badge-neon', 
  '--announcement-bg', '--non-active-bg'
];

const gradientExtracts = {
  '--header-gradient': 'linear-gradient(90deg, #2C0308 0%, #40080F 24%, #581717 48%, #8E1515 78%, #D81E2F 100%)'
};

content = content.replace(/--header-gradient:\s*linear-gradient\([\s\S]*?100%\);/, '');

let varValues = {};
let varComments = {};

const lines = content.split('\n');
let newLines = [];
let lastComment = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  if (trimmed.startsWith('/*') && trimmed.endsWith('*/')) {
    lastComment.push(trimmed);
    continue; // Skip adding to newLines directly, we accumulate it
  } else if (trimmed === '') {
    newLines.push(line);
    continue;
  }

  let matched = false;
  for (let v of extractedVars) {
    if (trimmed.startsWith(v + ':') || trimmed.startsWith(v + ' :')) {
      let val = trimmed.substring(trimmed.indexOf(':') + 1).replace(/;$/, '').trim();
      let inlineComment = '';
      if (val.includes('/*')) {
         inlineComment = val.substring(val.indexOf('/*')).trim();
         val = val.substring(0, val.indexOf('/*')).trim();
      }
      varValues[v] = val;
      
      if (lastComment.length > 0) {
        varComments[v] = lastComment.join('\n    ');
      } else if (inlineComment) {
        varComments[v] = inlineComment;
      }
      
      matched = true;
      lastComment = [];
      break;
    }
  }

  if (!matched) {
    if (lastComment.length > 0) {
      newLines.push(...lastComment.map(c => '    ' + c));
      lastComment = [];
    }
    newLines.push(line);
  }
}

// Ensure remaining comments are pushed
if (lastComment.length > 0) {
  newLines.push(...lastComment.map(c => '    ' + c));
}

let topBlock = ':root {\n';
topBlock += '    /* ============================================================\n';
topBlock += '       1. BRAND PALETTE (Core Colors - Edit these for new sites)\n';
topBlock += '       ============================================================ */\n';

const brand = ['--primary', '--primary-dark', '--primary-bright', '--crimson-deep', '--gold', '--gold-bright', '--bg', '--surface', '--text', '--muted', '--on-primary', '--on-gold', '--footer-strip-bg', '--mobile-nav-bg'];
for (let v of brand) {
  if (varValues[v]) {
    if (varComments[v]) topBlock += '    ' + varComments[v] + '\n';
    else if (v === '--primary') topBlock += '    /* primary red */\n';
    topBlock += '    ' + v + ': ' + varValues[v] + ';\n';
  }
}

topBlock += '\n    /* ============================================================\n';
topBlock += '       2. COMPONENT SPECIFIC COLORS (Also edit these if needed)\n';
topBlock += '       ============================================================ */\n';
topBlock += '    /* Header — dark red-black → bright crimson (matches Figma 5-stop gradient) */\n';
topBlock += '    --header-gradient: ' + gradientExtracts['--header-gradient'] + ';\n';

const comps = ['--header-auth-panel-bg', '--header-auth-chip-bg', '--header-auth-target-bg', '--header-auth-wallet-ddl-bg', '--header-auth-logout-color', '--header-auth-balance-amount', '--sidebar-bg', '--sidebar-item-bg', '--sidebar-daily-bg', '--sidebar-spin-bg', '--sidebar-download-bg', '--game-rtp-badge-bg', '--game-rtp-badge-neon', '--announcement-bg', '--non-active-bg'];
for (let v of comps) {
  if (varValues[v]) {
    if (varComments[v]) topBlock += '    ' + varComments[v] + '\n';
    else if (v === '--sidebar-bg') topBlock += '    /* Sidebar */\n';
    else if (v === '--header-auth-panel-bg') topBlock += '    /* Logged-in header controls (match dark panel + orange actions) */\n';
    topBlock += '    ' + v + ': ' + varValues[v] + ';\n';
  }
}

topBlock += '\n    /* ============================================================\n';
topBlock += '       3. SEMANTIC TOKENS (Do Not Edit - These auto-update)\n';
topBlock += '       ============================================================ */\n';

let finalString = newLines.join('\n');
const insertPos = finalString.indexOf(':root {');
if (insertPos !== -1) {
  finalString = finalString.substring(0, insertPos) + topBlock + finalString.substring(insertPos + 7);
}

fs.writeFileSync('src/theme.css', finalString);
console.log('Done!');
