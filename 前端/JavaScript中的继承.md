# JavaScript中的继承

原型和继承代表了JavaScript这门语言里最复杂的一些方面，但是JavaScript的强大和灵活性正是来自于它的对象体系和继承方式。

继承给我们提供了一种优雅可复用的编码方式，随着代码量的增大，你会越来越发现它的必要性。

## 实现分类

以下提几种常见的实现。

### 原型链继承

核心：将父类的实例作为子类的原型

```js
SubType.prototype = new SuperType()
// 所有涉及到原型链继承的继承方式都要修改子类构造函数的指向，否则子类实例的构造函数会指向SuperType。
SubType.prototype.constructor = SubType;
```

优点：

- 父类方法可以复用

缺点：

- 父类的引用属性会被所有子类实例共享
- 子类构建实例时不能向父类传递参数

### 构造函数继承

将父类构造函数的内容复制给了子类的构造函数。这是所有继承中唯一一个不涉及到prototype的继承。

```js
SuperType.call(SubType);
```

优点：

- 和原型链继承完全反过来，父类的引用属性不会被共享

- 子类构建实例时可以向父类传递参数

缺点：父类的方法不能复用，子类实例的方法每次都是单独创建的。

### 组合继承

核心：原型式继承和构造函数继承的组合，兼具了二者的优点。

```js
function SuperType(arg) {
    this.name = 'parent';
    this.arr = [1, 2, 3];
    this.arg = arg
}

SuperType.prototype.say = function() {
    console.log(`this is ${ this.name }`)
}

function SubType(args1, args2) {
    this.args = args1
    SuperType.call(this,args2) // 第二次调用SuperType
}

SubType.prototype = new SuperType() // 第一次调用SuperType
SubType.prototype.constructor = SubType;

// 使用
const sub = new SubType(args1, args2)
```

优点：

- 父类的方法可以被复用
- 父类的引用属性不会被共享
- 子类构建实例时可以向父类传递参数

缺点：

调用了两次父类的构造函数，第一次给子类的原型添加了父类的name, arr属性，第二次又给子类的构造函数添加了父类的name, arr属性，从而覆盖了子类原型中的同名参数。这种被覆盖的情况造成了性能上的浪费。

### 较完整的实现

除以上的实现外还有其他的如寄生式、寄生组合继承，不过或多或少都有缺点，从某种角度来看，js也不提供类式继承而是原型链继承。

现在也可以使用ES6的class关键字和extend来实现继承了，本质上依旧是原型链的语法糖。

以下为一种较为完整的实现，本质上是复制了父级的属性和方法,在老旧浏览器上可能继承完后续父类的改动不会自动同步到子类

```js
function inherit(Child, Parent) {
    // 继承原型上的属性
   Child.prototype = Object.create(Parent.prototype)

    // 修复 constructor
   Child.prototype.constructor = Child

   // 存储超类
   Child.super = Parent

   // 静态属性继承
   if (Object.setPrototypeOf) {
       // setPrototypeOf es6
       Object.setPrototypeOf(Child, Parent)
   } else if (Child.__proto__) {
       // __proto__ es6 引入，但是部分浏览器早已支持
       Child.__proto__ = Parent
   } else {
       // 兼容 IE10 等陈旧浏览器
       // 将 Parent 上的静态属性和方法拷贝一份到 Child 上，不会覆盖 Child 上的方法
       for (var k in Parent) {
           if (Parent.hasOwnProperty(k) && !(k in Child)) {
               Child[k] = Parent[k]
           }
       }
   }

}

```

## 参考文档

- [JavaScript中的继承](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance)
- [JavaScript继承相关](https://segmentfault.com/a/1190000015727237)
