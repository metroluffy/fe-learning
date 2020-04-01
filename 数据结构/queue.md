# 队列

## 简单队列的实现

```js
class Queue {

  #data;
  #length = 0;
  #front = 0;
  #rear = 0;

  constructor (length) {
    this.#length = length
    this.#data = new Array(length)
    this.#front = this.#rear = 0
  }

  /**
   * 入队
   */
  enqueue (val) {
    if(this.#rear === this.#length) {
      console.log('队列满了');
      return false
    }
    this.#data[this.#rear++] = val
  }

  /**
   * 出队
   */
  dequeue () {
    return this.#data[this.#front++]
  }

  /**
   * 获取队头元素
   */
  get front () {
    return this.#data[this.#front]
  }

  /**
   * 获取队尾元素
   */
  get rear () {
    return this.#data[this.length - 1]
  }

  /**
   * 获取队长
   */
  get length () {
    return this.#rear - this.#front
  }

  get isEmpty () {
    return this.#front === this.#rear
  }
}

let q = new Queue(5)

```

### 循环队列

概念不赘述，原理是将队列首尾相连，当rear移动到末尾时，会再从0开始循环，从而有效利用之前出队时留下的空间，预留一个空间来判断队列满和空即可。
满的判断条件应为：(rear+1)%LENGTH == front
空的判断条件为 rear == front

```js
// 具体实现，改造一下出队入队的判断条件即可
  /**
   * 入队
   */

    enqueue (val) {
      if(this.isFull) {
        console.log('队列满了');
        return false
      }
      this.#data[this.#rear++] = val
      this.#rear %= this.#length
    }
  
    /**
     * 出队
     */
    dequeue () {
      if(this.isEmpty) return false
      if(this.#front+1 === this.#length){
        this.#front = 0;
        return this.#data[this.#length-1];
      }
      return this.#data[this.#front++]
    }
    // 相应地，求队尾、队长等方法也要做一点修改来适应首尾相连
    /**
     * 获取队尾元素
     */
    get rear () {
      if(this.isEmpty) return -1;
      return this.#data[(this.#rear + this.#length - 1 ) % this.#length]
    }
  
    /**
     * 获取队长
     */
    get length () {
      return (this.#rear + this.#length) % this.#length
    }

    // 判空
    get isEmpty () {
      return this.#front === this.#rear
    }
  
    // 判满
    get isFull() {
        return (this.#rear+1) % this.#length === this.#front
    }
```

leetcode也有一道设计循环队列地题，可以尝试做一做，难度不大，难在细节
题目连接：<https://leetcode-cn.com/problems/design-circular-queue/>
