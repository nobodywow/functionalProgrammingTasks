
//task 5

function newMap(array, callback) {
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
        newArray[i] = callback(array[i]);
    }
    return newArray;
}

//task6

function newFilter(array, callback) {
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

//task3 ?

function newReduce(array, callback, initialValue) {
    var prevElem = initialValue;
    for(var i = 0; i < array.length; i++) {        
        prevElem = callback(prevElem, array[i], i, array);
    }
    return prevElem;
}

//task 7

var array = [1,23,2,6,12,0];

var evenNumbersSum = newReduce(array, function(accum, item) {
    if(item % 2 == 0) {
        accum.sum = accum.sum + item;
        accum.count = accum.count + 1;
    }
    return accum;
}, {sum: 0, count: 0});

var answer = evenNumbersSum.sum / evenNumbersSum.count;
console.log(answer);

//task 9

function filterFirstElem(array, callback) {
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            return array[i];
        }
    }
}