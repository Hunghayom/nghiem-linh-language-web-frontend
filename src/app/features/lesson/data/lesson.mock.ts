import { LessonData } from '../models/lesson.data';

export const MOCK_LESSON_DATA: LessonData = {
  lessonId: '1',
  warmUp: {
    title: 'Xin chào!',
    description: 'Trong bài học này, chúng ta sẽ làm quen với các từ vựng cơ bản để chào hỏi trong tiếng Trung.',
    imageUrls: [
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop', // Ảnh minh họa vẫy tay chào
    ],
    keywords: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
      { hanzi: '再见', pinyin: 'zài jiàn', meaning: 'Tạm biệt' }
    ]
  },
  vocabulary: {
    title: 'Từ vựng mới',
    description: 'Hãy lắng nghe và ghi nhớ các từ vựng sau đây:',
    words: [
      {
        id: 'v1',
        hanzi: '你',
        pinyin: 'nǐ',
        meaning: 'bạn, anh, chị (ngôi thứ 2 số ít)',
        exampleHanzi: '你好',
        examplePinyin: 'nǐ hǎo',
        exampleMeaning: 'Xin chào bạn'
      },
      {
        id: 'v2',
        hanzi: '好',
        pinyin: 'hǎo',
        meaning: 'tốt, khỏe, hay',
        exampleHanzi: '很好',
        examplePinyin: 'hěn hǎo',
        exampleMeaning: 'Rất tốt'
      },
      {
        id: 'v3',
        hanzi: '我',
        pinyin: 'wǒ',
        meaning: 'tôi, mình (ngôi thứ 1 số ít)',
        exampleHanzi: '我很好',
        examplePinyin: 'wǒ hěn hǎo',
        exampleMeaning: 'Tôi rất khỏe'
      },
      {
        id: 'v4',
        hanzi: '叫',
        pinyin: 'jiào',
        meaning: 'gọi là, tên là',
        exampleHanzi: '我叫小明',
        examplePinyin: 'wǒ jiào Xiǎomíng',
        exampleMeaning: 'Tôi tên là Tiểu Minh'
      }
    ]
  },
  flashcards: {
    title: 'Ôn tập thẻ ghi nhớ',
    words: [
      { id: 'f1', hanzi: '你', pinyin: 'nǐ', meaning: 'bạn' },
      { id: 'f2', hanzi: '好', pinyin: 'hǎo', meaning: 'tốt' },
      { id: 'f3', hanzi: '我', pinyin: 'wǒ', meaning: 'tôi' },
      { id: 'f4', hanzi: '叫', pinyin: 'jiào', meaning: 'tên là' }
    ]
  },
  grammar: {
    title: 'Cấu trúc câu cơ bản',
    rules: [
      {
        id: 'g1',
        title: 'Đại từ nhân xưng + 叫 + Tên',
        explanation: 'Dùng để giới thiệu tên của ai đó.',
        structure: 'Chủ ngữ + 叫 (jiào) + Tên riêng',
        examples: [
          {
            hanzi: '我叫玛丽。',
            pinyin: 'wǒ jiào Mǎlì.',
            meaning: 'Tôi tên là Mary.',
            highlights: ['我', '叫']
          },
          {
            hanzi: '他叫大卫。',
            pinyin: 'tā jiào Dàwèi.',
            meaning: 'Anh ấy tên là David.',
            highlights: ['他', '叫']
          }
        ]
      }
    ]
  }
};
