## 队列

### 简单队列的实现
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
    return this.#data[this.#rear--]
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
    return this.#data[this.#rear]
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
