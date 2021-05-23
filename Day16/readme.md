# 104. 二叉树的最大深度

https://leetcode-cn.com/problems/maximum-depth-of-binary-tree  

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。  

示例：
给定二叉树 [3,9,20,null,null,15,7]，

```bash
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。

## 思路
深度优先遍历，左子树和右子树中的最大值就是tree的maxDepth。

## 代码

```javascript
  function maxDepth(root){
    if(root === null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1; // 1 为 根节点这一层 。
  }
```
## 复杂度分析
时间复杂度: O(n); // 每个节点都要遍历一次。（程序执行的次数）  
空间复杂度: O(depth); // 树的深度就是消耗的内存空间。