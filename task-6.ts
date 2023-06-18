// 6 Напишите функцию, которая проверяет, является ли второй массив подмножеством первого. То есть есть ли элементы второго массива в первом.

const arraySubset = (arr1: number[], arr2: number[]): boolean => {
  const counter: { [key: string]: number } = {};
  for (let i = 0; i < arr1.length; i++) {
    counter[arr1[i]] = (counter[arr1[i]] || 0) + 1;
  }

  for (let i = 0; i < arr2.length; i++) {
    if (!counter[arr2[i]]) {
      return false;
    }
    counter[arr2[i]]--;
  }

  return true;
};
// console.log(arraySubset([2, 1, 3], [1, 2, 3])) // -> true
// console.log(arraySubset([2, 1, 1, 3], [1, 2, 3])) // -> true
// console.log(arraySubset([1, 1, 1, 3], [1, 3, 3])) // -> false
// console.log(arraySubset([1, 2], [1, 2, 3])) // -> false
