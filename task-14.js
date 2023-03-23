var groupBy = function (array, groupFn) {
    var result = {};
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        var groupKey = typeof groupFn === "function" ? groupFn(element) : element[groupFn];
        if (groupKey in result) {
            result[groupKey].push(element);
        }
        else {
            result[groupKey] = [element];
        }
    }
    return result;
};
// console.log(groupBy([6.1, 4.2, 6.3], Math.floor)) // -> { '4': [4.2], '6': [6.1, 6.3] }
// console.log(groupBy(['one', 'two', 'three'], 'length')) // -> { '3': ['one', 'two'], '5': ['three'] }
