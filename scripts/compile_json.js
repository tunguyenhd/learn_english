import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { group1 } from '../src/data/vocab/topicsGroup1.ts';
import { group2 } from '../src/data/vocab/topicsGroup2.ts';
import { group3 } from '../src/data/vocab/topicsGroup3.ts';
import { group4 } from '../src/data/vocab/topicsGroup4.ts';
import { mockQuestionsData } from '../src/data/vocab/questions.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allTopics = [
  ...group1,
  ...group2,
  ...group3,
  ...group4
];

const totalWords = allTopics.reduce((acc, t) => acc + t.words.length, 0);

console.log(`Compiling vocabulary data: ${allTopics.length} topics, ${totalWords} words, ${mockQuestionsData.length} questions.`);

const jsonPayload = {
  metadata: {
    totalTopics: allTopics.length,
    totalWords: totalWords,
    totalQuestions: mockQuestionsData.length,
    version: "2.1.0-optimized",
    generatedAt: new Date().toISOString()
  },
  topics: allTopics,
  questions: mockQuestionsData
};

// Minified JSON: Strips all whitespace and indentation for maximum file-size savings
const jsonString = JSON.stringify(jsonPayload);

// 1. Write to src/data/vocabulary.json
const srcPath = path.resolve(__dirname, '../src/data/vocabulary.json');
fs.writeFileSync(srcPath, jsonString, 'utf-8');
console.log(`Successfully wrote minified JSON to ${srcPath} (${(Buffer.byteLength(jsonString) / 1024).toFixed(1)} KB)`);

// 2. Also write to public/data/vocabulary.json
const publicDir = path.resolve(__dirname, '../public/data');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const publicPath = path.resolve(publicDir, 'vocabulary.json');
fs.writeFileSync(publicPath, jsonString, 'utf-8');
console.log(`Successfully wrote minified JSON to ${publicPath}`);
