//  1 Напишите функцию, которая определяет уникальны ли все символы в строке. Регистр должен учитываться: 'a' и 'A' разные символы.

const isUnique = (string: string): boolean => {
  let currentArray: string[] = string.split("");
  for (let i = 0; i < currentArray.length; i++) {
    for (let g = i + 1; g < currentArray.length; g++) {
      if (currentArray[i] === currentArray[g]) {
        return false;
      }
    }
    return true;
  }
};

console.log(isUnique("abcdef")); // -> true
console.log(isUnique("1234567")); // -> true
console.log(isUnique("abcABC")); // -> true
console.log(isUnique("abcadef")); // -> false
