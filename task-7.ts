// 7 Напишите функцию, которая проверяет, являются ли все элементы в массиве анаграммами друг друга.
const allAnagrams = (arr: string[]): boolean => {
  const firstWord: string = arr[0];
  const charCount: { [key: string]: number } = {};
  for (let i = 0; i < firstWord.length; i++) {
    charCount[firstWord[i]] = (charCount[firstWord[i]] || 0) + 1;
  }

  for (let i = 1; i < arr.length; i++) {
    const word: string = arr[i];
    const wordCharCount: { [key: string]: number } = {};
    for (let j = 0; j < word.length; j++) {
      wordCharCount[word[j]] = (wordCharCount[word[j]] || 0) + 1;
    }

    if (Object.keys(charCount).length !== Object.keys(wordCharCount).length) {
      return false;
    }

    for (const char in charCount) {
      if (charCount[char] !== wordCharCount[char]) {
        return false;
      }
    }
  }

  return true;
};

// console.log(allAnagrams(['abcd', 'bdac', 'cabd'])) // true
// console.log(allAnagrams(['abcd', 'bdXc', 'cabd'])) // false
