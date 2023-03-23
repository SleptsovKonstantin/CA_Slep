// 5 Напишите функцию, которая принимает 2 строки. Верните true если строки являются перевернутым вариантом друг друга (см. пример). Иначе верните false.
var isStringRotated = function (source, test) {
    if (source.length !== test.length) {
        return false;
    }
    var combinedStr = source + source;
    return combinedStr.includes(test);
};
// console.log(isStringRotated('javascript', 'scriptjava')) // -> true
// console.log(isStringRotated('javascript', 'iptjavascr')) // -> true
// console.log(isStringRotated('javascript', 'java')) // -> false
