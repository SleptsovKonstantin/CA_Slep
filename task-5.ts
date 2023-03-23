// 5 Напишите функцию, которая принимает 2 строки. Верните true если строки являются перевернутым вариантом друг друга (см. пример). Иначе верните false.
const isStringRotated  = (source: string, test: string): boolean => {
    if (source.length !== test.length) {
        return false;
    }
    const combinedStr = source + source;
    return combinedStr.includes(test);
}
// console.log(isStringRotated('javascript', 'scriptjava')) // -> true
// console.log(isStringRotated('javascript', 'iptjavascr')) // -> true
// console.log(isStringRotated('javascript', 'java')) // -> false

