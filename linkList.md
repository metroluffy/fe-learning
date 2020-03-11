###  链表结构
```js
class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class linkList {
    constructor (params) {
        this.head = new Node()
        this.cur = this.head
        if(Array.isArray(params)) {
            this.insertByArray(params)
        } else {
            this.insert(params)
        }
    }
    insert (data) {
        let n = new Node(data)
        this.cur.next = n
        this.cur = this.cur.next
    }
    insertByArray (arr){
        if(arr && Array.isArray(arr)){
            arr.forEach(item => {
                this.insert(item)
            })
        } else {
            throw new Error('The params for insertByArray must be a array')
        }
    }
    show () {
        return this.head
    }
}

let a = new linkList()
```

### 题型 

#### 两数相加，未完全考虑边界情况
```js
var addTwoNumbers = function(l1, l2) {
    let r = new linkList();
    let c1 = l1.head.next;
    let c2 = l2.head.next
    let ru;
    while(c1||c2) {
        let res = c1.data||0 + c2.data||0
        if(ru) {
            res+=ru;
            ru = 0
        }
        if(res > 10) {
            ru= 1
            res = res%10
        }
        r.insert(res)
        c1 = c1.next ? c1.next : null
        c2 = c2.next ? c2.next : null
        
    }
return r
};
```

