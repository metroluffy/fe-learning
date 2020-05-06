### eventemitter or eventbus
一个应用最新ES规范写的eventEmitter
```js
class eventEmitter {
    #events = {}
    constructor() {
        
    }
    emit(key, ...reset) {
        if(Reflect.has(this.#events, key)) {
            const funcs = Reflect.get(this.#events, key)
            funcs.forEach(item => {
                item.apply(this,reset)
            })
        }
    }
    on(key, callback) {
        if(!key || typeof callback !== 'function') {
            throw new Error('eventEmitter func on didnt set a key or callback is not a function');
        }
        if(Reflect.has(this.#events, key)) {
            this.#events[key].push(callback);
        } else {
            Reflect.defineProperty(this.#events, key, {
                value: [callback],
                writable: true
            })
        }
    }
    off(key, callback) {
        if(!key || typeof callback !== 'function') {
            throw new Error('eventEmitter func on didnt set a key or callback is not a function');
        }
        if(Reflect.has(this.#events, key)) {
            Reflect.set(this.#events, key, this.#events[key].filter(fn => fn !== callback))
        }
    }
    once(key, callback) {
        if(!key || typeof callback !== 'function') {
            throw new Error('eventEmitter func on didnt set a key or callback is not a function');
        }
        let wrapFunc = (...args) => {
                callback.apply(null, args)
                this.off(key,wrapFunc)
            }
        this.on(key,wrapFunc)
    }
    clear() {
        this.#events = Object.create(null);
    }
}
```

#### eventBus 直接撸系列，适合手写
```
class Eventbus {
    constructor () {
        this.eventbus = {}
    }
    /**
     * 事件发布
     * @param {*} name 事件名字
     * @param {*} slef 自身作用域
     * @param {*} cb 回掉函数
     */
    $on(name,slef,cb) {
        let tuple = [slef,cb]
        if (Object.prototype.hasOwnProperty.call(this.eventbus, name)){
            this.eventbus[name].push(tuple)
        } else {
            this.eventbus[name] = [tuple]
        }
    }
    /**
     * 触发事件
     * @param {*} name 事件名字
     * @param {*} data 数据
     */
    $emit(name,data) {
        if (Object.prototype.hasOwnProperty.call(this.eventbus, name)) {
            let cbs = this.eventbus[name]
            // console.log(this.eventbus)
            cbs.map(item=>{
                let [slef, cb] = [item[0], item[1]]
                cb.call(slef, data)
            })
        }
    }

    /**
     * 取消事件
     * @param {*} name 事件名字
     * @param {*} fn 取消事件的回调
     */
    $off(name, fn) {
        if (Object.prototype.hasOwnProperty.call(this.eventbus, name)) {
            fn()
            delete this.eventbus[name]
        } 
    }

    /**
     * 当前事件被触发后只执行一次
     * @param {*} name 
     * @param {*} slef 
     * @param {*} fn 
     */
    $once(name, slef,fn) {
        let that = this
        function onceOn (data){
            fn.call(slef,data)
            console.log(that.eventbus[name])
            that.eventbus[name] = that.eventbus[name].filter(item=>{
                return item[0] !== slef  
            })
        }
        this.$on(name, slef, onceOn)
    }
}
```
