// 10 Напишите функцию, которая проверит строку на сбалансированность скобок: {}, (), []. Вернуть true если они сбалансированы, иначе false.
var isBalanced = function (str) {
    var stack = [];
    var brackets = { "{": "}", "(": ")", "[": "]" };
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        if (brackets[char]) {
            stack.push(brackets[char]);
        }
        else if (char === "}" || char === ")" || char === "]") {
            if (stack.pop() !== char) {
                return false;
            }
        }
    }
    return stack.length === 0;
};
// console.log(isBalanced('(x + y) - (4)')) // -> true
// console.log(isBalanced('(((10 ) ()) ((?)(:)))')) // -> true
// console.log(isBalanced('[{()}]')) // -> true
// console.log(isBalanced('(50)(')) // -> false
// console.log(isBalanced('[{]}')) // -> false
