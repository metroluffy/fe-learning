## JavaScript 基础强化
### 第一节：类型
最新的 `ECMAScript` 标准定义了 8 种数据类型，
- 6 种原始类型，使用 `typeof` 运算符检查
  - **undefined**: `typeof instance === "undefined"`
  - **Boolean**: `typeof instance === "boolean"`
  - **Number**: `typeof instance === "number"`
  - **String**: `typeof instance === "string`
  - **BigInt**: `typeof instance === "bigint"`
  - **Symbol**: `typeof instance === "symbol"`
- **null**: `typeof instance === "object"`
- **Object**: `typeof instance === "object"`
#### Symbol
每个从 `Symbol()` 返回的 `symbol` 值都是唯一的。一个 `symbol` 值能作为对象属性的标识符，比如可以作为 `EventEmitter` 的事件 `key` 。因为其不可枚举，所以无法被JSON序列化，直接忽略。  
当作为对象属性的标识符时，无法被 `for...in` 枚举，可以考虑 `Reflect.ownKeys` ，`Reflect.ownKeys ` 方法返回一个由目标对象自身的属性键组成的数组，等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))` ，`Object.getOwnPropertySymbols()` ，返回一个给定对象自身的所有 `Symbol` 属性的数组，如下，

```javascript
const s = Symbol('s');
const o = {};
o[s] = 'test';
for (let i in o) { console.log(i)} // ouput nothing
console.log(Object.keys(o)); // []
// consider Reflect.ownKeys
console.log(Reflect.ownKeys(o)); // [Symbol(a)]
```

#### BigInt

`BigInt`用来表示大于安全数的类型 ，安全数即`MAX_SAFE_INTEGER：+- 2^ 53-1`。目前位于[第四阶段](https://tc39.es/proposal-bigint/#sec-bigint-objects)。  
不能被`JSON`序列化， 会报`TypeError`，但可以修改其`toJSON`方法：

```javascript
BigInt.prototype.toJSON = function () {
    return this.toString();
}
JSON.stringify(BigInt('11111111111111111111111111')); // "\"11111111111111111111111111\""
// 可参见 https://mp.weixin.qq.com/s/AKXoSn2LLVRS7cc2P0NDPQ
```

#### 类型判断

##### typeof

`typeof`依据`JavaScript`数据类型在存储时的机器码进行判断，如下，

- **000**：Object
- **001**：整数
- **010**：浮点数
- **100**：字符串
- **110**：布尔
- 特殊的，用`−2^30`的整数表示`undefined`，`000`表示`null`，这也是`typeof null === 'object'`的原因

##### instanceOf

用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```javascript
const _instanceOf = (obj, target) => {
    let l = obj.__proto__;
    const r = target.prototype;
    while (l !== null) {
        if (l === r) return true;
        l = l.__proto__;
    }
    return false;
}
```

##### Array.isArray

用来判断某个变量是否是一个数组对象，优于 `instanceof`，因为`Array.isArray`能检测`iframes`（[参见](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#instanceof_%E5%92%8C_isarray)）。

```javascript
// Polyfill
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

也可以看下文章[严格判定JavaScript对象是否为数组](https://web.mit.edu/jwalden/www/isArray.html)。

### 第二节 概念明晰

#### this

指向执行上下文。

可以使用`bind/call/apply `改变相关函数 `this` 指向，其中差别在于`call`和`apply`的区别是参数形式，后者是数组，直接返回调用结果，`bind`返回一个绑定了新的`this`指针指向的函数。

#### new运算符

`new`运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例，说人话就是，实例化一个对象。具体如下，

```javascript
// 模拟
const newFunc = (constructor, ...args) => {
    // 创建空对象
    let n = {};
    // 为这个对象添加构造函数原型上的属性跟方法
    n.__proto__ = constructor.prototype;
    // 调用构造函数，将新对象作为this上下文
    const ret = constructor.apply(n, args);
    // 验证返回值是对象还是值类型，如是值类型则返回空对象
    return Object.prototype.toString.call(res) === '[object Object]' ? res : obj;
}
```

与`Object.create`很相似，后者少了`this`指针的改变和最后的返回值判断，因为其目标只是返回一个新的对象。

#### 闭包

闭包可以让你从内部函数访问外部函数作用域，和IIFE立即执行函数不是一个概念，但常常一起使用。
需要注意的是闭包可能导致内存泄漏（如果引用不被及时释放），不要在循环中创建闭包。

函数嵌套函数时，内层函数引用了外层函数作用域下的变量（即嵌套函数可访问声明于它们外部作用域的变量），并且内层函数在全局环境下可访问，就形成了闭包。
闭包的本质源自两点，**词法作用域和函数当作值传递**。

应用：
1、工厂模式，借助内层函数可以访问外部作用域的特性，根据参数返回不同的函数
2、闭包特性可以用于模拟私有方法及变量
3、单例模式

## JavaScript 语言拾遗

#### 继承

如何优雅地实现继承，

- 原型链继承

  - 关键代码：`Child.prototype = new Parent()`

  - 缺点

    不同的 `Child` 实例的`__proto__ `会引用同一`Parent` 的实例，不同实例对链上存在的引用类型修改会互相影响，而且无法向父类的构造函数传参。

- 构造函数实现继承

  - 关键代码

    ```javascript
    function Child (args) {
       // ...
       Parent.call(this, args)
    }
    ```

  - 优点

    其一, 保证了原型链中引用类型值的独立,不再被所有实例共享；其二, 子类型创建时也能够向父类型传递参数。

  - 缺点

    方法都在构造函数中集成，不是好的思路。

- 组合继承

  使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.

  ```javascript
  function Child (args1, args2) {
    // ...
    this.args2 = args2
    Parent.call(this, args1)
  }
  Child.prototype = new Parent()
  Child.prototype.constrcutor = Child
  ```

  问题在于 `Child` 实例会存在 `Parent` 的实例属性。因为我们在 `Child` 构造函数中执行了 `Parent` 构造函数。同时，`Child.__proto__` 也会存在同样的 `Parent` 的实例属性，且所有 `Child` 实例的 `__proto__` 指向同一内存地址。

- ES6中的继承

  使用Class、extends。 Babel 将 class extends 编译成了 ES5 组合+寄生模式的继承，这是面向对象的实质。

- 其他补充

  JavaScript 的日期对象只能通过 JavaScript Date 作为构造函数来实例化得到，通过ES6的Class可以优雅地实现对Date的继承。

同时可参见，[一文理解JavaScript中的继承](https://segmentfault.com/a/1190000015727237)

#### 函数

- 如果参数是值类型，函数内部会复制一份进行运算，但如果函数参数是一个引用类型，当在函数体内修改这个引用类型参数的某个属性值时，将会对参数进行修改。

- 箭头函数

  由于其没有this指针，其this是获得自父执行上下文的，不适用于构造函数的原型方法上，也不适用于需要获得 arguments 时，总而言之其就是快速函数，不需要prototype，也没有arguments，也没法new。

#### 迭代器Iterator

迭代器作为一种接口，为各种不同的数据结构提供统一的访问机制，例如供`for...of`消费。

#### 内存泄漏

主要有以下几种场景，

- 闭包：匿名函数可以访问父级作用域的变量，这种引用导致内存不会被回收，避免方式就是删除不使用的引用，这对代码质量有较高的要求
- 循环引用：引用计数下存在的问题，目前新的标记清除法已经解决。
- 意外的全局变量
- 未销毁的定时器timer
- 未释放的DOM引用

#### 严格模式

使用`'use strcit'`启用严格模式，置于脚本第一行，当多个文件时，建议使用`IIFE`生成的匿名函数之中，如果是为单个函数启用，则置于函数体第一行。目的主要有：

- 消除`JavaScript`语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的`JavaScript`做好铺垫。

其余可参见MDN文档，[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)
