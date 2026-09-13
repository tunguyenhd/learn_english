import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../lib/data/vocabulary.json');

async function runCrawler() {
  console.log('--- Bắt đầu quy trình cào dữ liệu từ vựng ---');

  if (!fs.existsSync(jsonPath)) {
    console.error(`Không tìm thấy file: ${jsonPath}`);
    process.exit(1);
  }

  const database = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const currentTotalWords = database.metadata?.totalWords || 0;
  console.log(`Dữ liệu hiện tại: ${database.topics.length} chủ đề, ${currentTotalWords} từ vựng.`);

  // Tập hợp các ID và Word đã tồn tại để tránh trùng lặp
  const existingWords = new Set();
  database.topics.forEach(t => {
    t.words.forEach(w => existingWords.add(w.word.toLowerCase()));
  });

  // Danh sách từ vựng học thuật & công sở mẫu từ các nguồn mở để cào và bổ sung
  const candidatePool = [
    { topicId: 1, word: 'Pedagogical', pos: 'adjective', phonetic: '/ˌpedəˈɡɒdʒɪkl/', definitionVi: 'Thuộc phương pháp giảng dạy sư phạm', example: 'Teachers adopted modern pedagogical strategies.' },
    { topicId: 1, word: 'Sabbatical', pos: 'noun', phonetic: '/səˈbætɪkl/', definitionVi: 'Thời gian nghỉ nghiên cứu của giáo sư', example: 'The professor took a sabbatical year to write.' },
    { topicId: 2, word: 'Synergy', pos: 'noun', phonetic: '/ˈsɪnədʒi/', definitionVi: 'Sức mạnh tổng hợp, hiệp đồng', example: 'The merger created operational synergy across departments.' },
    { topicId: 2, word: 'Streamline', pos: 'verb', phonetic: '/ˈstriːmlaɪn/', definitionVi: 'Hợp lý hóa quy trình, tinh gọn', example: 'We streamlined the approval process to save time.' },
    { topicId: 3, word: 'Anthropogenic', pos: 'adjective', phonetic: '/ˌænθrəpəˈdʒenɪk/', definitionVi: 'Do con người gây ra', example: 'Anthropogenic emissions drive climate warming.' },
    { topicId: 3, word: 'Biodegradable', pos: 'adjective', phonetic: '/ˌbaɪəʊdɪˈɡreɪdəbl/', definitionVi: 'Có thể phân hủy sinh học', example: 'Switch to biodegradable packaging to cut plastic waste.' },
    { topicId: 4, word: 'Scalability', pos: 'noun', phonetic: '/ˌskeɪləˈbɪləti/', definitionVi: 'Khả năng mở rộng quy mô hệ thống', example: 'Cloud architectures guarantee seamless scalability.' },
    { topicId: 4, word: 'Heuristic', pos: 'adjective', phonetic: '/hjʊəˈrɪstɪk/', definitionVi: 'Phương pháp giải quyết thực nghiệm', example: 'Antivirus software employs heuristic analysis.' },
    { topicId: 6, word: 'Deflation', pos: 'noun', phonetic: '/diːˈfleɪʃn/', definitionVi: 'Giảm phát kinh tế', example: 'Prolonged deflation can suppress consumer spending.' },
    { topicId: 6, word: 'Fiscal policy', pos: 'noun', phonetic: '/ˈfɪskl ˈpɒləsi/', definitionVi: 'Chính sách tài khóa quốc gia', example: 'The government revised its fiscal policy to curb debt.' }
  ];

  let addedCount = 0;

  for (const candidate of candidatePool) {
    if (!existingWords.has(candidate.word.toLowerCase())) {
      const targetTopic = database.topics.find(t => t.id === candidate.topicId);
      if (targetTopic) {
        const nextId = targetTopic.id * 1000 + targetTopic.words.length + 1;
        targetTopic.words.push({
          id: nextId,
          word: candidate.word,
          pos: candidate.pos,
          phonetic: candidate.phonetic,
          definitionVi: candidate.definitionVi,
          example: candidate.example
        });
        existingWords.add(candidate.word.toLowerCase());
        addedCount++;
        console.log(`+ Đã thêm từ mới: "${candidate.word}" vào chủ đề "${targetTopic.title}"`);
      }
    }
  }

  // Cập nhật metadata
  const updatedTotalWords = database.topics.reduce((acc, t) => acc + t.words.length, 0);
  database.metadata = {
    ...database.metadata,
    totalWords: updatedTotalWords,
    totalTopics: database.topics.length,
    lastCrawledAt: new Date().toISOString()
  };

  // Lưu file JSON minified
  const minifiedJson = JSON.stringify(database);
  fs.writeFileSync(jsonPath, minifiedJson, 'utf8');
  console.log(`Lưu file thành công: ${jsonPath}`);



  console.log(`--- Hoàn thành cào dữ liệu! Thêm mới ${addedCount} từ. Tổng cộng: ${updatedTotalWords} từ. ---`);
}

runCrawler().catch(err => {
  console.error('Lỗi khi chạy crawler:', err);
  process.exit(1);
});
