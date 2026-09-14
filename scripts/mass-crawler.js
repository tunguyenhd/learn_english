import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../lib/data/vocabulary.json');

// Danh sách các từ khóa hạt giống để tìm từ mới qua Datamuse API
const TOPIC_SEEDS = {
  1: 'education',
  2: 'business',
  3: 'environment',
  4: 'technology',
  5: 'health',
  6: 'finance',
  7: 'travel',
  8: 'society',
  9: 'law',
  10: 'psychology'
};

async function fetchRelatedWords(seed) {
  try {
    const res = await fetch(`https://api.datamuse.com/words?ml=${seed}&max=1000`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(item => item.word);
  } catch (error) {
    console.error(`Lỗi lấy từ vựng cho ${seed}:`, error.message);
    return [];
  }
}

async function fetchDictionaryData(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) return null;
    const data = await res.json();
    const entry = data[0];
    
    let phonetic = entry.phonetics?.find(p => p.text)?.text || `/${word}/`;
    let pos = entry.meanings?.[0]?.partOfSpeech || 'noun';
    let definitionEn = entry.meanings?.[0]?.definitions?.[0]?.definition || '';
    let example = entry.meanings?.[0]?.definitions?.[0]?.example || '';

    // Dịch định nghĩa tiếng Anh sang tiếng Việt bằng Google Translate Free API (unofficial)
    let definitionVi = definitionEn;
    try {
      const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(definitionEn)}`);
      const transData = await transRes.json();
      if (transData && transData[0] && transData[0][0] && transData[0][0][0]) {
        definitionVi = transData[0][0][0];
      }
    } catch (e) {
      // Bỏ qua nếu lỗi dịch
    }

    return {
      word,
      pos,
      phonetic,
      definitionVi,
      example
    };
  } catch (error) {
    return null;
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function runMassCrawler() {
  console.log('--- BẮT ĐẦU MASS CRAWLER (TỰ ĐỘNG MỞ RỘNG TỪ VỰNG) ---');

  if (!fs.existsSync(jsonPath)) {
    console.error(`Không tìm thấy file: ${jsonPath}`);
    process.exit(1);
  }

  const database = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const existingWords = new Set();
  
  database.topics.forEach(t => {
    t.words.forEach(w => {
      const wordString = Array.isArray(w) ? w[1] : w.word;
      existingWords.add(wordString.toLowerCase());
    });
  });

  let totalAdded = 0;

  for (const topic of database.topics) {
    const seed = TOPIC_SEEDS[topic.id] || topic.title.split(' ')[0].toLowerCase();
    console.log(`\n> Đang tìm từ vựng cho chủ đề: ${topic.title} (Seed: ${seed})...`);
    
    const wordsList = await fetchRelatedWords(seed);
    console.log(`Tìm thấy ${wordsList.length} từ liên quan. Đang xử lý...`);

    for (const w of wordsList) {
      if (existingWords.has(w.toLowerCase()) || w.includes(' ')) continue;

      const dictData = await fetchDictionaryData(w);
      if (dictData && dictData.definitionVi) {
        const nextId = topic.id * 1000 + topic.words.length + 1;
        
        // Nén thành Array Tuple
        topic.words.push([
          nextId,
          dictData.word,
          dictData.pos,
          dictData.phonetic,
          dictData.definitionVi,
          dictData.example || ''
        ]);
        
        existingWords.add(w.toLowerCase());
        totalAdded++;
        console.log(`  + Đã thêm: ${dictData.word} (${dictData.definitionVi})`);
        
        // Tránh bị chặn API (Rate limit)
        await delay(500);
      }
    }
  }

  // Cập nhật metadata
  const updatedTotalWords = database.topics.reduce((acc, t) => acc + t.words.length, 0);
  database.metadata.totalWords = updatedTotalWords;
  database.metadata.lastCrawledAt = new Date().toISOString();

  fs.writeFileSync(jsonPath, JSON.stringify(database), 'utf8');
  console.log(`\n--- HOÀN THÀNH! Đã thêm mới ${totalAdded} từ. Tổng kho từ vựng: ${updatedTotalWords} ---`);
}

runMassCrawler();
