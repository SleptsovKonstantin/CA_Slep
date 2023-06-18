//  1 Напишите функцию, которая определяет уникальны ли все символы в строке. Регистр должен учитываться: 'a' и 'A' разные символы.

var isUnique = function (string) {
    var currentArray = string.split("");
    for (var i = 0; i < currentArray.length; i++) {
        for (var g = i + 1; g < currentArray.length; g++) {
            if (currentArray[i] === currentArray[g]) {
                return false;
            }
        }
        return true;
    }
};
console.log(isUnique("abcdef")); // -> true
console.log(isUnique("1234567")); // -> true
console.log(isUnique("abcABC")); // -> true
console.log(isUnique("abcadef")); // -> false
