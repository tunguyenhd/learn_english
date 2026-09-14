import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../lib/data/vocabulary.json');

const delay = ms => new Promise(res => setTimeout(res, ms));

async function runFastCrawler() {
  console.log('Fetching common english words...');
  const res = await fetch('https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt');
  const text = await res.text();
  const words = text.split('\n').filter(w => w.length > 3).slice(100, 5100); // 5000 words
  
  console.log(`Fetched ${words.length} words. Reading vocabulary.json...`);
  const database = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Get existing words to avoid duplicates
  const existingWords = new Set();
  database.topics.forEach(t => {
    t.words.forEach(w => {
      const wordString = Array.isArray(w) ? w[1] : w.word;
      existingWords.add(wordString.toLowerCase());
    });
  });

  const batchSize = 100; // Translate 100 words per request
  let globalIdCounter = database.metadata.totalWords + 1000;
  
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize).filter(w => !existingWords.has(w.toLowerCase()));
    if (batch.length === 0) continue;

    console.log(`Processing batch ${i} to ${i + batchSize}...`);
    
    // Create translation payload
    const q = batch.join('\n');
    let translations = [];
    try {
      const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(q)}`);
      const transData = await transRes.json();
      
      // transData[0] contains array of translated sentences/lines
      translations = transData[0].map(item => item[0].trim());
    } catch (e) {
      console.log('Translation failed, using english word...');
      translations = batch; 
    }

    // Add words evenly across the 10 topics
    for (let j = 0; j < batch.length; j++) {
      const word = batch[j];
      const meaning = translations[j] || word;
      
      const topicIndex = (i + j) % 10;
      const topic = database.topics[topicIndex];
      
      topic.words.push([
        globalIdCounter++,
        word,
        'noun', // default pos
        `/${word}/`, // basic phonetic
        meaning.toLowerCase(),
        `This is a sentence with the word ${word}.`
      ]);
      
      existingWords.add(word.toLowerCase());
    }
    
    // Add a small delay to prevent google translate rate limit
    await delay(1000);
  }

  const updatedTotalWords = database.topics.reduce((acc, t) => acc + t.words.length, 0);
  database.metadata.totalWords = updatedTotalWords;
  
  fs.writeFileSync(jsonPath, JSON.stringify(database), 'utf8');
  console.log(`\n--- Done! Total words in database: ${updatedTotalWords} ---`);
}

runFastCrawler();
