import fs from 'fs';

let content = fs.readFileSync('lib/data/skills.ts', 'utf8');

// For Reading Passages
content = content.replace(/id: 1,/, "id: 1,\n    level: 'beginner',");
content = content.replace(/id: 2,/, "id: 2,\n    level: 'intermediate',");
content = content.replace(/id: 3,/, "id: 3,\n    level: 'advanced',");
content = content.replace(/id: 4,/, "id: 4,\n    level: 'intermediate',");
content = content.replace(/id: 5,/, "id: 5,\n    level: 'advanced',");

// For Listening Exercises
content = content.replace(/id: 11,/, "id: 11,\n    level: 'beginner',");
content = content.replace(/id: 12,/, "id: 12,\n    level: 'intermediate',");
content = content.replace(/id: 13,/, "id: 13,\n    level: 'advanced',");

// For Speaking Topics
content = content.replace(/id: 21,/, "id: 21,\n    level: 'beginner',");
content = content.replace(/id: 22,/, "id: 22,\n    level: 'intermediate',");
content = content.replace(/id: 23,/, "id: 23,\n    level: 'advanced',");
content = content.replace(/id: 24,/, "id: 24,\n    level: 'intermediate',");

// For Writing Prompts
content = content.replace(/id: 31,/, "id: 31,\n    level: 'beginner',");
content = content.replace(/id: 32,/, "id: 32,\n    level: 'intermediate',");
content = content.replace(/id: 33,/, "id: 33,\n    level: 'advanced',");

fs.writeFileSync('lib/data/skills.ts', content);
console.log('Skills levels updated!');
