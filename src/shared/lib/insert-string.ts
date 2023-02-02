export const insertString = (
  baseStr: string,
  subStr: string,
  [selectionStart, selectionEnd]: [number, number]
): string => {
  const start = baseStr.substring(0, selectionStart);
  const end = baseStr.substring(selectionEnd);
  return `${start}${subStr}${end}`;
};
