// 给定一个指定的数组，[1,3,5,19,29],找出最接近平均数的值。

function getClosestAvgNumber(arr) {
  const sum = arr.reduce((a, b) => a + b);
  const len = arr.length;
  const avg = parseFloat(sum / len).toFixed(2);
  console.log('avg', avg);
  let targetIndex = 0,
    temp = null;
  arr.sort((a, b) => a - b);
  arr.forEach((itm, idx) => {
    const result = avg - itm;
    if (temp && temp > Math.abs(result)) {
      targetIndex = idx;
      temp = result;
    } else {
      temp = result;
    }
  });
  return arr[targetIndex];
}

console.log('target', getClosestAvgNumber([1, 2, 3, 45, 6, 7, 78, 20]));
