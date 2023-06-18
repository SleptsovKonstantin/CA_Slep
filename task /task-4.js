// 4 Напишите функцию, которая принимает массив строк и возвращает самую частовстречающуюся строку в этом массиве. Если таких строк несколько, то нужно вернуть первую, идя слева на право.
var highestFrequency = function (array) {
    var frequencies = {};
    var maxFrequency = 0;
    var mostFrequentString;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var str = array_1[_i];
        if (frequencies[str] === undefined) {
            frequencies[str] = 1;
        }
        else {
            frequencies[str]++;
        }
        if (frequencies[str] > maxFrequency) {
            maxFrequency = frequencies[str];
            mostFrequentString = str;
        }
    }
    return mostFrequentString;
};
// console.log(highestFrequency(['a', 'b', 'c', 'c', 'd', 'e'])) // -> c
// console.log(highestFrequency(['abc', 'def', 'abc', 'def', 'abc'])) // -> abc
// console.log(highestFrequency(['abc', 'def'])) // -> abc
// console.log(highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi'])) // -> ghi
