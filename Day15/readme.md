# 146.实现LRU缓存（最近最少使用）

https://leetcode-cn.com/problems/lru-cache/

运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。
实现 LRUCache 类：

LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 

进阶：你是否可以在 O(1) 时间复杂度内完成这两种操作？  

``` bash
示例：

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

提示  

1 <= capacity <= 3000
0 <= key <= 3000
0 <= value <= 104
最多调用 3 * 104 次 get 和 put

## 题解
思路：get，put 都想O(1)的时间复杂度可以用哈希和双向链表结合。  

## 代码

```javascript
  //实现链表节点
  class DLinkedNode {
    constructor(key = 0, value = 0) {
      this.key = key;//保存缓存key
      this.value = value;//保存缓存value
      this.prev = null;//前指针
      this.next = null;//后续指针
    }
  }
  // 实现缓存类
  class LRUCache {
    constructor(capacity) {
      this.cache = new Map(); // hashmap
      this.capacity = capacity; // 最大缓存数量
      this.head = new DLinkedNode();
      this.tail = new DLinkedNode();
      // 形成双向链表
      this.head.next = this.tail;
      this.tail.prev = this.head;

      this.size = 0;
    }
    get(key) {
      if (!this.cache.has(key)) {
        return -1;
      }
      let node = this.cache.get(key);
      this.moveToHead(node);
      return node.value;
    }
    put(key, value) {
      if (!this.cache.has(key)) {
        let node = new DLinkedNode(key, value);
        this.cache.set(key, node);
        this.addToHead(node);
        this.size++;
        if (this.size > this.capacity) {
          let removed = this.removeTail();
          this.cache.delete(removed.key);
          this.size--;
        }
      } else {
        const node = this.cache.get(key);
        node.value = value;
        this.moveToHead(node);
      }
    }
    addToHead(node) {
      // head -> node -> tail
      // head <- node <- tail
      node.prev = this.head;
      node.next = this.head.next;
      this.head.next.prev = node;
      this.head.next = node;
    }
    removeNode(node) {
      // before1: head -> node -> tail
      // before2: head <- node <- tail
      // after1: head -> tail
      // after2: head <- tail
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    moveToHead(node) {
      this.removeNode(node);
      this.addToHead(node);
    }
    removeTail() {
      // before1: head -> node -> tail
      // before2: head <- node <- tail
      // 擦除node节点（因为node节点才是真正的尾结点）
      const node = this.tail.prev;
      this.removeNode(node);
      return node;
    }
  }
```
