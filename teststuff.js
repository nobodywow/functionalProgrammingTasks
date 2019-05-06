// function memoization(func) {
//     var cache = {};
//     console.log(func.length);
//     return function() {
//         if (cache[arguments[0]]) {
//             return cache[arguments[0]];
//         }
//         else {           
//             console.log(arguments[0]);
//             var f = func.call(null, arguments[0]);
//             cache[arguments[0]] = f;
//             console.log(f);
//             return f;
//         }

//         // var f = func.call(null, 1);
//         // console.log(arguments);
//         // return f;
//     }    
// }

// var ayy = memoization(function(a) {
//     console.log(a);
//     return 10;
// });

// console.log(ayy(1,2,3,4));


// task2 test


// function curry(func) {
//     var argsLength = func.length;
//     return function() {
                        
//     }
// }


// var curry = (fn, ...args) =>
//   (fn.length <= args.length) ?
//     fn(...args) :
//     (...more) => curry(fn, ...args, ...more);


// task 4

// function unfold(callback, value) {
//     var result = [];
//     var current = value;
//     var done = false;    
//     var {current, next, done} = callback(current);
//     while(!done) {  
//         result.push(current);      
//         var {current, next, done} = callback(next);                
//     }
//     return result;
// }


// function unfoldGenerator(callback, value) {
//     var result = [];
//     var current = value;
//     function * gen(value) {
//         var {current, next, done} = callback(value);
//         if(!done) {
//             result.push(current);            
//             yield * gen(next); 
//         }        
//     }
//     var unfold = gen(current);
//     unfold.next();
//     return result;
// }



// console.log(unfoldGenerator(
//     (n) => n > 0 
//     ? {
//         current: n,
//         next: n - 1
//     }
//     : { done: true}
// , 5));



// function sumCall(a) {
//     var sum = a;
//     function f(b) {
//         sum = sum + b; 
//         return f;
//     }
//     return f;
// }


// function curry(func) {
//     function f(arg) {
//         if(func.length < f.length)
//         {
//             return func(...arg);
//         }
//         else {    
//             return function(argsCurried) {
//                 func(...arg, ...argsCurried);
//             }        
//         }        
//     }
//     return f;    
// }

// function sum(a,b,c) {
//     return a+b+c;
// }

// var ayy = curry(sum);
// console.log(ayy(1)(2)(3));



// console.log(sumCall(1)(2)(3)(4)(5));

//task 8

// function newReduce(array, callback, initialValue) {
//     var prevElem = initialValue;
//     for(var i = 0; i < array.length; i++) {        
//         prevElem = callback(prevElem, array[i], i, array);
//     }
//     return prevElem;
// }

// function unfold(callback, value) {
//     var result = [];
//     var current = value;
//     var done = false;    
//     var {current, next, done} = callback(current);
//     while(!done) {  
//         result.push(current);      
//         var {current, next, done} = callback(next);                
//     }
//     return result;
// }


// var counter = 0;

// var randomSum = unfold(
//     function(n) {
//         if(counter < 10) {
//             counter = counter + 1;
//             return {
//                 current: n,
//                 next: Math.floor(Math.random() * 100)
//             }
//         }
//         else {
//             return {
//                 done: true
//             }
//         }                
//     }, Math.floor(Math.random() * 100));

// console.log(newReduce(randomSum, function(accum, item) {
//     return accum + item;
// }, 0));





function partApp2(func) {
    if(arguments.length > 1) {
        var boundArgs = Array.prototype.slice.call(arguments, 1);
        return function() {
            return func.apply(null, boundArgs.concat(Array.prototype.slice.call(arguments)));
        }
    }
}



function curry(func) {
    function f(arg) {
        var tempArguments = Array.prototype.slice.call(arguments);
        if(func.length <= tempArguments.length)
        {
            return func.apply(null, tempArguments);
        }
        else {    
            return function(argsAfter) {
                var newArgs = Array.prototype.concat.call(f, tempArguments.concat(argsAfter));
                return partApp2.apply(null, newArgs);
            }        
        }        
    }
    return f;    
}

var test = function(a,b,c) {
    return a+b+c;
}

var newF = curry(test);
console.log(newF(1)(4)(3));

