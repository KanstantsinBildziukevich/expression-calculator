function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let countOpen = 0;
    let countClose = 0;
    for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
        countOpen++; 
    };
    if (expr[i] === ')') {
        countClose++; 
    }
    }
    if (countOpen !== countClose) {
    throw new Error('ExpressionError: Brackets must be paired');
    }

    let arr = [];
    let arr2 = [];
    let n = '';
    for (let i = 0; i < expr.length; i++) {
    if (!isNaN(Number(expr[i]))) {
        n += expr[i];
        expr.slice(i, i + 1);
    } else {
        arr2.push(n);
        arr2.push(expr[i]);
        n = '';
    }
    if (!expr[i + 1]) {
        arr2.push(n);
        n = '';
    }
    }

    for (let i = 0; i < arr2.length; i++) {
    if (isNaN(parseInt(arr2[i])) && arr2[i] !== ' ' && arr2[i] !== '') {
        arr.push(arr2[i]);
    }; 
    if (parseInt(arr2[i]) || parseInt(arr2[i]) === 0) {
        arr.push(parseInt(arr2[i]));
    }
    }

    function calc(arr) {
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] === '*') {
        let result = arr[i - 1] * arr[i + 1];
        arr.splice(i - 1, 3, result);
        i--; 
        }; 
        if (arr[i] === '/' && arr[i + 1] !== 0) {
        let result = arr[i - 1] / arr[i + 1];
        arr.splice(i - 1, 3, result);
        i--;
        } else if (arr[i] === '/' && arr[i + 1] === 0) {
        throw new TypeError('TypeError: Division by zero.');   
        }
    }
    for (let i = 0; i < arr.length; i++) {  
        if (arr[i] === '+') {
        let result = arr[i - 1] + arr[i + 1];
        arr.splice(i - 1, 3, result);
        i--;
        };  
        if (arr[i] === '-') {
        let result = arr[i - 1] - arr[i + 1];
        arr.splice(i - 1, 3, result);
        i--;
        }; 
    }
    return arr;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === '(') {
        let arrBrackets = [];
        for (let j = i + 1; j < arr.indexOf(')', i + 1); j++) {
            arrBrackets.push(arr[j]);
        }
        arrBrackets = calc(arrBrackets);
        let result = Number(arrBrackets.join(''));
        arr.splice(i, arr.indexOf(')', i) - i + 1, result);
        }

    }

    arr = calc(arr);
    return Number(arr.join(''));
}

module.exports = {
    expressionCalculator
}