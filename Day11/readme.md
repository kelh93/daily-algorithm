# 旋转链表

链表的长度是否包括 头节点head和尾节点null。head（value!=null）  
> 链表的长度不包括null，包含头节点head。


## 61. 旋转链表
[原题](https://leetcode-cn.com/problems/rotate-list/)  

## 题目  
给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
示例 2:

输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL  

## 思路
1. 如果步数k小于链表长度，则依次按步数交换  
2. 如果步数k大于链表长度，则实际移动步数=k取模链表的长度  
3. 考虑边界。  

交换，确定头指针位置。结果是返回头指针就可以了。  
添加伪指针 prev->head
伪代码：
```js
  let head = 
  if(cur.next == null){
    // move 
    // 下一步移动到头指针

  }
```
普通移动  

## 训练
1. 每个链表元素移动一个位置，遍历。
2. 移动的结束条件是什么？  
> 
0->1->2->3->null  
3->0->1->2->null
```js
  function loopLinkList(head){
    if(head == null){
      return null;
    }
    let cur = head;
    if(cur.next){
    
    }

  }
```


## 官方题解思路
闭合为环  
1. 拿到链表的长度。
2. 将链表头尾相连，闭合为环。
3. 找到新链表的尾节点。
4. 最后断开节点。
新链表的最后一个节点是原链表的第(n-1)-(k%n).

1. 拿到链表的长度，拿到旧链表的尾结点。
2. 求出（n-k%n)的值，是尾结点移动到新尾结点的步数。
3. 形成环。cur.next = head.
4. 遍历（n-k%n）次，找到新的尾结点。
5. 新的尾结点的next就是新的头节点。
6. 断开环。将新的尾结点.next = null。

```js
  function rotateRight(head, k){
    if(k === 0 || !head || !head.next){
      return head;
    }
    // 获取链表长度，遍历结束后cur指向尾结点
    let n = 1; 
    let cur = head;
    while(cur.next){
      cur = cur.next;
      n++;
    }

    // 当k是n的倍数时，链表位置不会改变。直接返回头节点
    let add = n - k % n;
    //此时链表相当于没动。
    if(add === n){
      return head;
    }

    // 形成环。
    cur.next = head;

    // 移动尾结点到新的尾结点，cur是新的尾结点，cur.next是新的头节点（因为已经形成了闭环）
    while(add){
      cur = cur.next;
      add--;
    }
    // 新的头节点
    const newHead = cur.next;
    // 将新的尾结点指向null，断开闭环。
    cur.next = null;

    return newHead;
  }
```
移动一个节点
```js
  let cur = head;
  cur.next = head;
  cur = cur.next;
```

## 其他写法
```js
  var rotateRight = function(head, k) {
  if(!head || !head.next || k === 0) return head;

  let length = 1, cur = head;

  //找出长度
  while(cur.next){
    cur = cur.next
    length++
  }

  //找出真实的k的次数
  k = k % length;

  let fast = head, slow = head


  //这时候的slow是newTail，这里Lucifer写的挺elegant Q_Q
  while(fast.next){
    if(k-- <=0) slow = slow.next
    fast = fast.next
  }

  fast.next = head;
  let newHead = slow.next

  slow.next = null;
  return newHead
};


```

## 快慢指针(基于闭合链表)
[题解二](https://leetcode-cn.com/problems/rotate-list/solution/dong-hua-yan-shi-kuai-man-zhi-zhen-61-xu-7bp0/)  
### 使用快慢指针
1. 定义慢指针slow和快指针fast，其初始都指向链表头节点。
2. 让fast指针向前移动k步。
3. 之后快慢指针同时移动，直到fast指向尾结点。此时slow的位置就是新的尾节点。
4. 让链表形成环。
5. 新的头节点是fast的前一个节点。

#### 代码
```java
  public ListNode rotateRight(ListNode head, int k) {
    if (head == null) {
        return head;
    }

    // 计算链表中节点个数
    int len = calculateLen(head);
    k = k%len;

    // 慢指针初始指向头节点
    ListNode slow = head;
    // 快指针初始指向头节点
    ListNode fast = head;

    // 快指针先向前移动k步
    for(int i = 0; i < k; i++) {
        fast= fast.next;
    }

    // 快慢指针同时向前移动，直到快指针指向的节点的
    // 下一个节点为null
    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }

    // 快指针此时在链表末尾
    // 然后其指向的节点的后继指针指向头节点
    // 这时链表首尾相连成环
    fast.next = head;
    // 新的头节点是慢指针所指节点的下一个节点
    head = slow.next;
    // 慢指针所指节点的的后继指针指向null
    // 断开环
    slow.next = null;
    return head;
}

private int calculateLen(ListNode head){
    int len = 0;
    while (head!=null) {
        head = head.next;
        len++;
    }
    return len;
}
```
## 思路
练习，利用官方题解思路写代码。
0. 考虑边界（k=0，head=null，head.next=null)
1. 拿到链表的长度，拿到旧链表的尾结点。
2. 求出（n-k%n)的值，是尾结点移动到新尾结点的步数。
3. 形成环。cur.next = head.
4. 遍历（n-k%n）次，找到新的尾结点。
5. 新的尾结点的next就是新的头节点。
6. 断开环。将新的尾结点.next = null。

## 代码
```js
  function rotateRight(head, k){
    if(k === 0 || !head || !head.next){
      return head;
    }
    //获取链表长度，拿到尾结点
    let n = 1;
    let cur = head;
    while(cur.next != null){
      cur = cur.next;
      n++;
    }
    // 新的尾结点是的位置在旧尾结点的倒数第k%n的位置。
    // 因为是单链表只有一个方向，所以只能正向移动尾结点，
    // 形成环之后的正向移动次数就是 链表长度-k
    let add = n - k%n;
    // 如果k是n的倍数，则直接返回原头节点。
    if(add === n){
      return head;
    }
    // 形成闭环。
    cur.next = head;
    // 找到新的尾结点。
    while(add){
      cur = cur.next;
      add--;
    }
    // 找到新的头节点。
    const newHead = cur.next;
    // 断开环
    cur.next = null;

    return newHead;
  }
```
## 复杂度分析
时间复杂度 O(N)
空间复杂度 O(1)


## 思路
方法一： Hash
用map记录出现过的节点，当再次遇到相同节点时，即出现了环。

## 代码
```javascript
var detectCycle = function (head) {
  const hasVisited = new Map();
  while (head != null) {
    if (hasVisited.has(head)) {
      return head;
    }
    head = head.next;
  }
};
```

## 复杂度分析
T: O(n); // n次遍历,程序执行了n次。
S: O(n); // map使用了n个空间。



