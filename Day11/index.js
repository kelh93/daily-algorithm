function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
//Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var sortedListToBST = function (head) {
  // 考虑边界
  if (head == null) return null;
  //使用快慢指针找到中点
  let slow = head;
  let fast = head;
  let preSlow; // 保存slow的前一个节点
  while (fast && fast.next) {
    preSlow = slow; // 记录最新的slow的前一个。
    slow = slow.next; // 慢指针移动一步
    fast = fast.next.next; // 快指针移动2步
  }
  const root = new TreeNode(slow.val); // 根据中间节点，创建根节点
  if (preSlow != null) {
    preSlow.next = null;
    root.left = sortedListToBST(head); // 构建左子树。为何这里是head?
  }
  root.right = sortedListToBST(slow.next); // 递归构建右子树
  return root;
};
console.log(sortedListToBST([-10, -3, 0, 5, 9]));
