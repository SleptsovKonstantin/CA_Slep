// 12 Напишите функцию, которая будет проверять на “глубокое” равенство 2 входящих параметра
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (typeof a !== typeof b) {
    return false;
  }

  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

// const source = {a: 1, b: {c: 1}}
// const test1 = {a: 1, b: {c: 1}}
// const test2 = {a: 1, b: {c: 2}}

// console.log(deepEqual(source, test1)) // -> true
// console.log(deepEqual(source, test2)) // -> false
// console.log(deepEqual(NaN, NaN)) // -> true

// console.log(deepEqual('test', 'test!')) // -> false
// console.log(deepEqual()) // -> true