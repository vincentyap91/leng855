const fs = require('fs');

let content = fs.readFileSync('src/theme.css', 'utf-8');

// Parse all variables from the entire file
const allVarsRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
let allVars = {};
let m;
while ((m = allVarsRegex.exec(content)) !== null) {
  const name = m[1].trim();
  const value = m[2].trim();
  allVars[name] = value;
}

// Function to deeply resolve a var
function resolveVar(val) {
  const varRegex = /var\((--[\w-]+)\)/g;
  let resolved = val;
  let matches;
  let loopCount = 0;
  while ((matches = varRegex.exec(resolved)) !== null && loopCount < 10) {
    const varName = matches[1];
    if (allVars[varName]) {
      // If the target var itself is a var(), we need to resolve it first
      // Actually the loop will handle it because we replace and then regex again on the new string
      resolved = resolved.replace(matches[0], allVars[varName]);
      varRegex.lastIndex = 0;
    } else {
      break; 
    }
    loopCount++;
  }
  return resolved;
}

// We want to replace var(...) inside the file content.
// Instead of replacing specific variable declarations, we can just replace every `var(--xxx)` in the file with its resolved value!
// But wait! If we replace EVERY `var(--xxx)`, we completely remove the `var()` syntax!
// Let's do exactly that, but only inside property values.
// Actually, it's safer to just iterate line by line.

let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('var(--')) {
    // Find all var(--...) in this line
    const varRegex = /var\((--[\w-]+)\)/g;
    let newLine = line;
    let matches;
    while ((matches = varRegex.exec(newLine)) !== null) {
      const varName = matches[1];
      if (allVars[varName]) {
        // Resolve it fully
        const resolvedVal = resolveVar(allVars[varName]);
        newLine = newLine.replace(matches[0], resolvedVal);
        varRegex.lastIndex = 0; // reset
      } else {
        // Variable not found in root, just leave it (e.g., might be defined locally in a class)
      }
    }
    lines[i] = newLine;
  }
}

fs.writeFileSync('src/theme.css', lines.join('\n'));
console.log('Successfully flattened theme.css!');
