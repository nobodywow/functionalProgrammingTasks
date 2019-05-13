//task 1 for 1 parameter only

function partApp(parameter, func) {
    newFunc = func.bind(null, parameter);
    return newFunc;
}

//task1 for multiple params

function partAppMultipleArgs(func) {
    if(arguments.length > 1) {
        var boundArgs = Array.prototype.slice.call(arguments, 1);
        return function() {
            return func.apply(null, boundArgs.concat(Array.prototype.slice.call(arguments)));
        }
    }
    else {
        return func;
    }
}

//task2 

function curry(func) {
    function f(arg) {
        var funcArguments = Array.prototype.slice.call(arguments);
        if(func.length <= funcArguments.length)
        {
            return func.apply(null, funcArguments);
        }
        else {    
            return function(nextCallArgs) {
                return f.apply(null, funcArguments.concat(nextCallArgs));
            }        
        }        
    }
    return f;    
}

//task2 with partApp

function curryWithPartApp(func) {
    function f(arg) {
        var funcArguments = Array.prototype.slice.call(arguments);
        if(func.length <= funcArguments.length)
        {
            return func.apply(null, funcArguments);
        }
        else {    
            return function(nextCallArgs) {
                var argsToCallAgain = Array.prototype.concat.call(f, funcArguments.concat(nextCallArgs));
                return partAppMultipleArgs.apply(null, argsToCallAgain);
            }        
        }        
    }
    return f;
}

//task3 

function newReduce(array, callback, initialValue) {
    var currentState = initialValue;
    for(var i = 0; i < array.length; i++) {        
        currentState = callback(currentState, array[i], i, array);
    }
    return currentState;
}

//task4 w/o generator

function unfold(callback, initialValue) {
    var result = [];
    var current = initialValue;
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

function unfoldGenerator(callback, initialValue) {
    var result = [];
    var current = initialValue;
    function * unfoldGenerator(initialValue) {
        var {current, next, done} = callback(initialValue);
        if(!done) {
            result.push(current);            
            yield * unfoldGenerator(next); 
        }        
    }
    var unfold = unfoldGenerator(current);
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

//task 5

function newMap(array, callback) {
    var newArray = new Array(array.length);
    for(var i = 0; i < array.length; i++) {
        newArray[i] = callback(array[i]);
    }
    return newArray;
}

//task6

function newFilter(array, callback) {
    var filteredArray = [];
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
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


//task8

function getRandomElem() {
    return Math.floor(Math.random() * 100);
}

var randomSum = unfold(
    function(n) {
        if(n > 0) {
            console.log(n);
            return {
                current: getRandomElem(),
                next: n - 1
            }
        }
        return {
            done: true
        }
    }, 10);

console.log(newReduce(randomSum, function(accum, item) {
    return accum + item;
}, 0));


//task 9

function filterFirstElem(array, callback) {
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            return array[i];
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
            var nonCachedResult = func.call(null, arg);
            cache[arg] = nonCachedResult;
            return nonCachedResult;
        }
    }    
}