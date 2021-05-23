# 100. 相同的树

https://leetcode-cn.com/problems/same-tree/  

## 前置知识
- 递归
- 层序遍历


## 思路
相同树的特点：
1. root.val 相等
2. root.left 相等
3. root.right 相等
可以采用深度优先遍历 DFS

## 代码
```javascript
  function isSameTree(p, q){
    // 考虑边界
    // 都不存在
    if(!p && !q) return true;
    // p、q其中一个不存在
    if(!p || !q) return false;
    if(p.val !== q.val) return false;
    // 比较左右节点树
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);

  }
```

## 复杂度分析
时间复杂度：O(n)
空间复杂度：O(Math.min(p,q))

