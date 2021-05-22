## 思路
哈希map ＋ 双向链表。实现查找和插入都是O(1)的复杂度

## 代码 （翻译python）

class DLinkedNode {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
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
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }
  removeTail() {
    const node = this.tail.prev;
    this.removeNode(node);
    return node;
  }
}

## 复杂度分析
T: O(1)
S: O(capacity)