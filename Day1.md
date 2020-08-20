# daily-algorithm


# 调整数组顺序

**1.输入一个整数数组,实现一个函数来调整该数组中数字的顺序,使得所有的奇数位于数组的前半部分,所有偶数位于数组的后半部分.**

> 假设原数组为arr, 新数组为 newArr.

### 思路:
1. 使用 `arr[i] % 2`对 2 进行取模判断奇偶.
2. 遍历 arr,当遇到奇数时,使用 newArr.unshift(),将数组子项,添加到数组头部.
当遇到偶数时,使用 newArr.push(),将数组子项,添加到数组的尾部.

```javascript
function sortArr(arr) {
    let newArr = [], i = 0;
    while(newArr.length < arr.length) {
        if (arr[i] % 2 == 0) {
            newArr.push(arr[i]);
        } else {
            newArr.unshift(arr[i]);
        }
        i++;
    }
    return newArr;
}
```

