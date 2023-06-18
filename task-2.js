// 2 Напишите функцию, принимающая массив с вложенными массивами и распакуйте в результирующий плоский массов. В результате должны получить новый одномерный массив.
var flatten = function (arr) {
    var flatArray = [];
    arr.forEach(function (item) {
        if (Array.isArray(item)) {
            flatArray.push.apply(flatArray, flatten(item));
        }
        else {
            flatArray.push(item);
        }
    });
    return flatArray;
};
console.log(flatten([[1], [[2, 3]], [[[4]]]])); // -> [1, 2, 3, 4]
