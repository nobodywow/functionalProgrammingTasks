
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

//task 1 for 1 parameter only

function partApp(parameter, func) {
    newFunc = func.bind(null, parameter);
    return newFunc;
}


//task1 for multiple params

function partApp2(func) {
    if(arguments.length > 1) {
        var boundArgs = arguments.slice(1);
        return function() {
            return func.apply(null, boundArgs.concat(arguments))
        }
    }
}

// task 11

function memoization(func) {
    var cache = {};
    return function() {
        var arg = arguments[0];
        if (cache[arg]) {
            return cache[arg];
        }
        else {           
            var f = func.call(null, arg);
            cache[arg] = f;
            return f;
        }
    }    
}

//task4 w/o generator

function unfold(callback, value) {
    var result = [];
    var current = value;
    var done = false;    
    var {current, next, done} = callback(current);
    while(!done) {  
        result.push(current);      
        var {current, next, done} = callback(next);                
    }
    return result;
}

//task4 test 
console.log(unfold(
    (n) => n > 0 
    ? {
        current: n,
        next: n - 1
    }
    : { done: true}
, 5));


//task4 w/ generator

function unfoldGenerator(callback, value) {
    var result = [];
    var current = value;
    function * gen(value) {
        var {current, next, done} = callback(value);
        if(!done) {
            result.push(current);            
            yield * gen(next); 
        }        
    }
    var unfold = gen(current);
    unfold.next();
    return result;
}

//task 4 w/ generator test


console.log(unfoldGenerator(
    (n) => n > 0 
    ? {
        current: n,
        next: n - 1
    }
    : { done: true}
, 5));



//task8

var counter = 0;

var randomSum = unfold(
    function(n) {
        if(counter < 10) {
            counter = counter + 1;
            return {
                current: n,
                next: Math.floor(Math.random() * 100)
            }
        }
        else {
            return {
                done: true
            }
        }                
    }, Math.floor(Math.random() * 100));

console.log(newReduce(randomSum, function(accum, item) {
    return accum + item;
}, 0));
