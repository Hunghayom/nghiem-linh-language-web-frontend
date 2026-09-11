/**
 * Xáo trộn ngẫu nhiên một mảng (Fisher-Yates Shuffle).
 * Trả về một mảng MỚI, không làm thay đổi mảng gốc.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
