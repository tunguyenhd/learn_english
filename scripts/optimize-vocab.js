import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../lib/data/vocabulary.json');

function optimizeVocabulary() {
  if (!fs.existsSync(jsonPath)) {
    console.error(`Không tìm thấy file: ${jsonPath}`);
    process.exit(1);
  }

  const database = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Kiểm tra xem đã được nén chưa (dựa vào cấu trúc words)
  if (database.topics.length > 0 && Array.isArray(database.topics[0].words[0])) {
    console.log('Dữ liệu đã được nén từ trước (Array of Arrays format).');
    return;
  }

  const beforeSize = fs.statSync(jsonPath).size;

  // Nén words từ Object sang Array of Arrays
  database.topics = database.topics.map(t => ({
    ...t,
    words: t.words.map(w => [
      w.id,
      w.word,
      w.pos,
      w.phonetic,
      w.definitionVi,
      w.example || ''
    ])
  }));

  const minifiedJson = JSON.stringify(database);
  fs.writeFileSync(jsonPath, minifiedJson, 'utf8');

  const afterSize = fs.statSync(jsonPath).size;
  const reduction = ((beforeSize - afterSize) / beforeSize * 100).toFixed(2);

  console.log(`Đã tối ưu hóa vocabulary.json!`);
  console.log(`Dung lượng ban đầu: ${(beforeSize / 1024).toFixed(2)} KB`);
  console.log(`Dung lượng sau khi nén: ${(afterSize / 1024).toFixed(2)} KB`);
  console.log(`Giảm được: ${reduction}%`);
}

optimizeVocabulary();
