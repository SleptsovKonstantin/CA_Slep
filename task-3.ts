// 3 Напишите функцию, которая принимает строку и возвращает новую, в которой все дублирующиеся символы будут удалены.
const removeDupes = (str: string): string => {
  let uniqueStr: string = "";
  for (let i = 0; i < str.length; i++) {
    if (!uniqueStr.includes(str[i])) {
      uniqueStr += str[i];
    }
  }
  return uniqueStr;
};

// console.log(removeDupes('abcd')) // -> 'abcd'
// console.log(removeDupes('aabbccdd')) // -> 'abcd'
// console.log(removeDupes('abcddbca')) // -> 'abcd'
// console.log(removeDupes('abababcdcdcd')) // -> 'abcd'