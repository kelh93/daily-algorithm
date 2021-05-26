# 513. 找树左下角的值

## 思路
1. 前序遍历，从left开始。
2. 设置一个变量记录depth，直到最新的左节点。maxDepth
3. 递归终止条件。root.left == null && root.right == null

## 代码

```javascript

  let curDepth = 0, maxDepth = -1;
  let maxNodeValue;
  var findBottomleftValue = function(root){
    // 代表是叶子节点
    dfs(root, curDepth);
    return maxNodeValue;
  }
  function dfs(root, depth){
    if(root.left === null && root.right === null){
      if(depth > maxDepth){
        maxDepth = depth;
        maxNodeValue = root.val;
      }
      return;
    }
    if(root.left){
      dfs(root.left, depth + 1);
    }
    if(root.right){
      dfs(root.right, depth + 1);
    }
    return;
  }
```