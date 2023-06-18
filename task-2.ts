// 2 Напишите функцию, принимающая массив с вложенными массивами и распакуйте в результирующий плоский массов. В результате должны получить новый одномерный массив.

const flatten = (arr: (number | number[])[]): number[] => {
  const flatArray: number[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flatArray.push(...flatten(item));
    } else {
      flatArray.push(item);
    }
  });
  return flatArray;
}
// console.log(flatten([[1], [[2, 3]], [[[4]]]])); // -> [1, 2, 3, 4]
