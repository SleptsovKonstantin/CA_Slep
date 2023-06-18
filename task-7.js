// 7 Напишите функцию, которая проверяет, являются ли все элементы в массиве анаграммами друг друга.
var allAnagrams = function (arr) {
    var firstWord = arr[0];
    var charCount = {};
    for (var i = 0; i < firstWord.length; i++) {
        charCount[firstWord[i]] = (charCount[firstWord[i]] || 0) + 1;
    }

    for (var i = 1; i < arr.length; i++) {
        var word = arr[i];
        var wordCharCount = {};
        for (var j = 0; j < word.length; j++) {
            wordCharCount[word[j]] = (wordCharCount[word[j]] || 0) + 1;
        }

        if (Object.keys(charCount).length !== Object.keys(wordCharCount).length) {
            return false;
        }

        for (var char in charCount) {
            if (charCount[char] !== wordCharCount[char]) {
                return false;
            }
        }
    }
    return true;
};
// console.log(allAnagrams(['abcd', 'bdac', 'cabd'])) // true
// console.log(allAnagrams(['abcd', 'bdXc', 'cabd'])) // false
