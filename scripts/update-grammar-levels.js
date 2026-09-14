import fs from 'fs';

let content = fs.readFileSync('lib/data/grammar.ts', 'utf8');

// Tenses
content = content.replace(/id: 1,/, "id: 1,\n    level: 'beginner',");
content = content.replace(/id: 2,/, "id: 2,\n    level: 'beginner',");
content = content.replace(/id: 3,/, "id: 3,\n    level: 'intermediate',");
content = content.replace(/id: 4,/, "id: 4,\n    level: 'advanced',");
content = content.replace(/id: 5,/, "id: 5,\n    level: 'beginner',");
content = content.replace(/id: 6,/, "id: 6,\n    level: 'intermediate',");
content = content.replace(/id: 7,/, "id: 7,\n    level: 'advanced',");
content = content.replace(/id: 8,/, "id: 8,\n    level: 'advanced',");
content = content.replace(/id: 9,/, "id: 9,\n    level: 'beginner',");
content = content.replace(/id: 10,/, "id: 10,\n    level: 'intermediate',");
content = content.replace(/id: 11,/, "id: 11,\n    level: 'advanced',");
content = content.replace(/id: 12,/, "id: 12,\n    level: 'advanced',");

// Grammar Topics
content = content.replace(/id: "passive-voice",/, 'id: "passive-voice",\n    level: "intermediate",');
content = content.replace(/id: "conditionals",/, 'id: "conditionals",\n    level: "intermediate",');
content = content.replace(/id: "relative-clauses",/, 'id: "relative-clauses",\n    level: "intermediate",');
content = content.replace(/id: "reported-speech",/, 'id: "reported-speech",\n    level: "intermediate",');
content = content.replace(/id: "subject-verb-agreement",/, 'id: "subject-verb-agreement",\n    level: "beginner",');
content = content.replace(/id: "gerund-infinitive",/, 'id: "gerund-infinitive",\n    level: "intermediate",');
content = content.replace(/id: "comparisons",/, 'id: "comparisons",\n    level: "beginner",');
content = content.replace(/id: "modal-verbs",/, 'id: "modal-verbs",\n    level: "beginner",');
content = content.replace(/id: "inversion",/, 'id: "inversion",\n    level: "advanced",');
content = content.replace(/id: "articles",/, 'id: "articles",\n    level: "beginner",');
content = content.replace(/id: "prepositions",/, 'id: "prepositions",\n    level: "beginner",');
content = content.replace(/id: "question-tags",/, 'id: "question-tags",\n    level: "intermediate",');
content = content.replace(/id: "quantifiers",/, 'id: "quantifiers",\n    level: "beginner",');
content = content.replace(/id: "used-to",/, 'id: "used-to",\n    level: "intermediate",');

fs.writeFileSync('lib/data/grammar.ts', content);
console.log('Grammar levels updated!');
