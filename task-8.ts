// 8 Напишите функцию, которая принимает матрицу 3х3 и переворачивает на 90 градусов по часовой стрелке.
// [1, 2, 3]    [7, 4, 1]
// [4, 5, 6] -> [8, 5, 2]
// [7, 8, 9]    [9, 6, 3]
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const rotate = (source: number[][]): number[][] => {
  const newMatrix: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let i = 0; i < source.length; i++) {
    for (let j = 0; j < source[i].length; j++) {
      newMatrix[j][source.length - 1 - i] = source[i][j];
    }
  }

  return newMatrix;
};
// console.log(rotate(matrix))