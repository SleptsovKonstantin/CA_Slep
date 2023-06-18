// 6 Напишите функцию, которая проверяет, является ли второй массив подмножеством первого. То есть есть ли элементы второго массива в первом.
var arraySubset = function (arr1, arr2) {
    var counter = {};
    for (var i = 0; i < arr1.length; i++) {
        counter[arr1[i]] = (counter[arr1[i]] || 0) + 1;
    }
    for (var i = 0; i < arr2.length; i++) {
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
