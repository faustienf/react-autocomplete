export const selectWord = (baseStr: string, selectionEnd: number) => {
  let startIndex = selectionEnd - 1;
  let endIndex = selectionEnd;

  while (startIndex >= 0 && /\w/.test(baseStr[startIndex])) {
    startIndex -= 1;
  }
  startIndex += 1;

  while (endIndex < baseStr.length && /\w/.test(baseStr[endIndex])) {
    endIndex += 1;
  }

  return {
    startIndex,
    endIndex,
    word: baseStr.substring(startIndex, endIndex),
  };
};
