import fs from 'fs';

let content = fs.readFileSync('lib/data/skills.ts', 'utf8');

// Replace top-level items by looking for "id: [number],\n    cert:"
const replacements = {
  // Reading
  1: 'beginner',
  2: 'intermediate',
  3: 'advanced',
  4: 'intermediate',
  5: 'advanced',
  // Listening
  11: 'beginner',
  12: 'intermediate',
  13: 'advanced',
  // Speaking
  21: 'beginner',
  22: 'intermediate',
  23: 'advanced',
  24: 'intermediate',
  // Writing
  31: 'beginner',
  32: 'intermediate',
  33: 'advanced',
};

for (const [id, level] of Object.entries(replacements)) {
  const regex = new RegExp(`id: ${id},\\s+cert:`, 'g');
  content = content.replace(regex, `id: ${id},\n    level: '${level}',\n    cert:`);
}

fs.writeFileSync('lib/data/skills.ts', content);
console.log('Skills levels updated robustly!');
