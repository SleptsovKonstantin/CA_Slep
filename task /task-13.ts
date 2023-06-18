// 13 Напишите функцию, которая будет генерировать последовательность Фиббоначи длинны n, которую передали как аргумент.
const fibonacci = (n: number): number[] => {
  const resultArr: number[] = [];
  const num0: number = 0;
  const num1: number = 1;

  if (n === 0) {
    resultArr.push(num0);
  } else if (n === 1) {
    resultArr.push(num0, num1);
  } else {
    resultArr.push(num0, num1);

    for (let i = 1; i < n; i++) {
      let sum = resultArr.at(-1) + resultArr.at(-2);
      resultArr.push(sum);
    }
  }

  return resultArr;
};
console.log(fibonacci(8)); // -> [1, 1, 2, 3, 5, 8, 13, 21]
