import type { ReadingPassage, ListeningExercise, SpeakingTopic, WritingPrompt } from '@/lib/types';

export type { ReadingPassage, ListeningExercise, SpeakingTopic, WritingPrompt };

export const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    level: 'beginner',
    cert: 'ielts',
    category: "IELTS Academic (Environment)",
    title: "The Impact of Climate Change on Coral Reefs",
    passage: `Coral reefs are some of the most diverse ecosystems on Earth. They provide habitat for thousands of species of marine life. However, they are highly sensitive to changes in their environment. In recent decades, climate change has emerged as the greatest threat to coral reefs worldwide. The primary driver of this destruction is rising sea temperatures. When water temperatures stay just a few degrees above normal for prolonged periods, corals expel the symbiotic algae living in their tissues. This process is known as coral bleaching. Without these algae, the coral loses its major source of food, turns completely white, and is highly vulnerable to disease and death.

Another significant issue is ocean acidification. As the ocean absorbs excess carbon dioxide from the atmosphere, its chemistry changes, becoming more acidic. This makes it difficult for corals to build and maintain their calcium carbonate skeletons. Without strong skeletons, coral reefs cannot support the vast ecosystems that rely on them. Conservation efforts are underway, including the development of heat-resistant coral strains, but reducing global greenhouse gas emissions remains the most critical step in preserving these vital marine environments.`,
    questions: [
      {
        id: 1,
        question: "What happens to coral when water temperatures rise for prolonged periods?",
        options: [
          "They absorb more carbon dioxide.",
          "They expel symbiotic algae and turn white.",
          "They build stronger calcium carbonate skeletons.",
          "They migrate to cooler waters."
        ],
        answer: "They expel symbiotic algae and turn white."
      },
      {
        id: 2,
    level: 'intermediate',
        question: "According to the passage, what is the main consequence of ocean acidification on corals?",
        options: [
          "It makes them resistant to diseases.",
          "It provides them with a major source of food.",
          "It weakens their ability to build their skeletons.",
          "It causes them to reproduce faster."
        ],
        answer: "It weakens their ability to build their skeletons."
      },
      {
        id: 3,
    level: 'advanced',
        question: "What is considered the most critical step to preserve coral reefs?",
        options: [
          "Building artificial underwater reefs.",
          "Reducing global greenhouse gas emissions.",
          "Moving corals to fresh water lakes.",
          "Feeding corals artificial nutrients."
        ],
        answer: "Reducing global greenhouse gas emissions."
      }
    ]
  },
  {
    id: 2,
    cert: 'toeic',
    category: "TOEIC Part 7 (Company Notice)",
    title: "Notice: Annual Office Building Maintenance",
    passage: `To: All Staff Members
From: Facilities Management Team
Date: October 15
Subject: Scheduled Power & Network Maintenance

Please be advised that the main office building will undergo annual electrical and IT network upgrades this coming weekend, starting Saturday, October 20 at 8:00 AM and concluding Sunday, October 21 at 6:00 PM.

During this period, all power supply in the building will be shut off. This means that elevators, air conditioning, and desktop computers will not be operational. In addition, the internal company servers will be temporarily taken offline for scheduled data migration. Remote access to company email and cloud drives will be unavailable from 10:00 AM to 2:00 PM on Saturday.

All employees are urged to save their work and shut down all electronic equipment before leaving on Friday afternoon. If you need urgent access to the building over the weekend, please obtain prior written authorization from your department supervisor and report to security at the main entrance. Thank you for your patience and cooperation.`,
    questions: [
      {
        id: 101,
        question: "What is the primary purpose of the notice?",
        options: [
          "To invite employees to a weekend company party.",
          "To announce upcoming maintenance and system outages.",
          "To inform staff about a change in office hours.",
          "To recruit new security personnel."
        ],
        answer: "To announce upcoming maintenance and system outages."
      },
      {
        id: 102,
        question: "When will remote email access be offline?",
        options: [
          "All weekend",
          "Friday afternoon",
          "Saturday from 10:00 AM to 2:00 PM",
          "Sunday morning"
        ],
        answer: "Saturday from 10:00 AM to 2:00 PM"
      },
      {
        id: 103,
        question: "What are employees instructed to do before leaving on Friday?",
        options: [
          "Clean their desks thoroughly.",
          "Submit their weekly sales reports.",
          "Save work and turn off electronic devices.",
          "Leave their keycards with front security."
        ],
        answer: "Save work and turn off electronic devices."
      }
    ]
  },
  {
    id: 3,
    cert: 'ielts',
    category: "IELTS General (Technology & Society)",
    title: "The Psychological Effects of Remote Work",
    passage: `The widespread transition toward remote working arrangements has reshaped the modern workplace. On one hand, employees report increased autonomy, reduced commuting stress, and a better ability to juggle familial duties. Many workers highlight that elimination of daily traffic jams saves up to ten hours per week, allowing more time for personal hobbies and physical exercise.

On the other hand, the blurring of boundaries between professional obligations and domestic life presents distinct psychological hazards. Without clear physical separation, many remote workers struggle to disconnect from work in the evenings, leading to digital exhaustion and chronic fatigue. Furthermore, long periods of isolation can diminish workplace camaraderie and weaken collaborative innovation. Psychologists advise setting strict working schedules and designating a specific workspace at home to combat these issues.`,
    questions: [
      {
        id: 201,
        question: "What is mentioned as a major benefit of working remotely?",
        options: [
          "Guaranteed promotions from supervisors.",
          "More free time due to the elimination of daily commuting.",
          "Lower internet and utility bills.",
          "Better communication with international teams."
        ],
        answer: "More free time due to the elimination of daily commuting."
      },
      {
        id: 202,
        question: "What psychological problem is caused by the lack of clear boundaries at home?",
        options: [
          "Difficulty in switching off and digital exhaustion.",
          "Sudden loss of analytical skills.",
          "Fear of using computer monitors.",
          "Inability to complete simple household chores."
        ],
        answer: "Difficulty in switching off and digital exhaustion."
      },
      {
        id: 203,
        question: "What do psychologists recommend to mitigate the drawbacks of remote work?",
        options: [
          "Taking sleeping pills every evening.",
          "Quitting jobs without notice.",
          "Establishing strict schedules and a dedicated home workspace.",
          "Working continuously throughout weekends."
        ],
        answer: "Establishing strict schedules and a dedicated home workspace."
      }
    ]
  },
  {
    id: 4,
    level: 'intermediate',
    cert: 'toeic',
    category: "TOEIC Part 7 (Business Inquiry Email)",
    title: "Email: Request for Bulk Catering Quotation",
    passage: `From: Samantha Reed <s.reed@apexsolutions.com>
To: Orders <sales@gourmetdelights.com>
Date: November 12
Subject: Catering Inquiry for Annual Shareholders Meeting

Dear Gourmet Delights Catering Team,

I am writing on behalf of Apex Solutions to request a formal quotation for catering services for our upcoming Annual Shareholders Meeting, scheduled for Thursday, December 14 at the Grand Horizon Plaza in downtown Seattle.

We anticipate approximately 180 attendees, including senior executives and international investors. We require a continental breakfast buffet from 8:30 AM to 9:30 AM, followed by a formal three-course seated luncheon at 12:30 PM. Approximately 25 guests have strict dietary restrictions, including gluten-free and vegetarian preferences.

Could you please provide sample menus along with per-person pricing tiers and staffing fees? Since we must finalize our budget by Friday, November 17, an expedited response would be greatly appreciated.

Sincerely,
Samantha Reed
Corporate Events Coordinator
Apex Solutions`,
    questions: [
      {
        id: 301,
        question: "Why is Ms. Reed contacting Gourmet Delights?",
        options: [
          "To complain about a past catering service.",
          "To apply for an event planning job.",
          "To request a cost estimate for an upcoming corporate event.",
          "To cancel a reservation at Grand Horizon Plaza."
        ],
        answer: "To request a cost estimate for an upcoming corporate event."
      },
      {
        id: 302,
        question: "How many people are expected to attend the shareholders meeting?",
        options: [
          "Around 25 people",
          "Exactly 100 people",
          "Approximately 180 people",
          "Over 300 people"
        ],
        answer: "Approximately 180 people"
      },
      {
        id: 303,
        question: "What does Ms. Reed specify regarding dietary requirements?",
        options: [
          "No special meals will be needed.",
          "Around 25 attendees require gluten-free or vegetarian dishes.",
          "All food must be seafood-based.",
          "Desserts are not permitted."
        ],
        answer: "Around 25 attendees require gluten-free or vegetarian dishes."
      }
    ]
  }
];

export const readingData = readingPassages[0];

export const listeningDataList: ListeningExercise[] = [
  {
    id: 1,
    cert: 'toeic',
    category: "TOEIC Part 4 (Public Announcement)",
    title: "Flight Delay Announcement at Airport",
    transcript: "Attention all passengers on Flight BA-492 to Chicago. We regret to inform you that the departure has been delayed due to an unexpected technical issue with the aircraft engine during pre-flight inspection. Technicians are currently working to resolve the issue. We expect the new departure time to be 4:30 PM. Passengers may collect complimentary beverage vouchers at Gate 14.",
    questions: [
      {
        id: 1,
        question: "What is the main reason for the flight delay?",
        options: [
          "Bad weather conditions at the destination.",
          "A technical issue with the aircraft.",
          "Late arrival of the flight crew.",
          "Security checks at the terminal."
        ],
        answer: "A technical issue with the aircraft."
      },
      {
        id: 2,
        question: "What are passengers offered at Gate 14?",
        options: [
          "Free meal coupons",
          "Complimentary beverage vouchers",
          "Full ticket refunds",
          "Free hotel reservations"
        ],
        answer: "Complimentary beverage vouchers"
      }
    ]
  },
  {
    id: 2,
    cert: 'ielts',
    category: "IELTS Section 4 (Academic Lecture)",
    title: "University Lecture: Renewable Energy Strategies",
    transcript: "Welcome students. Today we will examine how solar photovoltaic panels convert light directly into electrical energy through the photoelectric effect. While manufacturing and installation costs have dropped by over 70% during the last decade, battery storage capacity remains the primary bottleneck preventing continuous integration into the national electrical grid.",
    questions: [
      {
        id: 101,
        question: "According to the lecturer, what has decreased by over 70% in the last decade?",
        options: [
          "Electricity demand",
          "Solar panel manufacturing and installation costs",
          "Battery storage efficiency",
          "Government subsidies"
        ],
        answer: "Solar panel manufacturing and installation costs"
      },
      {
        id: 102,
        question: "What is highlighted as the primary bottleneck for continuous grid integration?",
        options: [
          "Lack of sunlight",
          "High maintenance fees",
          "Battery storage capacity",
          "Public opposition"
        ],
        answer: "Battery storage capacity"
      }
    ]
  },
  {
    id: 3,
    cert: 'toeic',
    category: "TOEIC Part 3 (Workplace Dialogue)",
    title: "Office Discussion: Product Launch Marketing Budget",
    transcript: "Woman: Good morning Mark. Have you had a chance to review the quarterly marketing budget for our upcoming smart watch line? Man: Yes Linda, I looked over the figures. Allocating 40% solely to social media advertising seems excessive. We should allocate more resources to partnering with fitness tech influencers. Woman: Good point. Let's adjust the proposal and present it to the VP of Marketing at Thursday's meeting.",
    questions: [
      {
        id: 201,
        question: "What product are the speakers discussing?",
        options: [
          "A smart watch",
          "A new fitness tracking mobile app",
          "Laptop computers",
          "Wireless earbuds"
        ],
        answer: "A smart watch"
      },
      {
        id: 202,
        question: "What does the man suggest doing with the budget?",
        options: [
          "Cutting all digital advertising",
          "Allocating more resources to partnering with fitness tech influencers",
          "Doubling the social media spend",
          "Postponing the product release until next year"
        ],
        answer: "Allocating more resources to partnering with fitness tech influencers"
      }
    ]
  }
];

export const speakingTopicsList: SpeakingTopic[] = [
  {
    id: 1,
    cert: 'ielts',
    category: "IELTS Speaking Part 2 (Cue Card)",
    title: "Describe a book you have recently read and enjoyed",
    prompts: [
      "What kind of book it was (genre, author)",
      "What the main storyline or key takeaway was",
      "What sort of readers would find it appealing",
      "And explain why you found it memorable or inspiring"
    ],
    tips: "Sử dụng các thì quá khứ để mô tả cốt truyện, kết hợp các tính từ miêu tả cảm xúc như 'captivating', 'thought-provoking', 'unputdownable'."
  },
  {
    id: 2,
    cert: 'toeic',
    category: "TOEIC Speaking Question 3 (Describe a Picture)",
    title: "Describe a busy open-plan modern office setting",
    prompts: [
      "Identify the general location and key people in the foreground",
      "Describe what each individual is doing (typing, conferring, drinking coffee)",
      "Highlight background details (whiteboards, glass partitions, lighting)",
      "Conclude with a general impression of the working environment"
    ],
    tips: "Sử dụng thì hiện tại tiếp diễn (Present Continuous) xuyên suốt bài nói: 'In the foreground, a woman is reviewing documents... In the background, two colleagues are discussing...'"
  },
  {
    id: 3,
    cert: 'ielts',
    category: "IELTS Speaking Part 3 (Analytical Discussion)",
    title: "The role of public libraries in the digital era",
    prompts: [
      "Do people still need brick-and-mortar libraries when ebooks are so prevalent?",
      "How can public libraries transform into community cultural centers?",
      "Should governments allocate more tax funds to preserve historical archives?"
    ],
    tips: "Đưa ra quan điểm 2 chiều (On the one hand... On the other hand...), dùng từ vựng nâng cao như 'digitalization', 'community hub', 'preservation of cultural heritage'."
  }
];

export const speakingData = {
  cueCard: {
    title: speakingTopicsList[0].title,
    prompts: speakingTopicsList[0].prompts
  }
};

export const writingPromptsList: WritingPrompt[] = [
  {
    id: 1,
    cert: 'ielts',
    category: "IELTS Academic Writing Task 2 (Discussion & Opinion)",
    title: "University Education: Practical Skills vs Pure Academic Pursuit",
    prompt: "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. Discuss both views and give your own opinion.",
    sampleAnswer: `In recent years, the ultimate role of higher education institutions has sparked intense discourse. While pragmatists argue that universities must equip undergraduates with vocational competence tailored for employment, purists contend that academic inquiry should be pursued purely for intellectual enlightenment. In my perspective, while the pursuit of knowledge possesses intrinsic value, contemporary tertiary education must fundamentally harmonize theoretical exploration with tangible workplace competencies.

On the one hand, advocating for university training focused purely on career readiness has substantial merit. In an increasingly competitive global economy, employers demand graduates possessing immediately applicable skills, such as software development, data analytics, and project administration. If higher institutions detach their curricula from commercial realities, young professionals risk graduating with heavy student debt yet remaining unemployable.

On the other hand, reducing universities to mere vocational training grounds undermines human progress. Foundational sciences, philosophy, and history do not always generate immediate financial dividends; however, they foster critical cognitive faculties, civic mindfulness, and ethical reasoning. Without such disciplines, society risks technical specialization void of ethical insight.

In conclusion, universities should not be forced into an artificial dichotomy. The most effective higher education model integrates rigorous academic scholarship with practical industry apprenticeships, ensuring students graduate both intellectually cultured and commercially viable.`
  },
  {
    id: 2,
    cert: 'toeic',
    category: "TOEIC Writing Part 2 (Respond to a Written Request)",
    title: "Customer Support: Damaged Office Supplies Shipment",
    prompt: "Respond to an email inquiry from a customer who received a damaged shipment of office supplies. In your email, apologize for the issue, explain how the replacement or refund will be processed, and provide a direct contact person.",
    sampleAnswer: `Dear Mr. Henderson,

Thank you for reaching out to us regarding order #AP-8492. We sincerely apologize for the inconvenience and frustration caused by the damaged delivery of office supplies you received on Tuesday.

Please be assured that quality and customer satisfaction are our utmost priorities. We have already dispatched an expedited replacement package containing all affected items via overnight priority courier at zero additional charge. You should receive the tracking notification within two hours, with delivery estimated for tomorrow afternoon. There is no need to return the defective merchandise; please dispose of it as you see fit.

Should you require any further assistance, please feel free to reach me directly at extension 402 or reply directly to this email.

Sincerely,
Laura Jenkins
Senior Customer Support Specialist
OfficeWorld Supplies Ltd.`
  },
  {
    id: 3,
    cert: 'ielts',
    category: "IELTS Academic Writing Task 1 (Report / Overview)",
    title: "Global Energy Consumption Trends (Report)",
    prompt: "The chart below shows global energy consumption from fossil fuels and renewable sources between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    sampleAnswer: `The line graph delineates global consumption figures for both fossil fuels and renewable energy sources over a thirty-year span from 1990 to 2020, measured in terawatt-hours (TWh).

Overall, it is readily apparent that fossil fuels remained the overwhelmingly dominant primary energy source throughout the entirety of the observed timeframe. However, while fossil fuel consumption exhibited steady growth followed by a plateau in the final decade, renewable energy experienced unprecedented exponential growth, particularly post-2010.

In 1990, fossil fuel consumption stood at roughly 80,000 TWh, nearly twenty times higher than renewable energy, which registered beneath 4,000 TWh. By 2010, fossil fuel usage climbed steadily to peak near 120,000 TWh before leveling off. In stark contrast, renewable sources accelerated rapidly from 2010 onwards, tripling to reach over 28,000 TWh by 2020, driven largely by advancements in wind and solar photovoltaic infrastructure.`
  }
];

export const writingData = {
  task2: {
    prompt: writingPromptsList[0].prompt
  }
};
