//Id用にランダムな文字列を生成
export const createRandomId = (): string => {
  return Math.random().toString(32).substring(2);
};
