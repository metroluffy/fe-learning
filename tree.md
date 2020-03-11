## 二叉树

### 基本结构
```js
class treeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
// 二叉搜索树
class binarySearchTree {
    #orderList = {
        1: 'preOrder',
        2: 'middleOrder',
        3: 'endOrder'
    }
    constructor(data) {
        this.root = new treeNode();
        if(Array.isArray(data)) {
            this.insertByArray(data)
        } else {
            this.insert(data)
        }
    }
    insert(data) {
        if(typeof data === 'undefined' || data === null || Number.isNaN(data)) throw Error('insert undefined or null or NaN is not allowed.');
        this.root = this._inner_insert(this.root, data)
        return this.root
    }
    insertByArray(dataset) {
        let ars = Array.prototype.slice.call(dataset);
        while(ars.length > 0) {
            this.insert(ars.splice(0,1)[0])
        }
    }
    _inner_insert(cur, data) {
        if(!cur || !cur.data) {
            return new treeNode(data)
        }
        if(data <= cur.data) {
            cur.left = this._inner_insert(cur.left,data)
        } else {
            cur.right  = this._inner_insert(cur.right,data)
        }
        return cur
    }
    queryLeftEnd(cur = this.root) {
        if(cur.left){
            cur = cur.left
            return this.queryLeftEnd(cur)
        }
        return cur
    }
    /**
     * order 遍历方式 1 先序 2 中序 3 后序
     **/
    traverse(order = 1) {
        let arr = []
        binarySearchTree[this.#orderList[order]](this.root, arr)
        return arr
    }
    static preOrder(cur, arr) {
        arr.push(cur.data)
        if(cur.left) {
            binarySearchTree.preOrder(cur.left, arr)
        }
        if(cur.right) {
            binarySearchTree.preOrder(cur.right, arr)
        }
    }
    static middleOrder(cur, arr) {
        if(cur.left) {
            binarySearchTree.middleOrder(cur.left, arr)
        }
        arr.push(cur.data)
        if(cur.right) {
            binarySearchTree.middleOrder(cur.right, arr)
        }
    }
    static endOrder(cur, arr) {
        if(cur.left) {
            binarySearchTree.endOrder(cur.left, arr)
        }
        if(cur.right) {
            binarySearchTree.endOrder(cur.right, arr)
        }
        arr.push(cur.data)
    }
}
```