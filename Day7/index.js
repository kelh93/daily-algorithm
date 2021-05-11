// 固定参数长度
function curry(fn) {
  if (typeof fn !== 'function') {
    throw new Error('expect a function');
  }
  return function dosth(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return (...arg) => {
        return dosth(...args, ...arg);
      };
    }
  };
}

// 不固定参数长度
function curry2(fn) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      let val = fn.apply(this, args);
      args = [];
      return val;
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

// function add(...args) {
//   return args.reduce((a, b) => a + b);
// }

// curry(add)(1)(2);
console.log('result', curry(add)(1)(2)(3));
console.log('result', curry(add)(1)(2, 3));

// 查看lodash的curry实现。
// 思考点： 如何让参数可以自由组合的传递。fn(a, b)(c); fn(a)(b, c);
