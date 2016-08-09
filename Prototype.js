原型链
ECMAScript 中描述了原型链的概念,并将原型链作为实现继承的主要方法。其基本思想是利用原 型让一个引用类型继承另一个引用类型的属性和方法。
简单回顾一下构造函数、原型和实例的关系:每 个构造函数都有一个原型对象,原型对象都包含一个指向构造函数的指针,
而实例都包含一个指向原型 对象的内部指针。

那么,假如我们让原型对象等于另一个类型的实例,结果会怎么样呢?
显然,此时的 原型对象将包含一个指向另一个原型的指针,相应地,另一个原型中也包含着一个指向另一个构造函数 的指针。
假如另一个原型又是另一个类型的实例,那么上述关系依然成立,如此层层递进,就构成了实 例与原型的链条。这就是所谓原型链的基本概念。

function SuperType(){
  this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
    return this.subproperty;
  };

var instance = new SubType();
alert(instance.getSuperValue()); //true


而继承是通过创建 SuperType 的实例,并将该实例赋给 SubType.prototype 实现的。
实现的本质是重写原型对象,代之以一个新类型的实例。


通过实现原型链,本质上扩展了本章前面介绍的原型搜索机制

就拿上面的例子来说,调用 instance.getSuperValue()会经历三个搜索步骤:
1)搜索实例;
2)搜索 SubType.prototype;
3)搜索 SuperType.prototype,最后一步才会找到该方法。在找不到属性或方法的情况下,搜索过 程总是要一环一环地前行到原型链末端才会停下来。


alert(instance instanceof Object);
alert(instance instanceof SuperType);
alert(instance instanceof SubType);
//true
//true
//true

alert(Object.prototype.isPrototypeOf(instance));
alert(SuperType.prototype.isPrototypeOf(instance));
alert(SubType.prototype.isPrototypeOf(instance));
//true
//true
//true
子类型有时候需要重写超类型中的某个方法,或者需要添加超类型中不存在的某个方法。但不管怎 样,给原型添加方法的代码一定要放在替换原型的语句之后。


在通过原型链实现继承时,不能使用对象字面量创建原型方法。因为这 样做就会重写原型链

原型链的第二个问题是:在创建子类型的实例时,不能向超类型的构造函数中传递参数。实际上, 应该说是没有办法在不影响所有对象实例的情况下,
给超类型的构造函数传递参数。
有鉴于此,再加上 前面刚刚讨论过的由于原型中包含引用类型值所带来的问题,实践中很少会单独使用原型链。
