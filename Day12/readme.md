# 两两交换链表中的节点

[原题地址](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)  

## 题目描述

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。  

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。  

示例 1：  

![图](./7067.jpg)  

输入：head = [1,2,3,4]
输出：[2,1,4,3]  

示例 2：

输入：head = []
输出：[]

示例 3：  

输入：head = [1]
输出：[1]
 

提示：

链表中节点的数目在范围 [0, 100] 内
0 <= Node.val <= 100

## 思路  
难点：如何将相邻的2个连接起来。
1. 2个2个进行交换。

```js
    function swapLinkedList(head){
        if(!head || !head.next){
            return head;
        }
        let cur = head;
        cur = cur.next;
        cur.next = head;
    }
```

## 思路 -> 官方题解  

1. 递归.
前一个链表的next是后一个链表交换之后的新节点。
### 代码
```js
    function swapPairs(head){
        // 考虑边界
        if(!head || !head.next){
            return head;
        }
        // 记录新头节点。
        let newHead = head.next;
        // 交换之后的next等于下一次交换的新节点。
        head.next = swapPairs(newHead.next);
        // 进行交换
        newHead.next = head;
        return newHead;
    }
```
时间复杂度: O(n)
空间复杂度：O(n)

2. 迭代  
增加一个前置节点tmp，3个数完成交换。交换之后，改变tmp的位置。  
终止条件`tmp.next = null`或者`tmp.next.next = null`。  

### 代码

```js
    function swapPairs(head){
        const dummyHead = new ListNode(0);
        dummyHead.next = head;

        let temp = dummyHead;
        // 交换temp的后2个节点。
        while(temp.next !== null && temp.next.next !== null){
            const node1 = temp.next;
            const node2 = temp.next.next;
            node2.next = node1;
            node1.next = node2.next;
            temp = node1;
        }
        // 第一次交换之后，dummyHead.next => newHead;
        return dummyHead.next;
    }
```
### 复杂度分析
时间复杂度： O(N)
空间复杂度:  O(1)


### 
```js
    var swapPairs = function(head) {
        // the number of nodes in the list is in the range [0,100]
        if(!head || !head.next) return head
        //A commonly used trick for 1)better locating the head and
        //2)treating head as part of the list so that we don't have to handle it seperately
        const dummyHead = new ListNode(-1, head)

        let slow = head, fast = head.next, preSlow = dummyHead;
        //穿针引线 -> referrence to Lucifer's LinkedList notes
        while(fast){
            let next = fast.next;
            preSlow.next = fast;
            fast.next = slow;
            slow.next = next;

            preSlow = slow
            slow = next
            if(!slow) break
            fast = slow.next
        }

        return dummyHead.next
    };

```


