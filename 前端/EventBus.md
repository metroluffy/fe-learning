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