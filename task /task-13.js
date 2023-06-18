// 13 Напишите функцию, которая будет генерировать последовательность Фиббоначи длинны n, которую передали как аргумент.
var fibonacci = function (n) {
    var resultArr = [];
    var num0 = 0;
    var num1 = 1;
    if (n === 0) {
        resultArr.push(num0);
    }
    else if (n === 1) {
        resultArr.push(num0, num1);
    }
    else {
        resultArr.push(num0, num1);
        for (var i = 1; i < n; i++) {
            var sum = resultArr.at(-1) + resultArr.at(-2);
            resultArr.push(sum);
        }
    }
    return resultArr;
};
console.log(fibonacci(8)); // -> [1, 1, 2, 3, 5, 8, 13, 21]
