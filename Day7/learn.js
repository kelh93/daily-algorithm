// 实现 add(1)(2)(3);

// 柯里化
// 参数长度固定
const curry = (fn) =>
  (judge = (...args) => (args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)));

// 翻译之后的写法
const curry2 = (fn) => {
  return function judge(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return (...arg) => {
        // judge一直返回的是函数, 在这里将所有参数都进行合并。
        return judge(...args, ...arg);
      };
    }
  };
};

// const add = (a, b, c) => a + b + c;
// const curryAdd = curry2(add);
// console.log(curryAdd(1)(2)(3));
// console.log(curryAdd(1, 2)(3));
// console.log(curryAdd(1)(2, 3));
// console.log(curryAdd(1, 2, 3));
// 核心思想：参数合并计算。

// 2. 参数不固定
function add(...args) {
  return args.reduce((a, b) => a + b);
}

function currying(fn) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      // 最后一个括号会走到这里，前面已经将所有的参数进行了合并，保存在args变量下。
      // 使用apply执行fn(...args),进而得到val，同时清空args以便下次调用。
      let val = fn.apply(this, args);
      args = []; // 保证再次调用时清空
      return val;
    }
  };
}

let addCurry = currying(add);
console.log(addCurry(1)(2)(3)(4, 5)()); // 15
console.log(addCurry(1)(2)(3, 4, 5)()); // 15
console.log(addCurry(1)(2, 3, 4, 5)()); // 15
