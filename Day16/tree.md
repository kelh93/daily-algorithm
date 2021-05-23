## 二叉树

### 基础知识  

1. 二叉搜索树(BST-binary search tree)
特点：若`root`、`root.left`、`root.right`不为空，则`root.left < root < root.right`  
>- 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
>- 若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
>- 任意节点的左、右子树也分别为二叉查找树；

时间复杂度：O(logN)