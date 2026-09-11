import { LessonData } from '../models/lesson.data';

export const mockLessonData: LessonData = {
  lessonId: 'lesson-1',
  warmUp: {
    title: 'Khởi động',
    description: 'Bấm chọn một chữ Hán (A-F) bên dưới, rồi bấm vào ô nghĩa tương ứng.',
    items: [
      { id: 'wu1', meaning: 'xin chào', expectedVocabId: 'v1' },
      { id: 'wu2', meaning: 'tạm biệt', expectedVocabId: 'v2' },
      { id: 'wu3', meaning: 'giáo viên', expectedVocabId: 'v3' },
      { id: 'wu4', meaning: 'tốt, khỏe', expectedVocabId: 'v4' },
      { id: 'wu5', meaning: 'mọi người', expectedVocabId: 'v5' },
      { id: 'wu6', meaning: 'cảm ơn', expectedVocabId: 'v6' },
    ],
    choices: [
      { id: 'v1', hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'xin chào', examples: [] },
      { id: 'v2', hanzi: '再见', pinyin: 'zàijiàn', meaning: 'tạm biệt', examples: [] },
      { id: 'v3', hanzi: '老师', pinyin: 'lǎoshī', meaning: 'giáo viên', examples: [] },
      { id: 'v4', hanzi: '好', pinyin: 'hǎo', meaning: 'tốt, khỏe', examples: [] },
      { id: 'v5', hanzi: '大家', pinyin: 'dàjiā', meaning: 'mọi người', examples: [] },
      { id: 'v6', hanzi: '谢谢', pinyin: 'xièxie', meaning: 'cảm ơn', examples: [] },
    ],
  },
  vocabulary: {
    title: 'Từ mới',
    words: [
      {
        id: 'v1',
        hanzi: '你好',
        pinyin: 'nǐ hǎo',
        meaning: 'xin chào',
        sinoVietnamese: 'Nhĩ hảo',
        examples: [
          { hanzi: 'AI小语，你好！', pinyin: 'AI Xiǎoyǔ, nǐ hǎo!', meaning: 'Chào AI Tiểu Ngữ!' },
          { hanzi: '你好，我是王老师。', pinyin: 'Nǐ hǎo, wǒ shì Wáng lǎoshī.', meaning: 'Xin chào, tôi là cô Vương.' }
        ]
      },
      {
        id: 'v5',
        hanzi: '大家',
        pinyin: 'dàjiā',
        meaning: 'mọi người',
        sinoVietnamese: 'Đại gia',
        examples: [
          { hanzi: '大家好！', pinyin: 'Dàjiā hǎo!', meaning: 'Chào mọi người!' }
        ]
      },
      {
        id: 'v4',
        hanzi: '好',
        pinyin: 'hǎo',
        meaning: 'tốt, khỏe',
        sinoVietnamese: 'Hảo',
        examples: [
          { hanzi: '你好！', pinyin: 'Nǐ hǎo!', meaning: 'Xin chào!' }
        ]
      },
      {
        id: 'v3',
        hanzi: '老师',
        pinyin: 'lǎoshī',
        meaning: 'giáo viên',
        sinoVietnamese: 'Lão sư',
        examples: [
          { hanzi: '王老师，你好！', pinyin: 'Wáng lǎoshī, nǐ hǎo!', meaning: 'Chào cô Vương!' }
        ]
      }
    ]
  },
  flashcards: {
    title: 'Thẻ nhớ nhanh',
    words: [
      {
        id: 'v1',
        hanzi: '你好',
        pinyin: 'nǐ hǎo',
        meaning: 'xin chào',
        examples: [
          { hanzi: 'AI小语，你好！', pinyin: 'AI Xiǎoyǔ, nǐ hǎo!', meaning: 'Chào AI Tiểu Ngữ!' }
        ]
      }
    ]
  },
  grammar: {
    title: 'Ngữ pháp',
    rules: [
      {
        id: 'g1',
        title: 'Đại từ kính trọng “您”',
        explanation: '“您” là dạng kính trọng của “你”, dùng khi nói với người lớn tuổi, cấp trên, người mới quen cần lịch sự.',
        usage: 'Dùng “您” với thầy cô, người lớn tuổi; dùng “你” với bạn bè cùng trang lứa.',
        examples: [
          { hanzi: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!', meaning: 'Chào thầy/cô! (kính trọng)' },
          { hanzi: '您叫什么名字？', pinyin: 'Nín jiào shénme míngzi?', meaning: 'Ông/bà tên là gì?' }
        ],
        practice: {
          questionText: 'Câu 1 - Chào thầy/cô! (kính trọng)',
          wordsToOrder: [
            { id: '1', text: '好' },
            { id: '2', text: '您' },
            { id: '3', text: '老师' },
          ],
          correctOrderIds: ['3', '2', '1'] // 老师 您 好
        }
      }
    ]
  },
  conversation: {
    title: 'Hội thoại',
    turns: [
      { id: 't1', role: 'Vương Nhất Phi (cô Vương)', avatar: '王', hanzi: 'AI小语，你好！', pinyin: 'AI Xiǎoyǔ, nǐ hǎo!', meaning: 'Chào AI Tiểu Ngữ!' },
      { id: 't2', role: 'AI Tiểu Ngữ', avatar: '语', hanzi: '王老师，你好！', pinyin: 'Wáng lǎoshī, nǐ hǎo!', meaning: 'Chào cô Vương!' }
    ]
  },
  fillBlank: {
    title: 'Điền vào chỗ trống',
    choices: [
      { id: 'c1', text: '你好', pinyin: 'nǐ hǎo' },
      { id: 'c2', text: '不客气', pinyin: 'bú kèqi' },
      { id: 'c3', text: '同学', pinyin: 'tóngxué' },
      { id: 'c4', text: '明天', pinyin: 'míngtiān' }
    ],
    questions: [
      {
        id: 'q1',
        speaker: '1',
        parts: [{ type: 'text', content: 'A: ' }, { type: 'blank' }, { type: 'text', content: ' ! B: 你好！' }],
        expectedChoiceId: 'c1',
        hint: 'Gợi ý: 你好 / 谢谢 / 再见'
      },
      {
        id: 'q2',
        speaker: '2',
        parts: [{ type: 'text', content: '谢谢你的帮助！ — A: ' }, { type: 'blank' }, { type: 'text', content: ' ，这是我应该做的。' }],
        expectedChoiceId: 'c2',
        hint: 'Gợi ý: 不客气 / 同学 / 再见'
      },
      {
        id: 'q3',
        speaker: '3',
        parts: [{ type: 'blank' }, { type: 'text', content: ' 们，你们好！' }],
        expectedChoiceId: 'c3',
        hint: 'Gợi ý: 同学 / 老师 / 谢谢'
      }
    ]
  },
  arranging: {
    title: 'Sắp xếp thành câu',
    questions: [
      {
        id: 'aq1',
        meaning: 'Chào các bạn!',
        words: [
          { id: 'w1', text: '你们', pinyin: 'nǐmen' },
          { id: 'w2', text: '好', pinyin: 'hǎo' }
        ],
        correctOrderIds: ['w1', 'w2']
      },
      {
        id: 'aq2',
        meaning: 'Các bạn học, tạm biệt!',
        words: [
          { id: 'w3', text: '再见', pinyin: 'zàijiàn' },
          { id: 'w4', text: '同学们', pinyin: 'tóngxuémen' }
        ],
        correctOrderIds: ['w4', 'w3']
      }
    ]
  },
  matching: {
    title: 'Nối câu',
    leftItems: [
      { id: 'l1', content: 'AI小语，你好！', pinyin: 'AI Xiǎoyǔ, nǐ hǎo!' },
      { id: 'l2', content: '大家好！', pinyin: 'Dàjiā hǎo!' },
      { id: 'l3', content: '你们好！', pinyin: 'Nǐmen hǎo!' }
    ],
    rightItems: [
      { id: 'r1', content: '你好，小语！', pinyin: 'Nǐ hǎo, Xiǎoyǔ!' },
      { id: 'r2', content: '老师，再见！', pinyin: 'Lǎoshī, zàijiàn!' },
      { id: 'r3', content: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!' }
    ],
    pairs: [
      { leftId: 'l1', rightId: 'r1' },
      { leftId: 'l2', rightId: 'r3' },
      { leftId: 'l3', rightId: 'r2' }
    ]
  },
  quiz: {
    title: 'Trắc nghiệm',
    description: 'Chọn đáp án đúng nhất cho các câu hỏi sau.',
    questions: [
      {
        id: 'q1',
        questionText: 'Trong tiếng Trung, "Xin chào" nói như thế nào?',
        options: [
          { id: 'o1', text: '你好 (Nǐ hǎo)' },
          { id: 'o2', text: '再见 (Zàijiàn)' },
          { id: 'o3', text: '谢谢 (Xièxie)' },
          { id: 'o4', text: '老师 (Lǎoshī)' }
        ],
        correctOptionId: 'o1'
      },
      {
        id: 'q2',
        questionText: 'Để chào giáo viên một cách kính trọng, bạn nói câu nào?',
        options: [
          { id: 'o1', text: '大家好！' },
          { id: 'o2', text: '老师，您好！' },
          { id: 'o3', text: '你好，老师！' }
        ],
        correctOptionId: 'o2'
      },
      {
        id: 'q3',
        questionText: 'Ý nghĩa của từ "大家" là gì?',
        options: [
          { id: 'o1', text: 'Học sinh' },
          { id: 'o2', text: 'Thầy cô' },
          { id: 'o3', text: 'Mọi người' },
          { id: 'o4', text: 'Bạn bè' }
        ],
        correctOptionId: 'o3'
      }
    ]
  },
  speaking: {
    title: 'Luyện nói',
    description: 'Hãy bấm Nghe mẫu, sau đó bấm Ghi âm để luyện phát âm.',
    tasks: [
      {
        id: 's1',
        hanzi: '老师，您好！',
        pinyin: 'Lǎoshī, nín hǎo!',
        meaning: 'Chào thầy/cô!'
      },
      {
        id: 's2',
        hanzi: '同学们，再见！',
        pinyin: 'Tóngxuémen, zàijiàn!',
        meaning: 'Các bạn học, tạm biệt!'
      }
    ]
  },
  funFacts: {
    title: 'Có thể bạn chưa biết',
    description: 'Một số thông tin thú vị về văn hóa và ngôn ngữ Trung Quốc.',
    facts: [
      {
        id: 'ff1',
        title: 'Chữ Hán và Bính âm',
        content: 'Chữ Hán không biểu thị cách đọc trực tiếp như chữ Quốc ngữ. Bính âm (Pinyin) là hệ thống phiên âm bằng chữ cái Latinh giúp người học dễ dàng đọc và phát âm tiếng Trung.'
      },
      {
        id: 'ff2',
        title: 'Chào hỏi cơ bản',
        content: 'Người Trung Quốc thường chào nhau bằng câu "你好" (Xin chào). Trong các tình huống trang trọng hoặc với người lớn tuổi, họ dùng "您好" để thể hiện sự tôn trọng.'
      }
    ]
  },
  finalTest: {
    title: 'Kiểm tra tổng hợp',
    description: 'Làm đúng toàn bộ các câu hỏi để hoàn thành bài học.',
    questions: [
      {
        id: 'ft1',
        type: 'QUIZ',
        quizData: {
          title: 'Trắc nghiệm',
          questions: [
            {
              id: 'q1',
              questionText: 'Trong tiếng Trung, "Xin chào" nói như thế nào?',
              options: [
                { id: 'o1', text: '你好 (Nǐ hǎo)' },
                { id: 'o2', text: '再见 (Zàijiàn)' },
                { id: 'o3', text: '谢谢 (Xièxie)' },
                { id: 'o4', text: '老师 (Lǎoshī)' }
              ],
              correctOptionId: 'o1'
            }
          ]
        }
      },
      {
        id: 'ft2',
        type: 'ARRANGING',
        arrangingData: {
          title: 'Sắp xếp thành câu',
          questions: [
            {
              id: 'aq1',
              meaning: 'Chào các bạn!',
              words: [
                { id: 'w1', text: '你们', pinyin: 'nǐmen' },
                { id: 'w2', text: '好', pinyin: 'hǎo' }
              ],
              correctOrderIds: ['w1', 'w2']
            }
          ]
        }
      },
      {
        id: 'ft3',
        type: 'FILL_BLANK',
        fillBlankData: {
          title: 'Điền vào chỗ trống',
          choices: [
            { id: 'c3', text: '同学', pinyin: 'tóngxué' },
          ],
          questions: [
            {
              id: 'q3',
              speaker: '3',
              parts: [{ type: 'blank' }, { type: 'text', content: ' 们，你们好！' }],
              expectedChoiceId: 'c3',
              hint: 'Gợi ý: 同学 / 老师 / 谢谢'
            }
          ]
        }
      },
      {
        id: 'ft4',
        type: 'MATCHING',
        matchingData: {
          title: 'Nối câu',
          leftItems: [
            { id: 'l1', content: 'AI小语，你好！', pinyin: 'AI Xiǎoyǔ, nǐ hǎo!' },
            { id: 'l2', content: '大家好！', pinyin: 'Dàjiā hǎo!' },
          ],
          rightItems: [
            { id: 'r1', content: '你好，小语！', pinyin: 'Nǐ hǎo, Xiǎoyǔ!' },
            { id: 'r2', content: '老师，再见！', pinyin: 'Lǎoshī, zàijiàn!' },
          ],
          pairs: [
            { leftId: 'l1', rightId: 'r1' },
            { leftId: 'l2', rightId: 'r2' }
          ]
        }
      },
      {
        id: 'ft5',
        type: 'WARM_UP',
        warmUpData: {
          title: 'Khởi động',
          description: 'Nối nghĩa tiếng Việt với từ tiếng Trung',
          items: [
            { id: 'wu1', meaning: 'xin chào', expectedVocabId: 'v1' },
            { id: 'wu2', meaning: 'tạm biệt', expectedVocabId: 'v2' },
          ],
          choices: [
            { id: 'v1', hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'xin chào', examples: [] },
            { id: 'v2', hanzi: '再见', pinyin: 'zàijiàn', meaning: 'tạm biệt', examples: [] },
          ]
        }
      }
    ]
  }
};
