# 最多能完成排序的块 II  

[leetcode原题](https://leetcode-cn.com/problems/max-chunks-to-make-sorted-ii/)

这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。

arr是一个可能包含重复元素的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。

我们最多能将数组分成多少块？

示例 1:

输入: arr = [5,4,3,2,1]
输出: 1
解释:
将数组分成2块或者更多块，都无法得到所需的结果。
例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。  

示例 2:

输入: arr = [2,1,3,4,4]
输出: 4
解释:
我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。
注意:

arr的长度在[1, 2000]之间。
arr[i]的大小在[0, 10**8]之间。  


## 思路
1. 基于原数组的顺序进行拆分，按拆分的顺序进行拼接。

## 官方题解
> 官方题解java版本
```java
  class Solution {
    public int maxChunksToSorted(int[] arr){
      Map<Integer,Integer> count = new HashMap();
      //ans最多能完成排序的块的个数，nonzero计数目前差值不等于0的字符的个数。
      int ans = 0, nonzero = 0;
      //拷贝原数组到expect
      int[] expect = arr.clone();
      //对expect进行排序，expect已经是排过序的数组。
      Array.sort(expect);
      //遍历原数组
      for(int i = 0; i < arr.length; ++i){
        //x:旧位置的旧值。y:旧位置排序之后的值。
        int x = arr[i], y = expect[i];
        //将数组中的每个子项存储到map中，如果重复则个数增加。
        count.put(x, count.getOrDefault(x, 0) + 1);
        //如果map中的x个数等于0，nonzero+1
        if(count.get(x) == 0) nonzero++;
        //如果map中的x个数等于1，nonzero+1
        if(count.get(x) == 1) nonzero++;

        //将排序之后的y保存到map，遇到重复就-1
        count.put(y, count.getOrDefault(y, 0) - 1);
        //如果y=-1，说明没有
        if(count.get(y) == -1) nonzero++;
        //如果y=0
        if(count.get(y) == 0) nonzero--;

        if(nonzero == 0) ans++;
      }

      return ans;
    }

  }
```
由java版本翻译过来的js版本，运行错误...
```js
var maxChunksToSorted = function(arr) {
    const count = new Map();
    let ans = 0, nonzero = 0;
    let expect = [...arr];
    expect.sort((a, b) => a - b);
    for(let i = 0; i < arr.length;++i){
        let x = arr[i], y = expect[i];
        count.set(x, (count.get(x) || 0) + 1);
        if(count.get(x) == 0){
            nonzero++;
        }
        if(count.get(x) == 1){
            nonzero++;
        }

        count.set(y, (count.get(y) || 0) - 1);
        if(count.get(y) == -1){
            nonzero++;
        }
        if(count.get(y) == 0){
            nonzero--;
        }
        if(nonzero == 0){
            ans++;
        }
    }
    return ans;
};
```

### 精选题解
1. 贪心算法
- 栈  
利用栈保存前k个里面的最大值到栈顶，保证前k个是有效的片段。当遇到`<max`的时候，就将分块进行合并，记录栈顶的值，删除之前保存的`>min`的记录。  
最后栈的长度就是分块的最多个数。
一次循环。
> js中用数组代替栈。

### 思路
将分片的最大值压入栈，遇到小于栈顶的数，则循环弹出（大于小数的所有值），保留当前记录。最后栈的长度就是最多分片的个数。  
有效分片：
- 前一个分片的最大值要小于等于后一个分片的最小值。  

### 代码 
```js
  function maxChunksToSorted(arr){
    let stack = [];
    let length = arr.length;
    for (let i = 0;i < length;i++) {
      const item = arr[i];
      // 后一个分片的值大于等于栈顶的值
      if (stack.length == 0 || item >= stack[stack.length - 1]) {
        stack.push(item);
      } else {
        let head = stack.pop();
        //弹出所有大于item的元素，进行分片合并。
        while(stack.length && stack[stack.length - 1] > item){
          stack.pop();
        }
        stack.push(head);
      }
    }
    return stack.length;
  }
```
