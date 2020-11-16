# 找出两个链表的公共节点

**1.输入两个链表，找出它们的第一个公共节点。**
> 注意：如果两个链表没有交点，返回null
在返回结果后，两个链表仍须保持原有的结构。<br>
可假定整个链表结构中没有循环。 
程序尽量满足O(n）时间复杂度，且仅用0(1）内存

<hr />

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