import type { TenseItem, GrammarTopicItem, IrregularVerb } from '@/lib/types';

export type { TenseItem, GrammarTopicItem, IrregularVerb };

export const tensesData: TenseItem[] = [
  {
    id: 1,
    name: "1. Present Simple (Hiện tại đơn)",
    usage: "Diễn tả thói quen, hành động lặp đi lặp lại, chân lý/sự thật hiển nhiên hoặc một lịch trình có sẵn cố định.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + V(s/es) | S + am/is/are + N/Adj" },
      { type: "Phủ định (-)", formula: "S + do/does not + V(nguyên thể) | S + am/is/are not + N/Adj" },
      { type: "Nghi vấn (?)", formula: "Do/Does + S + V(nguyên thể)? | Am/Is/Are + S + N/Adj?" }
    ],
    example: "She goes to work by bus every day. / The sun rises in the East.",
    signalWords: "always, usually, often, sometimes, rarely, never, every day/week/month"
  },
  {
    id: 2,
    name: "2. Present Continuous (Hiện tại tiếp diễn)",
    usage: "Diễn tả hành động đang diễn ra ngay tại thời điểm nói hoặc một kế hoạch sắp sửa diễn ra trong tương lai gần.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + am/is/are + V-ing" },
      { type: "Phủ định (-)", formula: "S + am/is/are not + V-ing" },
      { type: "Nghi vấn (?)", formula: "Am/Is/Are + S + V-ing?" }
    ],
    example: "I am studying English right now. / Look! The train is coming.",
    signalWords: "now, right now, at the moment, at present, Look!, Listen!"
  },
  {
    id: 3,
    name: "3. Present Perfect (Hiện tại hoàn thành)",
    usage: "Diễn tả hành động đã xảy ra trong quá khứ nhưng không đề cập thời gian cụ thể, hoặc kết quả còn kéo dài/ảnh hưởng đến hiện tại.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + have/has + V3/ed" },
      { type: "Phủ định (-)", formula: "S + have/has not + V3/ed" },
      { type: "Nghi vấn (?)", formula: "Have/Has + S + V3/ed?" }
    ],
    example: "I have lived in London for 10 years. / She has already finished her homework.",
    signalWords: "already, yet, just, ever, never, for + khoảng thời gian, since + mốc thời gian, recently"
  },
  {
    id: 4,
    name: "4. Present Perfect Continuous (Hiện tại hoàn thành tiếp diễn)",
    usage: "Nhấn mạnh sự liên tục, kéo dài của một hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + have/has + been + V-ing" },
      { type: "Phủ định (-)", formula: "S + have/has not + been + V-ing" },
      { type: "Nghi vấn (?)", formula: "Have/Has + S + been + V-ing?" }
    ],
    example: "It has been raining all morning. / How long have you been waiting here?",
    signalWords: "all day, all morning, for 5 hours, since 8 AM, how long..."
  },
  {
    id: 5,
    name: "5. Past Simple (Quá khứ đơn)",
    usage: "Diễn tả hành động đã xảy ra và kết thúc hoàn toàn tại một thời điểm xác định trong quá khứ.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + V2/ed | S + was/were + N/Adj" },
      { type: "Phủ định (-)", formula: "S + did not + V(nguyên thể) | S + was/were not + N/Adj" },
      { type: "Nghi vấn (?)", formula: "Did + S + V(nguyên thể)? | Was/Were + S + N/Adj?" }
    ],
    example: "They visited Paris in 2019. / I bought a new laptop yesterday.",
    signalWords: "yesterday, last night/week/year, ago, in 2010, in the past"
  },
  {
    id: 6,
    name: "6. Past Continuous (Quá khứ tiếp diễn)",
    usage: "Diễn tả hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ hoặc một hành động đang diễn ra thì hành động khác xen vào.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + was/were + V-ing" },
      { type: "Phủ định (-)", formula: "S + was/were not + V-ing" },
      { type: "Nghi vấn (?)", formula: "Was/Were + S + V-ing?" }
    ],
    example: "At 8 PM yesterday, I was watching TV. / I was reading when she called.",
    signalWords: "at this time yesterday, at 9 PM last night, when, while"
  },
  {
    id: 7,
    name: "7. Past Perfect (Quá khứ hoàn thành)",
    usage: "Diễn tả một hành động xảy ra và hoàn thành trước một hành động khác hoặc trước một mốc thời gian trong quá khứ.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + had + V3/ed" },
      { type: "Phủ định (-)", formula: "S + had not + V3/ed" },
      { type: "Nghi vấn (?)", formula: "Had + S + V3/ed?" }
    ],
    example: "When I arrived at the station, the train had already left.",
    signalWords: "before, after, by the time, as soon as, prior to"
  },
  {
    id: 8,
    name: "8. Past Perfect Continuous (Quá khứ hoàn thành tiếp diễn)",
    usage: "Nhấn mạnh khoảng thời gian kéo dài của một hành động diễn ra liên tục trước một hành động khác trong quá khứ.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + had + been + V-ing" },
      { type: "Phủ định (-)", formula: "S + had not + been + V-ing" },
      { type: "Nghi vấn (?)", formula: "Had + S + been + V-ing?" }
    ],
    example: "He had been driving for 4 hours before he realized he was lost.",
    signalWords: "until then, for hours before, by the time"
  },
  {
    id: 9,
    name: "9. Future Simple (Tương lai đơn)",
    usage: "Diễn tả một quyết định bộc phát ngay thời điểm nói, lời hứa, hoặc dự đoán không có căn cứ cụ thể.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + will + V(nguyên thể)" },
      { type: "Phủ định (-)", formula: "S + will not (won't) + V(nguyên thể)" },
      { type: "Nghi vấn (?)", formula: "Will + S + V(nguyên thể)?" }
    ],
    example: "I will help you with your baggage. / I think it will rain tomorrow.",
    signalWords: "tomorrow, next week/month, in the future, I think, I promise"
  },
  {
    id: 10,
    name: "10. Future Continuous (Tương lai tiếp diễn)",
    usage: "Diễn tả hành động sẽ đang diễn ra tại một mốc thời gian hoặc khoảng thời gian xác định trong tương lai.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + will be + V-ing" },
      { type: "Phủ định (-)", formula: "S + will not be + V-ing" },
      { type: "Nghi vấn (?)", formula: "Will + S + be + V-ing?" }
    ],
    example: "This time next week, I will be swimming in Bali.",
    signalWords: "at this time tomorrow, at 10 AM next Monday"
  },
  {
    id: 11,
    name: "11. Future Perfect (Tương lai hoàn thành)",
    usage: "Diễn tả hành động sẽ được hoàn thành trước một mốc thời gian hoặc trước một hành động khác trong tương lai.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + will have + V3/ed" },
      { type: "Phủ định (-)", formula: "S + will not have + V3/ed" },
      { type: "Nghi vấn (?)", formula: "Will + S + have + V3/ed?" }
    ],
    example: "By next year, I will have graduated from university.",
    signalWords: "by the end of, by next month, by 2030"
  },
  {
    id: 12,
    name: "12. Future Perfect Continuous (Tương lai hoàn thành tiếp diễn)",
    usage: "Diễn tả hành động đã kéo dài liên tục tới một thời điểm trong tương lai.",
    formulas: [
      { type: "Khẳng định (+)", formula: "S + will have been + V-ing" },
      { type: "Phủ định (-)", formula: "S + will not have been + V-ing" },
      { type: "Nghi vấn (?)", formula: "Will + S + have been + V-ing?" }
    ],
    example: "By November, I will have been working here for 5 years.",
    signalWords: "by then, by the time..., for + duration"
  }
];

export const grammarTopicsData: GrammarTopicItem[] = [
  {
    id: "passive-voice",
    title: "Passive Voice",
    titleVi: "Thể Bị Động",
    desc: "Cấu trúc bị động dùng khi muốn nhấn mạnh vào đối tượng chịu tác động của hành động thay vì người thực hiện.",
    rules: [
      { heading: "Công thức chung", detail: "Chủ ngữ + Be + V3/V-ed (+ by O)", example: "Active: She wrote a letter. -> Passive: A letter was written by her." },
      { heading: "Hiện tại đơn bị động", detail: "S + am/is/are + V3/ed", example: "English is spoken all over the world." },
      { heading: "Quá khứ đơn bị động", detail: "S + was/were + V3/ed", example: "The building was constructed in 1995." },
      { heading: "Tương lai đơn bị động", detail: "S + will be + V3/ed", example: "The project will be completed tomorrow." },
      { heading: "Động từ khuyết thiếu bị động", detail: "S + Modal Verb (can/must/should) + be + V3/ed", example: "This rule must be followed strictly." }
    ]
  },
  {
    id: "conditionals",
    title: "Conditional Sentences",
    titleVi: "Câu Điều Kiện",
    desc: "Các dạng câu điều kiện dùng để diễn tả một giả định và kết quả xảy ra.",
    rules: [
      { heading: "Loại 0 (Sự thật hiển nhiên)", detail: "If + S + V(hiện tại đơn), S + V(hiện tại đơn)", example: "If you heat ice, it melts." },
      { heading: "Loại 1 (Có thể xảy ra ở hiện tại/tương lai)", detail: "If + S + V(hiện tại đơn), S + will + V(nguyên thể)", example: "If it rains tomorrow, we will stay at home." },
      { heading: "Loại 2 (Không có thật ở hiện tại)", detail: "If + S + V2/was/were, S + would/could + V(nguyên thể)", example: "If I were rich, I would buy a yacht." },
      { heading: "Loại 3 (Không có thật trong quá khứ)", detail: "If + S + had + V3/ed, S + would have + V3/ed", example: "If I had studied harder, I would have passed the exam." },
      { heading: "Hỗn hợp (Giả định quá khứ, kết quả hiện tại)", detail: "If + S + had + V3/ed, S + would + V(nguyên thể)", example: "If I had taken that job, I would be living in Tokyo now." }
    ]
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    titleVi: "Mệnh Đề Quan Hệ",
    desc: "Mệnh đề bổ nghĩa cho danh từ đứng trước nó bằng các đại từ quan hệ Who, Whom, Which, That, Whose...",
    rules: [
      { heading: "Who", detail: "Thay thế cho danh từ chỉ người, làm chủ ngữ.", example: "The woman who called you is my manager." },
      { heading: "Whom", detail: "Thay thế cho danh từ chỉ người, làm tân ngữ.", example: "The candidate whom we interviewed was impressive." },
      { heading: "Which", detail: "Thay thế cho danh từ chỉ vật/sự việc.", example: "The book which you lent me is very interesting." },
      { heading: "Whose", detail: "Chỉ sự sở hữu (Whose + Noun).", example: "The boy whose car was stolen called the police." },
      { heading: "Where / When / Why", detail: "Trạng từ quan hệ chỉ nơi chốn / thời gian / lý do.", example: "This is the hospital where I was born." }
    ]
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    titleVi: "Câu Gián Tiếp",
    desc: "Dùng để tường thuật lại lời nói của người khác mà không trích dẫn trực tiếp.",
    rules: [
      { heading: "Lùi thì (Tense Shift)", detail: "Present Simple -> Past Simple; Present Continuous -> Past Continuous; Present Perfect -> Past Perfect; Past Simple -> Past Perfect", example: "Direct: 'I am tired' -> Reported: He said that he was tired." },
      { heading: "Đổi từ chỉ thời gian & nơi chốn", detail: "Now -> Then, Today -> That day, Tomorrow -> The next day, Yesterday -> The day before, Here -> There", example: "Direct: 'I will call you tomorrow' -> Reported: She said she would call me the next day." }
    ]
  },
  {
    id: "subject-verb-agreement",
    title: "Subject - Verb Agreement",
    titleVi: "Hòa Hợp Chủ Ngữ & Động Từ",
    desc: "Quy tắc quyết định động từ chia ở số ít hay số nhiều phụ thuộc vào chủ ngữ của câu.",
    rules: [
      { heading: "Chủ ngữ đi kèm Each, Every, Either, Neither", detail: "Động từ luôn chia ở dạng số ÍT.", example: "Every student is required to submit the assignment." },
      { heading: "Chủ ngữ có Both, Few, Several, Many", detail: "Động từ luôn chia ở dạng số NHIỀU.", example: "Several people were injured in the accident." },
      { heading: "Either... or / Neither... nor / Not only... but also", detail: "Động từ chia theo danh từ đứng GẦN nó nhất.", example: "Neither the manager nor the employees were informed." },
      { heading: "Cụm danh từ đo lường, thời gian, tiền bạc, khoảng cách", detail: "Động từ luôn chia ở số ÍT.", example: "Ten million dollars is a large sum of money." }
    ]
  },
  {
    id: "gerund-infinitive",
    title: "Gerunds and Infinitives",
    titleVi: "Danh Động Từ (V-ing) & To-Infinitive",
    desc: "Quy tắc sử dụng V-ing hoặc To-V sau các động từ hoặc giới từ thông dụng.",
    rules: [
      { heading: "Động từ luôn đi với V-ing (Gerund)", detail: "admit, avoid, consider, deny, enjoy, finish, postpone, suggest, practice...", example: "She avoided answering his questions." },
      { heading: "Động từ luôn đi với To-V (Infinitive)", detail: "agree, decide, hope, manage, promise, refuse, afford, intend, expect...", example: "They decided to postpone the conference." },
      { heading: "Động từ đổi nghĩa theo V-ing / To-V", detail: "Remember/Forget + V-ing (nhớ đã làm gì) vs To-V (nhớ phải làm gì); Stop + V-ing (dừng hẳn việc đang làm) vs To-V (dừng lại để làm việc khác)", example: "Remember to lock the door. / I remember meeting her in Tokyo." }
    ]
  },
  {
    id: "comparisons",
    title: "Comparisons",
    titleVi: "Các Dạng So Sánh",
    desc: "Tổng hợp các cấu trúc so sánh bằng, so sánh hơn, so sánh nhất và so sánh kép.",
    rules: [
      { heading: "So sánh bằng", detail: "as + adj/adv + as", example: "He is as tall as his brother." },
      { heading: "So sánh hơn", detail: "Ngắn: adj/adv + er + than | Dài: more + adj/adv + than", example: "This laptop is more expensive than that one." },
      { heading: "So sánh nhất", detail: "Ngắn: the + adj/adv + est | Dài: the most + adj/adv", example: "She is the most talented designer in our team." },
      { heading: "So sánh kép (Càng... càng...)", detail: "The + comparative..., the + comparative...", example: "The more you practice, the better you become." }
    ]
  },
  {
    id: "modal-verbs",
    title: "Modal Verbs",
    titleVi: "Động Từ Khuyết Thiếu",
    desc: "Diễn tả khả năng, sự cho phép, nghĩa vụ, suy đoán hoặc lời khuyên.",
    rules: [
      { heading: "Must vs Have to", detail: "Must: nghĩa vụ mang tính chủ quan hoặc bắt buộc tuyệt đối. Have to: nghĩa vụ do ngoại cảnh/luật lệ.", example: "You must wear a helmet on a motorbike." },
      { heading: "Should / Ought to", detail: "Đưa ra lời khuyên hoặc gợi ý.", example: "You should consult a financial advisor before investing." },
      { heading: "May / Might / Could", detail: "Diễn tả khả năng có thể xảy ra trong hiện tại hoặc tương lai (dưới 50%).", example: "It might rain later this afternoon." },
      { heading: "Modal Verbs trong quá khứ", detail: "Must have + V3/ed (chắc hẳn đã), Should have + V3/ed (lẽ ra nên làm gì)", example: "She looks happy, she must have passed the test." }
    ]
  },
  {
    id: "inversion",
    title: "Inversion",
    titleVi: "Đảo Ngữ",
    desc: "Cấu trúc nhấn mạnh bằng cách đưa trạng từ phủ định hoặc từ đặc biệt lên đầu câu và đảo trợ động từ lên trước chủ ngữ.",
    rules: [
      { heading: "Đảo ngữ với Never/Seldom/Rarely", detail: "Never/Seldom/Rarely + Trợ động từ + S + V", example: "Never have I seen such a breathtaking view." },
      { heading: "Đảo ngữ với No sooner ... than", detail: "No sooner + had + S + V3/ed + than + S + V2/ed", example: "No sooner had I arrived than the meeting started." },
      { heading: "Đảo ngữ với Hardly ... when", detail: "Hardly + had + S + V3/ed + when + S + V2/ed", example: "Hardly had she left when it began to rain." },
      { heading: "Đảo ngữ với Not only ... but also", detail: "Not only + Trợ động từ + S + V + but also ...", example: "Not only is he smart, but he is also hardworking." }
    ]
  }
];

export const irregularVerbsData = [
  { v1: "abide", v2: "abode/abided", v3: "abode/abided", meaning: "tuân theo, chịu đựng" },
  { v1: "arise", v2: "arose", v3: "arisen", meaning: "phát sinh, nảy sinh" },
  { v1: "awake", v2: "awoke", v3: "awoken", meaning: "đánh thức, thức dậy" },
  { v1: "be", v2: "was/were", v3: "been", meaning: "thì, là, ở" },
  { v1: "bear", v2: "bore", v3: "borne/born", meaning: "mang, chịu đựng, sinh ra" },
  { v1: "beat", v2: "beat", v3: "beaten", meaning: "đánh, đập" },
  { v1: "become", v2: "became", v3: "become", meaning: "trở nên, trở thành" },
  { v1: "befall", v2: "befell", v3: "befallen", meaning: "xảy đến" },
  { v1: "beget", v2: "begot", v3: "begotten", meaning: "sinh ra, gây ra" },
  { v1: "begin", v2: "began", v3: "begun", meaning: "bắt đầu" },
  { v1: "behold", v2: "beheld", v3: "beheld", meaning: "ngắm nhìn" },
  { v1: "bend", v2: "bent", v3: "bent", meaning: "uốn cong, bẻ cong" },
  { v1: "bereave", v2: "bereft", v3: "bereft", meaning: "cướp đi, tước đoạt" },
  { v1: "beseech", v2: "besought", v3: "besought", meaning: "van xin, thỉnh cầu" },
  { v1: "beset", v2: "beset", v3: "beset", meaning: "bao vây, bủa vây" },
  { v1: "bet", v2: "bet", v3: "bet", meaning: "đánh cược" },
  { v1: "bid", v2: "bid", v3: "bid", meaning: "trả giá, đấu giá" },
  { v1: "bind", v2: "bound", v3: "bound", meaning: "buộc, trói" },
  { v1: "bite", v2: "bit", v3: "bitten", meaning: "cắn" },
  { v1: "bleed", v2: "bled", v3: "bled", meaning: "chảy máu" },
  { v1: "blow", v2: "blew", v3: "blown", meaning: "thổi" },
  { v1: "break", v2: "broke", v3: "broken", meaning: "đập vỡ, làm hỏng" },
  { v1: "breed", v2: "bred", v3: "bred", meaning: "nuôi dưỡng, nhân giống" },
  { v1: "bring", v2: "brought", v3: "brought", meaning: "mang đến" },
  { v1: "broadcast", v2: "broadcast", v3: "broadcast", meaning: "phát sóng" },
  { v1: "build", v2: "built", v3: "built", meaning: "xây dựng" },
  { v1: "burn", v2: "burnt/burned", v3: "burnt/burned", meaning: "đốt cháy" },
  { v1: "burst", v2: "burst", v3: "burst", meaning: "nổ tung, bùng nổ" },
  { v1: "buy", v2: "bought", v3: "bought", meaning: "mua" },
  { v1: "cast", v2: "cast", v3: "cast", meaning: "ném, quăng, đúc" },
  { v1: "catch", v2: "caught", v3: "caught", meaning: "bắt, tóm" },
  { v1: "chide", v2: "chid", v3: "chidden", meaning: "mắng mỏ" },
  { v1: "choose", v2: "chose", v3: "chosen", meaning: "chọn lựa" },
  { v1: "cleave", v2: "clove/cleft", v3: "cloven/cleft", meaning: "chẻ đôi, tách ra" },
  { v1: "cling", v2: "clung", v3: "clung", meaning: "bám chặt, dính vào" },
  { v1: "come", v2: "came", v3: "come", meaning: "đến" },
  { v1: "cost", v2: "cost", v3: "cost", meaning: "có giá là" },
  { v1: "creep", v2: "crept", v3: "crept", meaning: "bò, trườn" },
  { v1: "cut", v2: "cut", v3: "cut", meaning: "cắt" },
  { v1: "deal", v2: "dealt", v3: "dealt", meaning: "thỏa thuận, xử lý" },
  { v1: "dig", v2: "dug", v3: "dug", meaning: "đào đất" },
  { v1: "disprove", v2: "disproved", v3: "disproven", meaning: "bác bỏ" },
  { v1: "do", v2: "did", v3: "done", meaning: "làm" },
  { v1: "draw", v2: "drew", v3: "drawn", meaning: "vẽ, kéo" },
  { v1: "dream", v2: "dreamt/dreamed", v3: "dreamt/dreamed", meaning: "mơ" },
  { v1: "drink", v2: "drank", v3: "drunk", meaning: "uống" },
  { v1: "drive", v2: "drove", v3: "driven", meaning: "lái xe" },
  { v1: "dwell", v2: "dwelt", v3: "dwelt", meaning: "cư trú, ở" },
  { v1: "eat", v2: "ate", v3: "eaten", meaning: "ăn" },
  { v1: "fall", v2: "fell", v3: "fallen", meaning: "ngã, rơi" },
  { v1: "feed", v2: "fed", v3: "fed", meaning: "cho ăn" },
  { v1: "feel", v2: "felt", v3: "felt", meaning: "cảm thấy" },
  { v1: "fight", v2: "fought", v3: "fought", meaning: "chiến đấu" },
  { v1: "find", v2: "found", v3: "found", meaning: "tìm thấy" },
  { v1: "flee", v2: "fled", v3: "fled", meaning: "trốn chạy" },
  { v1: "fling", v2: "flung", v3: "flung", meaning: "quăng, ném mạnh" },
  { v1: "fly", v2: "flew", v3: "flown", meaning: "bay" },
  { v1: "forbid", v2: "forbade", v3: "forbidden", meaning: "cấm" },
  { v1: "forecast", v2: "forecast", v3: "forecast", meaning: "dự báo" },
  { v1: "foresee", v2: "foresaw", v3: "foreseen", meaning: "thấy trước" },
  { v1: "forget", v2: "forgot", v3: "forgotten", meaning: "quên" },
  { v1: "forgive", v2: "forgave", v3: "forgiven", meaning: "tha thứ" },
  { v1: "forsake", v2: "forsook", v3: "forsaken", meaning: "ruồng bỏ, từ bỏ" },
  { v1: "freeze", v2: "froze", v3: "frozen", meaning: "đóng băng" },
  { v1: "get", v2: "got", v3: "got/gotten", meaning: "có được, lấy" },
  { v1: "give", v2: "gave", v3: "given", meaning: "cho, tặng" },
  { v1: "go", v2: "went", v3: "gone", meaning: "đi" },
  { v1: "grind", v2: "ground", v3: "ground", meaning: "xay, nghiền" },
  { v1: "grow", v2: "grew", v3: "grown", meaning: "trồng, phát triển" },
  { v1: "hang", v2: "hung", v3: "hung", meaning: "treo" },
  { v1: "have", v2: "had", v3: "had", meaning: "có" },
  { v1: "hear", v2: "heard", v3: "heard", meaning: "nghe" },
  { v1: "hide", v2: "hid", v3: "hidden", meaning: "trốn, giấu" },
  { v1: "hit", v2: "hit", v3: "hit", meaning: "đánh, trúng" },
  { v1: "hold", v2: "held", v3: "held", meaning: "cầm, giữ, tổ chức" },
  { v1: "hurt", v2: "hurt", v3: "hurt", meaning: "làm đau" },
  { v1: "keep", v2: "kept", v3: "kept", meaning: "giữ" },
  { v1: "kneel", v2: "knelt", v3: "knelt", meaning: "quỳ xuống" },
  { v1: "knit", v2: "knit/knitted", v3: "knit/knitted", meaning: "đan len" },
  { v1: "know", v2: "knew", v3: "known", meaning: "biết" },
  { v1: "lay", v2: "laid", v3: "laid", meaning: "đặt, để, đẻ trứng" },
  { v1: "lead", v2: "led", v3: "led", meaning: "dẫn dắt, lãnh đạo" },
  { v1: "lean", v2: "leant/leaned", v3: "leant/leaned", meaning: "dựa vào, nghiêng" },
  { v1: "leap", v2: "leapt/leaped", v3: "leapt/leaped", meaning: "nhảy vọt" },
  { v1: "learn", v2: "learnt/learned", v3: "learnt/learned", meaning: "học" },
  { v1: "leave", v2: "left", v3: "left", meaning: "rời đi, để lại" },
  { v1: "lend", v2: "lent", v3: "lent", meaning: "cho mượn" },
  { v1: "let", v2: "let", v3: "let", meaning: "cho phép" },
  { v1: "lie", v2: "lay", v3: "lain", meaning: "nằm" },
  { v1: "light", v2: "lit/lighted", v3: "lit/lighted", meaning: "thắp sáng" },
  { v1: "lose", v2: "lost", v3: "lost", meaning: "làm mất, thua" },
  { v1: "make", v2: "made", v3: "made", meaning: "tạo ra, làm" },
  { v1: "mean", v2: "meant", v3: "meant", meaning: "có nghĩa là" },
  { v1: "meet", v2: "met", v3: "met", meaning: "gặp mặt" },
  { v1: "melt", v2: "melted", v3: "molten/melted", meaning: "tan chảy" },
  { v1: "mislead", v2: "misled", v3: "misled", meaning: "lừa dối, dẫn sai đường" },
  { v1: "mistake", v2: "mistook", v3: "mistaken", meaning: "nhầm lẫn" },
  { v1: "mow", v2: "mowed", v3: "mown", meaning: "cắt cỏ" },
  { v1: "overcome", v2: "overcame", v3: "overcome", meaning: "vượt qua" },
  { v1: "overhear", v2: "overheard", v3: "overheard", meaning: "nghe lỏm" },
  { v1: "pay", v2: "paid", v3: "paid", meaning: "trả tiền" },
  { v1: "plead", v2: "pled/pleaded", v3: "pled/pleaded", meaning: "biện hộ, nài xin" },
  { v1: "prove", v2: "proved", v3: "proven/proved", meaning: "chứng minh" },
  { v1: "put", v2: "put", v3: "put", meaning: "đặt, để" },
  { v1: "quit", v2: "quit", v3: "quit", meaning: "từ bỏ, nghỉ việc" },
  { v1: "read", v2: "read", v3: "read", meaning: "đọc" },
  { v1: "rid", v2: "rid", v3: "rid", meaning: "giải thoát, tống khứ" },
  { v1: "ride", v2: "rode", v3: "ridden", meaning: "cưỡi, đi xe" },
  { v1: "ring", v2: "rang", v3: "rung", meaning: "rung chuông" },
  { v1: "rise", v2: "rose", v3: "risen", meaning: "mọc, tăng lên" },
  { v1: "run", v2: "ran", v3: "run", meaning: "chạy" },
  { v1: "saw", v2: "sawed", v3: "sawn", meaning: "cưa gỗ" },
  { v1: "say", v2: "said", v3: "said", meaning: "nói" },
  { v1: "see", v2: "saw", v3: "seen", meaning: "nhìn thấy" },
  { v1: "seek", v2: "sought", v3: "sought", meaning: "tìm kiếm" },
  { v1: "sell", v2: "sold", v3: "sold", meaning: "bán" },
  { v1: "send", v2: "sent", v3: "sent", meaning: "gửi" },
  { v1: "set", v2: "set", v3: "set", meaning: "thiết lập, cài đặt" },
  { v1: "sew", v2: "sewed", v3: "sewn", meaning: "may, khâu" },
  { v1: "shake", v2: "shook", v3: "shaken", meaning: "rung, lắc" },
  { v1: "shed", v2: "shed", v3: "shed", meaning: "rơi lệ, lột da" },
  { v1: "shine", v2: "shone", v3: "shone", meaning: "chiếu sáng" },
  { v1: "shoot", v2: "shot", v3: "shot", meaning: "bắn" },
  { v1: "show", v2: "showed", v3: "shown", meaning: "hiển thị, chỉ ra" },
  { v1: "shrink", v2: "shrank", v3: "shrunk", meaning: "co lại" },
  { v1: "shut", v2: "shut", v3: "shut", meaning: "đóng lại" },
  { v1: "sing", v2: "sang", v3: "sung", meaning: "hát" },
  { v1: "sink", v2: "sank", v3: "sunk", meaning: "chìm" },
  { v1: "sit", v2: "sat", v3: "sat", meaning: "ngồi" },
  { v1: "slay", v2: "slew", v3: "slain", meaning: "sát hại, tiêu diệt" },
  { v1: "sleep", v2: "slept", v3: "slept", meaning: "ngủ" },
  { v1: "slide", v2: "slid", v3: "slid", meaning: "trượt" },
  { v1: "sling", v2: "slung", v3: "slung", meaning: "ném, quăng" },
  { v1: "slit", v2: "slit", v3: "slit", meaning: "rạch, khía" },
  { v1: "smell", v2: "smelt/smelled", v3: "smelt/smelled", meaning: "ngửi" },
  { v1: "sow", v2: "sowed", v3: "sown", meaning: "gieo hạt" },
  { v1: "speak", v2: "spoke", v3: "spoken", meaning: "nói" },
  { v1: "speed", v2: "sped/speeded", v3: "sped/speeded", meaning: "tăng tốc" },
  { v1: "spell", v2: "spelt/spelled", v3: "spelt/spelled", meaning: "đánh vần" },
  { v1: "spend", v2: "spent", v3: "spent", meaning: "tiêu tiền, dành thời gian" },
  { v1: "spill", v2: "spilt/spilled", v3: "spilt/spilled", meaning: "tràn, làm tràn" },
  { v1: "spin", v2: "spun", v3: "spun", meaning: "quay, xoay" },
  { v1: "spit", v2: "spat", v3: "spat", meaning: "nhổ nước bọt" },
  { v1: "split", v2: "split", v3: "split", meaning: "chia rẽ, tách" },
  { v1: "spoil", v2: "spoilt/spoiled", v3: "spoilt/spoiled", meaning: "làm hỏng, chiều hư" },
  { v1: "spread", v2: "spread", v3: "spread", meaning: "lan truyền, trải rộng" },
  { v1: "spring", v2: "sprang", v3: "sprung", meaning: "nhảy lên, bộc phát" },
  { v1: "stand", v2: "stood", v3: "stood", meaning: "đứng" },
  { v1: "steal", v2: "stole", v3: "stolen", meaning: "trộm cắp" },
  { v1: "stick", v2: "stuck", v3: "stuck", meaning: "dán, kẹt" },
  { v1: "sting", v2: "stung", v3: "stung", meaning: "châm, chích" },
  { v1: "stink", v2: "stank", v3: "stunk", meaning: "bốc mùi hôi" },
  { v1: "stride", v2: "strode", v3: "stridden", meaning: "bước dài" },
  { v1: "strike", v2: "struck", v3: "struck", meaning: "đánh, bãi công" },
  { v1: "string", v2: "strung", v3: "strung", meaning: "lên dây, xâu chuỗi" },
  { v1: "strive", v2: "strove", v3: "striven", meaning: "phấn đấu, nỗ lực" },
  { v1: "swear", v2: "swore", v3: "sworn", meaning: "thề, chửi thề" },
  { v1: "sweep", v2: "swept", v3: "swept", meaning: "quét nhà" },
  { v1: "swell", v2: "swelled", v3: "swollen", meaning: "sưng lên, phồng" },
  { v1: "swim", v2: "swam", v3: "swum", meaning: "bơi" },
  { v1: "swing", v2: "swung", v3: "swung", meaning: "đung đưa, lắc lư" },
  { v1: "take", v2: "took", v3: "taken", meaning: "cầm, lấy, dẫn đi" },
  { v1: "teach", v2: "taught", v3: "taught", meaning: "dạy học" },
  { v1: "tear", v2: "tore", v3: "torn", meaning: "xé rách" },
  { v1: "tell", v2: "told", v3: "told", meaning: "kể, bảo" },
  { v1: "think", v2: "thought", v3: "thought", meaning: "suy nghĩ" },
  { v1: "thrive", v2: "throve/thrived", v3: "thriven/thrived", meaning: "phát triển thịnh vượng" },
  { v1: "throw", v2: "threw", v3: "thrown", meaning: "ném" },
  { v1: "thrust", v2: "thrust", v3: "thrust", meaning: "đẩy mạnh, thọc" },
  { v1: "tread", v2: "trod", v3: "trodden", meaning: "giẫm, đạp lên" },
  { v1: "undergo", v2: "underwent", v3: "undergone", meaning: "trải qua" },
  { v1: "understand", v2: "understood", v3: "understood", meaning: "hiểu" },
  { v1: "undertake", v2: "undertook", v3: "undertaken", meaning: "đảm nhận" },
  { v1: "upset", v2: "upset", v3: "upset", meaning: "làm buồn, xáo trộn" },
  { v1: "wake", v2: "woke", v3: "woken", meaning: "thức dậy" },
  { v1: "wear", v2: "wore", v3: "worn", meaning: "mặc, đeo, đội" },
  { v1: "weave", v2: "wove", v3: "woven", meaning: "dệt" },
  { v1: "weep", v2: "wept", v3: "wept", meaning: "khóc lóc" },
  { v1: "win", v2: "won", v3: "won", meaning: "chiến thắng" },
  { v1: "wind", v2: "wound", v3: "wound", meaning: "cuộn, xoắn, lên dây" },
  { v1: "withdraw", v2: "withdrew", v3: "withdrawn", meaning: "rút tiền, rút khỏi" },
  { v1: "withstand", v2: "withstood", v3: "withstood", meaning: "chịu đựng, chống lại" },
  { v1: "wring", v2: "wrung", v3: "wrung", meaning: "vắt nước" },
  { v1: "write", v2: "wrote", v3: "written", meaning: "viết" }
];
