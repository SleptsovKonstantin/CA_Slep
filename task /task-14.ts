// 14 Напишите функцию groupBy.
type GroupFn<T> = (item: T) => string | number;

const groupBy = <T>(
  array: T[],
  groupFn: string | GroupFn<T>
): Record<string | number, T[]> => {
  const result: Record<string | number, T[]> = {};
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const groupKey =
      typeof groupFn === "function" ? groupFn(element) : element[groupFn];
    if (groupKey in result) {
      result[groupKey].push(element);
    } else {
      result[groupKey] = [element];
    }
  }
  return result;
};
// console.log(groupBy([6.1, 4.2, 6.3], Math.floor)) // -> { '4': [4.2], '6': [6.1, 6.3] }
// console.log(groupBy(['one', 'two', 'three'], 'length')) // -> { '3': ['one', 'two'], '5': ['three'] }
