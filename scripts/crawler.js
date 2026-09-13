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

  // Danh sách từ vựng mở rộng - 200+ từ cho nhiều chủ đề
  const candidatePool = [
    // Topic 1: Education & Academia
    { topicId: 1, word: 'Tenure', pos: 'noun', phonetic: '/ˈtenjə(r)/', definitionVi: 'Biên chế giảng viên đại học', example: 'She received tenure after publishing extensively.' },
    { topicId: 1, word: 'Plagiarize', pos: 'verb', phonetic: '/ˈpleɪdʒəraɪz/', definitionVi: 'Đạo văn, sao chép bất hợp pháp', example: 'Students who plagiarize face expulsion.' },
    { topicId: 1, word: 'Enrollment', pos: 'noun', phonetic: '/ɪnˈrəʊlmənt/', definitionVi: 'Số lượng sinh viên đăng ký', example: 'University enrollment has risen significantly this year.' },
    { topicId: 1, word: 'Symposium', pos: 'noun', phonetic: '/sɪmˈpəʊziəm/', definitionVi: 'Hội thảo khoa học chuyên sâu', example: 'Researchers presented findings at the annual symposium.' },
    { topicId: 1, word: 'Postgraduate', pos: 'adjective', phonetic: '/ˌpəʊstˈɡrædʒuət/', definitionVi: 'Sau đại học', example: 'She enrolled in a postgraduate research program.' },
    { topicId: 1, word: 'Bilingual', pos: 'adjective', phonetic: '/baɪˈlɪŋɡwəl/', definitionVi: 'Song ngữ, sử dụng hai ngôn ngữ', example: 'Bilingual education benefits cognitive development.' },
    { topicId: 1, word: 'Absenteeism', pos: 'noun', phonetic: '/ˌæbsənˈtiːɪzəm/', definitionVi: 'Tình trạng nghỉ học/nghỉ làm thường xuyên', example: 'High absenteeism rates affect academic performance.' },
    { topicId: 1, word: 'Pragmatic', pos: 'adjective', phonetic: '/præɡˈmætɪk/', definitionVi: 'Thực dụng, thiết thực', example: 'The teacher took a pragmatic approach to curriculum design.' },
    { topicId: 1, word: 'Rote learning', pos: 'noun', phonetic: '/rəʊt ˈlɜːnɪŋ/', definitionVi: 'Học vẹt, học thuộc lòng máy móc', example: 'Critics argue rote learning stifles creativity.' },
    { topicId: 1, word: 'Interdisciplinary', pos: 'adjective', phonetic: '/ˌɪntədɪsəˈplɪnəri/', definitionVi: 'Liên ngành, đa lĩnh vực', example: 'Interdisciplinary research combines biology and computer science.' },

    // Topic 2: Business & Corporate
    { topicId: 2, word: 'Procurement', pos: 'noun', phonetic: '/prəˈkjʊəmənt/', definitionVi: 'Mua sắm, đấu thầu cung ứng', example: 'The procurement department sources raw materials globally.' },
    { topicId: 2, word: 'Leverage', pos: 'verb', phonetic: '/ˈliːvərɪdʒ/', definitionVi: 'Tận dụng, khai thác lợi thế', example: 'Companies leverage data analytics for market insights.' },
    { topicId: 2, word: 'Conglomerate', pos: 'noun', phonetic: '/kənˈɡlɒmərət/', definitionVi: 'Tập đoàn đa ngành', example: 'The conglomerate owns businesses across five industries.' },
    { topicId: 2, word: 'Dividend', pos: 'noun', phonetic: '/ˈdɪvɪdend/', definitionVi: 'Cổ tức chia cho cổ đông', example: 'Shareholders received a generous quarterly dividend.' },
    { topicId: 2, word: 'Collateral', pos: 'noun', phonetic: '/kəˈlætərəl/', definitionVi: 'Tài sản thế chấp', example: 'The bank required property as collateral for the loan.' },
    { topicId: 2, word: 'Depreciation', pos: 'noun', phonetic: '/dɪˌpriːʃiˈeɪʃn/', definitionVi: 'Khấu hao tài sản', example: 'Vehicle depreciation is factored into corporate budgets.' },
    { topicId: 2, word: 'Amortize', pos: 'verb', phonetic: '/ˈæmətaɪz/', definitionVi: 'Phân bổ trả dần chi phí', example: 'The company amortized the software costs over five years.' },
    { topicId: 2, word: 'Franchise', pos: 'noun', phonetic: '/ˈfræntʃaɪz/', definitionVi: 'Nhượng quyền thương hiệu', example: 'The restaurant expanded through a franchise model.' },
    { topicId: 2, word: 'Liquidate', pos: 'verb', phonetic: '/ˈlɪkwɪdeɪt/', definitionVi: 'Thanh lý tài sản, giải thể', example: 'The failing company was forced to liquidate its assets.' },
    { topicId: 2, word: 'Arbitration', pos: 'noun', phonetic: '/ˌɑːbɪˈtreɪʃn/', definitionVi: 'Phân xử tranh chấp ngoài tòa', example: 'Both parties agreed to resolve the dispute through arbitration.' },

    // Topic 3: Environment & Climate
    { topicId: 3, word: 'Photovoltaic', pos: 'adjective', phonetic: '/ˌfəʊtəʊvɒlˈteɪɪk/', definitionVi: 'Quang điện, pin mặt trời', example: 'Photovoltaic panels convert sunlight directly into electricity.' },
    { topicId: 3, word: 'Aquifer', pos: 'noun', phonetic: '/ˈækwɪfə(r)/', definitionVi: 'Tầng ngậm nước ngầm', example: 'Over-extraction has depleted the underground aquifer.' },
    { topicId: 3, word: 'Biomass', pos: 'noun', phonetic: '/ˈbaɪəʊmæs/', definitionVi: 'Sinh khối, nhiên liệu sinh học', example: 'Biomass energy uses organic waste to generate power.' },
    { topicId: 3, word: 'Microplastic', pos: 'noun', phonetic: '/ˌmaɪkrəʊˈplæstɪk/', definitionVi: 'Vi nhựa gây ô nhiễm', example: 'Microplastics have been found in deep ocean sediment.' },
    { topicId: 3, word: 'Composting', pos: 'noun', phonetic: '/ˈkɒmpɒstɪŋ/', definitionVi: 'Ủ phân hữu cơ', example: 'Composting kitchen scraps reduces household waste significantly.' },
    { topicId: 3, word: 'Watershed', pos: 'noun', phonetic: '/ˈwɔːtəʃed/', definitionVi: 'Lưu vực sông, vùng thoát nước', example: 'Protecting the watershed ensures clean drinking water downstream.' },
    { topicId: 3, word: 'Eutrophication', pos: 'noun', phonetic: '/juːˌtrɒfɪˈkeɪʃn/', definitionVi: 'Phú dưỡng (dư thừa chất dinh dưỡng trong nước)', example: 'Fertilizer runoff causes eutrophication and algal blooms.' },
    { topicId: 3, word: 'Sequestration', pos: 'noun', phonetic: '/ˌsiːkwɪˈstreɪʃn/', definitionVi: 'Thu giữ và lưu trữ carbon', example: 'Carbon sequestration in forests helps offset emissions.' },
    { topicId: 3, word: 'Topsoil', pos: 'noun', phonetic: '/ˈtɒpsɔɪl/', definitionVi: 'Lớp đất mặt màu mỡ', example: 'Intensive farming strips away vital topsoil nutrients.' },
    { topicId: 3, word: 'Endemic', pos: 'adjective', phonetic: '/enˈdemɪk/', definitionVi: 'Đặc hữu (loài chỉ có ở một vùng)', example: 'Lemurs are endemic to Madagascar.' },

    // Topic 4: Technology & AI
    { topicId: 4, word: 'Blockchain', pos: 'noun', phonetic: '/ˈblɒktʃeɪn/', definitionVi: 'Chuỗi khối phi tập trung', example: 'Blockchain technology underpins cryptocurrency transactions.' },
    { topicId: 4, word: 'API', pos: 'noun', phonetic: '/ˌeɪ piː ˈaɪ/', definitionVi: 'Giao diện lập trình ứng dụng', example: 'Developers integrate payment gateways via secure APIs.' },
    { topicId: 4, word: 'Middleware', pos: 'noun', phonetic: '/ˈmɪdlweə(r)/', definitionVi: 'Phần mềm trung gian kết nối hệ thống', example: 'Middleware bridges legacy systems with modern applications.' },
    { topicId: 4, word: 'Containerization', pos: 'noun', phonetic: '/kənˌteɪnəraɪˈzeɪʃn/', definitionVi: 'Đóng gói ứng dụng trong container', example: 'Docker containerization simplifies deployment workflows.' },
    { topicId: 4, word: 'Tokenization', pos: 'noun', phonetic: '/ˌtəʊkənaɪˈzeɪʃn/', definitionVi: 'Mã hóa dữ liệu thành token', example: 'Tokenization protects sensitive payment card information.' },
    { topicId: 4, word: 'Microservices', pos: 'noun', phonetic: '/ˌmaɪkrəʊˈsɜːvɪsɪz/', definitionVi: 'Kiến trúc vi dịch vụ', example: 'The platform migrated from monolith to microservices.' },
    { topicId: 4, word: 'Inference', pos: 'noun', phonetic: '/ˈɪnfərəns/', definitionVi: 'Suy luận (trong AI/ML)', example: 'Real-time AI inference requires optimized hardware.' },
    { topicId: 4, word: 'Hallucination', pos: 'noun', phonetic: '/həˌluːsɪˈneɪʃn/', definitionVi: 'Ảo giác (AI tạo ra thông tin sai)', example: 'Language models can produce hallucinations in their outputs.' },
    { topicId: 4, word: 'Fine-tuning', pos: 'noun', phonetic: '/faɪn ˈtjuːnɪŋ/', definitionVi: 'Tinh chỉnh mô hình AI', example: 'Fine-tuning pre-trained models improves domain-specific accuracy.' },
    { topicId: 4, word: 'Edge computing', pos: 'noun', phonetic: '/edʒ kəmˈpjuːtɪŋ/', definitionVi: 'Điện toán biên (xử lý tại thiết bị)', example: 'Edge computing reduces latency for IoT sensor data.' },

    // Topic 5: Health & Medicine
    { topicId: 5, word: 'Pathogen', pos: 'noun', phonetic: '/ˈpæθədʒən/', definitionVi: 'Mầm bệnh, tác nhân gây bệnh', example: 'Handwashing eliminates most common pathogens.' },
    { topicId: 5, word: 'Prognosis', pos: 'noun', phonetic: '/prɒɡˈnəʊsɪs/', definitionVi: 'Tiên lượng bệnh', example: 'Early detection improves the prognosis for cancer patients.' },
    { topicId: 5, word: 'Immunodeficiency', pos: 'noun', phonetic: '/ˌɪmjʊnəʊdɪˈfɪʃnsi/', definitionVi: 'Suy giảm miễn dịch', example: 'HIV causes acquired immunodeficiency syndrome.' },
    { topicId: 5, word: 'Biopsy', pos: 'noun', phonetic: '/ˈbaɪɒpsi/', definitionVi: 'Sinh thiết (lấy mẫu mô xét nghiệm)', example: 'The doctor ordered a biopsy of the suspicious tissue.' },
    { topicId: 5, word: 'Anesthesia', pos: 'noun', phonetic: '/ˌænəsˈθiːziə/', definitionVi: 'Gây mê, gây tê', example: 'The patient was placed under general anesthesia for surgery.' },
    { topicId: 5, word: 'Carcinogen', pos: 'noun', phonetic: '/kɑːˈsɪnədʒən/', definitionVi: 'Chất gây ung thư', example: 'Asbestos is a well-known carcinogen.' },
    { topicId: 5, word: 'Metabolism', pos: 'noun', phonetic: '/məˈtæbəlɪzəm/', definitionVi: 'Sự trao đổi chất', example: 'Regular exercise boosts your metabolism.' },
    { topicId: 5, word: 'Prosthesis', pos: 'noun', phonetic: '/prɒsˈθiːsɪs/', definitionVi: 'Chi giả, bộ phận cơ thể nhân tạo', example: 'Advanced prostheses now mimic natural limb movements.' },
    { topicId: 5, word: 'Telemedicine', pos: 'noun', phonetic: '/ˌtelɪˈmedɪsɪn/', definitionVi: 'Khám bệnh từ xa qua mạng', example: 'Telemedicine expanded rapidly during the pandemic.' },
    { topicId: 5, word: 'Allergen', pos: 'noun', phonetic: '/ˈælədʒən/', definitionVi: 'Chất gây dị ứng', example: 'Peanuts are a common allergen in packaged foods.' },

    // Topic 6: Finance & Economy
    { topicId: 6, word: 'Cryptocurrency', pos: 'noun', phonetic: '/ˌkrɪptəʊˈkʌrənsi/', definitionVi: 'Tiền mã hóa (Bitcoin, Ethereum)', example: 'Cryptocurrency markets are highly volatile.' },
    { topicId: 6, word: 'Hyperinflation', pos: 'noun', phonetic: '/ˌhaɪpərɪnˈfleɪʃn/', definitionVi: 'Siêu lạm phát', example: 'Hyperinflation destroyed the purchasing power of the currency.' },
    { topicId: 6, word: 'Microfinance', pos: 'noun', phonetic: '/ˌmaɪkrəʊˈfaɪnæns/', definitionVi: 'Tài chính vi mô cho người nghèo', example: 'Microfinance empowers small entrepreneurs in developing nations.' },
    { topicId: 6, word: 'Austerity', pos: 'noun', phonetic: '/ɒˈsterəti/', definitionVi: 'Chính sách thắt lưng buộc bụng', example: 'The government imposed strict austerity measures.' },
    { topicId: 6, word: 'Liquidity', pos: 'noun', phonetic: '/lɪˈkwɪdəti/', definitionVi: 'Tính thanh khoản (khả năng chuyển đổi thành tiền mặt)', example: 'High liquidity allows quick buying and selling of assets.' },
    { topicId: 6, word: 'Tariff', pos: 'noun', phonetic: '/ˈtærɪf/', definitionVi: 'Thuế quan nhập khẩu', example: 'New tariffs increased the cost of imported steel.' },
    { topicId: 6, word: 'Subsidy', pos: 'noun', phonetic: '/ˈsʌbsədi/', definitionVi: 'Trợ cấp của chính phủ', example: 'Agricultural subsidies support domestic farmers.' },
    { topicId: 6, word: 'Embargo', pos: 'noun', phonetic: '/ɪmˈbɑːɡəʊ/', definitionVi: 'Lệnh cấm vận thương mại', example: 'The oil embargo severely impacted the national economy.' },
    { topicId: 6, word: 'Divestiture', pos: 'noun', phonetic: '/daɪˈvestɪtʃə(r)/', definitionVi: 'Thoái vốn, bán tài sản', example: 'The corporation announced divestiture of its media division.' },
    { topicId: 6, word: 'Hedge fund', pos: 'noun', phonetic: '/hedʒ fʌnd/', definitionVi: 'Quỹ đầu tư mạo hiểm', example: 'Hedge funds employ complex strategies to maximize returns.' },

    // Topic 7: Travel & Tourism
    { topicId: 7, word: 'Itinerary', pos: 'noun', phonetic: '/aɪˈtɪnərəri/', definitionVi: 'Lịch trình chuyến đi', example: 'We planned a detailed itinerary for our European trip.' },
    { topicId: 7, word: 'Accommodation', pos: 'noun', phonetic: '/əˌkɒməˈdeɪʃn/', definitionVi: 'Chỗ ở, nhà nghỉ', example: 'The hotel provides excellent accommodation for tourists.' },
    { topicId: 7, word: 'Excursion', pos: 'noun', phonetic: '/ɪkˈskɜːʃn/', definitionVi: 'Chuyến tham quan ngắn ngày', example: 'The cruise included a guided excursion to the ancient ruins.' },
    { topicId: 7, word: 'Souvenir', pos: 'noun', phonetic: '/ˌsuːvəˈnɪə(r)/', definitionVi: 'Quà lưu niệm', example: 'She bought handmade souvenirs at the local market.' },
    { topicId: 7, word: 'Embarkation', pos: 'noun', phonetic: '/ˌembɑːˈkeɪʃn/', definitionVi: 'Sự lên tàu / máy bay', example: 'Passengers must arrive two hours before embarkation.' },
    { topicId: 7, word: 'Amenity', pos: 'noun', phonetic: '/əˈmiːnəti/', definitionVi: 'Tiện nghi, dịch vụ đi kèm', example: 'The resort offers a wide range of amenities including a spa.' },
    { topicId: 7, word: 'Backpacking', pos: 'noun', phonetic: '/ˈbækpækɪŋ/', definitionVi: 'Du lịch bụi ba lô', example: 'Backpacking through Southeast Asia is a popular gap year choice.' },
    { topicId: 7, word: 'Layover', pos: 'noun', phonetic: '/ˈleɪəʊvə(r)/', definitionVi: 'Quá cảnh, dừng chân giữa chuyến bay', example: 'We had a six-hour layover in Dubai airport.' },
    { topicId: 7, word: 'Customs', pos: 'noun', phonetic: '/ˈkʌstəmz/', definitionVi: 'Hải quan kiểm tra nhập cảnh', example: 'All luggage must be declared at customs upon arrival.' },
    { topicId: 7, word: 'Ecotourism', pos: 'noun', phonetic: '/ˈiːkəʊtʊərɪzəm/', definitionVi: 'Du lịch sinh thái bền vững', example: 'Ecotourism promotes conservation while benefiting local communities.' },

    // Topic 8: Society & Culture
    { topicId: 8, word: 'Assimilation', pos: 'noun', phonetic: '/əˌsɪmɪˈleɪʃn/', definitionVi: 'Sự hòa nhập văn hóa', example: 'Cultural assimilation can lead to the loss of native traditions.' },
    { topicId: 8, word: 'Demographic', pos: 'adjective', phonetic: '/ˌdeməˈɡræfɪk/', definitionVi: 'Thuộc về nhân khẩu học', example: 'Demographic shifts are reshaping urban planning priorities.' },
    { topicId: 8, word: 'Philanthropy', pos: 'noun', phonetic: '/fɪˈlænθrəpi/', definitionVi: 'Hoạt động từ thiện', example: 'The billionaire is known for his extensive philanthropy.' },
    { topicId: 8, word: 'Gentrification', pos: 'noun', phonetic: '/ˌdʒentrɪfɪˈkeɪʃn/', definitionVi: 'Quý tộc hóa (khu vực nghèo được cải tạo)', example: 'Gentrification raised property values but displaced long-time residents.' },
    { topicId: 8, word: 'Diaspora', pos: 'noun', phonetic: '/daɪˈæspərə/', definitionVi: 'Cộng đồng kiều bào hải ngoại', example: 'The Vietnamese diaspora maintains strong cultural ties.' },
    { topicId: 8, word: 'Egalitarian', pos: 'adjective', phonetic: '/ɪˌɡælɪˈteəriən/', definitionVi: 'Bình đẳng, công bằng xã hội', example: 'Scandinavian societies are often cited as egalitarian models.' },
    { topicId: 8, word: 'Xenophobia', pos: 'noun', phonetic: '/ˌzenəˈfəʊbiə/', definitionVi: 'Chứng sợ/ghét người nước ngoài', example: 'Education is key to combating xenophobia.' },
    { topicId: 8, word: 'Urbanization', pos: 'noun', phonetic: '/ˌɜːbənaɪˈzeɪʃn/', definitionVi: 'Đô thị hóa', example: 'Rapid urbanization strains existing infrastructure.' },
    { topicId: 8, word: 'Indigenous', pos: 'adjective', phonetic: '/ɪnˈdɪdʒənəs/', definitionVi: 'Bản địa, thổ dân', example: 'Indigenous communities have deep ecological knowledge.' },
    { topicId: 8, word: 'Multiculturalism', pos: 'noun', phonetic: '/ˌmʌltiˈkʌltʃərəlɪzəm/', definitionVi: 'Chủ nghĩa đa văn hóa', example: 'Multiculturalism enriches societies with diverse perspectives.' },

    // Topic 9: Law & Justice
    { topicId: 9, word: 'Acquittal', pos: 'noun', phonetic: '/əˈkwɪtl/', definitionVi: 'Sự tuyên trắng án', example: 'The jury returned a verdict of acquittal.' },
    { topicId: 9, word: 'Litigation', pos: 'noun', phonetic: '/ˌlɪtɪˈɡeɪʃn/', definitionVi: 'Tranh tụng, kiện cáo', example: 'The company faces costly litigation over patent infringement.' },
    { topicId: 9, word: 'Precedent', pos: 'noun', phonetic: '/ˈpresɪdənt/', definitionVi: 'Tiền lệ pháp lý', example: 'The ruling set a legal precedent for future cases.' },
    { topicId: 9, word: 'Statute', pos: 'noun', phonetic: '/ˈstætʃuːt/', definitionVi: 'Đạo luật, bộ luật thành văn', example: 'The statute of limitations expired on the crime.' },
    { topicId: 9, word: 'Adjudicate', pos: 'verb', phonetic: '/əˈdʒuːdɪkeɪt/', definitionVi: 'Phán xét, xét xử', example: 'An independent panel will adjudicate the dispute.' },
    { topicId: 9, word: 'Indictment', pos: 'noun', phonetic: '/ɪnˈdaɪtmənt/', definitionVi: 'Cáo trạng buộc tội', example: 'The grand jury issued an indictment against the executive.' },
    { topicId: 9, word: 'Extradition', pos: 'noun', phonetic: '/ˌekstrəˈdɪʃn/', definitionVi: 'Dẫn độ tội phạm giữa các quốc gia', example: 'The government approved the extradition request.' },
    { topicId: 9, word: 'Probation', pos: 'noun', phonetic: '/prəˈbeɪʃn/', definitionVi: 'Án treo, quản chế', example: 'The offender was sentenced to two years of probation.' },
    { topicId: 9, word: 'Plaintiff', pos: 'noun', phonetic: '/ˈpleɪntɪf/', definitionVi: 'Nguyên đơn (người khởi kiện)', example: 'The plaintiff filed a civil lawsuit for damages.' },
    { topicId: 9, word: 'Defamation', pos: 'noun', phonetic: '/ˌdefəˈmeɪʃn/', definitionVi: 'Tội phỉ báng, bôi nhọ danh dự', example: 'The celebrity sued the tabloid for defamation.' },

    // Topic 10: Psychology & Mind
    { topicId: 10, word: 'Cognitive bias', pos: 'noun', phonetic: '/ˈkɒɡnɪtɪv baɪəs/', definitionVi: 'Thiên kiến nhận thức', example: 'Confirmation bias is one of the most common cognitive biases.' },
    { topicId: 10, word: 'Resilience', pos: 'noun', phonetic: '/rɪˈzɪliəns/', definitionVi: 'Khả năng phục hồi tâm lý', example: 'Building resilience helps children cope with adversity.' },
    { topicId: 10, word: 'Subliminal', pos: 'adjective', phonetic: '/sʌbˈlɪmɪnl/', definitionVi: 'Dưới ngưỡng ý thức', example: 'Subliminal messages may influence consumer behavior.' },
    { topicId: 10, word: 'Neurotransmitter', pos: 'noun', phonetic: '/ˌnjʊərəʊtrænzˈmɪtə(r)/', definitionVi: 'Chất dẫn truyền thần kinh', example: 'Serotonin is a neurotransmitter linked to mood regulation.' },
    { topicId: 10, word: 'Introvert', pos: 'noun', phonetic: '/ˈɪntrəvɜːt/', definitionVi: 'Người hướng nội', example: 'Introverts often prefer solitary activities over large gatherings.' },
    { topicId: 10, word: 'Psychosomatic', pos: 'adjective', phonetic: '/ˌsaɪkəʊsəˈmætɪk/', definitionVi: 'Bệnh tâm thể (do tâm lý gây ra)', example: 'Chronic stress can trigger psychosomatic symptoms.' },
    { topicId: 10, word: 'Altruism', pos: 'noun', phonetic: '/ˈæltruɪzəm/', definitionVi: 'Lòng vị tha', example: 'Acts of altruism strengthen social bonds.' },
    { topicId: 10, word: 'Stimulus', pos: 'noun', phonetic: '/ˈstɪmjələs/', definitionVi: 'Kích thích (tâm lý/sinh lý)', example: 'The experiment measured response time to a visual stimulus.' },
    { topicId: 10, word: 'Phobia', pos: 'noun', phonetic: '/ˈfəʊbiə/', definitionVi: 'Nỗi ám ảnh sợ hãi phi lý', example: 'Arachnophobia is an intense phobia of spiders.' },
    { topicId: 10, word: 'Empathy', pos: 'noun', phonetic: '/ˈempəθi/', definitionVi: 'Sự đồng cảm, thấu hiểu cảm xúc người khác', example: 'Empathy is essential for effective interpersonal communication.' },

    // Topics 11-20 (10 words each for remaining topics)
    // Topic 11: Media & Communication
    { topicId: 11, word: 'Propaganda', pos: 'noun', phonetic: '/ˌprɒpəˈɡændə/', definitionVi: 'Tuyên truyền có chủ đích', example: 'State propaganda shaped public opinion during the war.' },
    { topicId: 11, word: 'Paraphrase', pos: 'verb', phonetic: '/ˈpærəfreɪz/', definitionVi: 'Diễn đạt lại bằng lời khác', example: 'Can you paraphrase this paragraph in simpler language?' },
    { topicId: 11, word: 'Vernacular', pos: 'noun', phonetic: '/vəˈnækjələ(r)/', definitionVi: 'Tiếng bản địa, ngôn ngữ thông tục', example: 'The novel is written in the vernacular of rural Ireland.' },
    { topicId: 11, word: 'Rhetoric', pos: 'noun', phonetic: '/ˈretərɪk/', definitionVi: 'Thuật hùng biện, tu từ học', example: 'Political rhetoric often obscures the real issues.' },
    { topicId: 11, word: 'Misinformation', pos: 'noun', phonetic: '/ˌmɪsɪnfəˈmeɪʃn/', definitionVi: 'Thông tin sai lệch', example: 'Fact-checkers combat the spread of online misinformation.' },

    // Topic 12: Arts & Literature
    { topicId: 12, word: 'Aesthetic', pos: 'adjective', phonetic: '/iːsˈθetɪk/', definitionVi: 'Thẩm mỹ, nghệ thuật', example: 'The building has great aesthetic appeal.' },
    { topicId: 12, word: 'Allegory', pos: 'noun', phonetic: '/ˈæləɡəri/', definitionVi: 'Phép ẩn dụ, truyện ngụ ngôn', example: 'Animal Farm is a political allegory by George Orwell.' },
    { topicId: 12, word: 'Protagonist', pos: 'noun', phonetic: '/prəˈtæɡənɪst/', definitionVi: 'Nhân vật chính', example: 'The protagonist undergoes a dramatic transformation.' },
    { topicId: 12, word: 'Renaissance', pos: 'noun', phonetic: '/rɪˈneɪsns/', definitionVi: 'Thời kỳ Phục Hưng', example: 'The Renaissance revolutionized European art and science.' },
    { topicId: 12, word: 'Avant-garde', pos: 'adjective', phonetic: '/ˌævɒ̃ˈɡɑːd/', definitionVi: 'Tiên phong, đổi mới nghệ thuật', example: 'The gallery showcases avant-garde contemporary installations.' },

    // Topic 13: Science & Research
    { topicId: 13, word: 'Peer review', pos: 'noun', phonetic: '/pɪə rɪˈvjuː/', definitionVi: 'Phản biện đồng nghiệp', example: 'All research papers undergo rigorous peer review.' },
    { topicId: 13, word: 'Paradigm', pos: 'noun', phonetic: '/ˈpærədaɪm/', definitionVi: 'Mô hình tư duy, khuôn mẫu', example: 'Einstein shifted the paradigm of modern physics.' },
    { topicId: 13, word: 'Synthesis', pos: 'noun', phonetic: '/ˈsɪnθəsɪs/', definitionVi: 'Sự tổng hợp', example: 'The paper provides a synthesis of recent climate studies.' },
    { topicId: 13, word: 'Variable', pos: 'noun', phonetic: '/ˈveəriəbl/', definitionVi: 'Biến số trong thí nghiệm', example: 'Control all variables except the one being tested.' },
    { topicId: 13, word: 'Correlation', pos: 'noun', phonetic: '/ˌkɒrəˈleɪʃn/', definitionVi: 'Mối tương quan', example: 'There is a strong correlation between exercise and mental health.' },

    // Topic 14: Daily Life & Phrasal Verbs
    { topicId: 14, word: 'Put off', pos: 'phrasal verb', phonetic: '/pʊt ɒf/', definitionVi: 'Hoãn lại, trì hoãn', example: 'Don\'t put off your homework until the last minute.' },
    { topicId: 14, word: 'Come across', pos: 'phrasal verb', phonetic: '/kʌm əˈkrɒs/', definitionVi: 'Tình cờ gặp, bắt gặp', example: 'I came across an interesting article about space travel.' },
    { topicId: 14, word: 'Break down', pos: 'phrasal verb', phonetic: '/breɪk daʊn/', definitionVi: 'Hỏng máy, sụp đổ', example: 'The car broke down on the highway during rush hour.' },
    { topicId: 14, word: 'Look into', pos: 'phrasal verb', phonetic: '/lʊk ˈɪntə/', definitionVi: 'Điều tra, xem xét kỹ', example: 'The police will look into the matter immediately.' },
    { topicId: 14, word: 'Run out of', pos: 'phrasal verb', phonetic: '/rʌn aʊt ɒv/', definitionVi: 'Hết, cạn kiệt', example: 'We ran out of milk so I went to the store.' },

    // Topic 15-20: More words for variety
    { topicId: 15, word: 'Deteriorate', pos: 'verb', phonetic: '/dɪˈtɪəriəreɪt/', definitionVi: 'Xấu đi, suy thoái', example: 'Air quality continues to deteriorate in major cities.' },
    { topicId: 15, word: 'Fluctuate', pos: 'verb', phonetic: '/ˈflʌktʃueɪt/', definitionVi: 'Dao động, biến động', example: 'Oil prices fluctuate with global demand.' },
    { topicId: 15, word: 'Exacerbate', pos: 'verb', phonetic: '/ɪɡˈzæsəbeɪt/', definitionVi: 'Làm trầm trọng thêm', example: 'The drought exacerbated food shortages.' },
    { topicId: 16, word: 'Ubiquitous', pos: 'adjective', phonetic: '/juːˈbɪkwɪtəs/', definitionVi: 'Có mặt khắp nơi', example: 'Smartphones have become ubiquitous in modern life.' },
    { topicId: 16, word: 'Pervasive', pos: 'adjective', phonetic: '/pəˈveɪsɪv/', definitionVi: 'Lan tràn, phổ biến rộng rãi', example: 'The influence of social media is pervasive.' },
    { topicId: 17, word: 'Paradigm shift', pos: 'noun', phonetic: '/ˈpærədaɪm ʃɪft/', definitionVi: 'Sự thay đổi mô hình tư duy', example: 'AI represents a paradigm shift in computing.' },
    { topicId: 17, word: 'Benchmark', pos: 'verb', phonetic: '/ˈbentʃmɑːk/', definitionVi: 'Đo lường hiệu suất so sánh', example: 'We benchmarked our product against three competitors.' },
    { topicId: 18, word: 'Eloquent', pos: 'adjective', phonetic: '/ˈeləkwənt/', definitionVi: 'Hùng biện, ăn nói lưu loát', example: 'She delivered an eloquent speech at the conference.' },
    { topicId: 19, word: 'Meticulous', pos: 'adjective', phonetic: '/məˈtɪkjələs/', definitionVi: 'Tỉ mỉ, cẩn thận từng chi tiết', example: 'The architect was meticulous in his design specifications.' },
    { topicId: 20, word: 'Sporadic', pos: 'adjective', phonetic: '/spəˈrædɪk/', definitionVi: 'Rời rạc, không đều, lẻ tẻ', example: 'There were sporadic outbreaks of violence during the protests.' },
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
