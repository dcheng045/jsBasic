js如何判断一个对象是不是Array？
1. typeof 不行，对数组，返回object
2. instanceof Array 可以，但是在多个frame中穿梭就会有问题
3. arr.constructor === Array 可以，但是在多个frame中穿梭就会有问题
4. Object.prototype.toString.call(arr) === "[object Array]" 万能方法


在开发中，我们经常需要判断某个对象是否为数组类型，在Js中检测对象类型的常见方法都有哪些呢？
1. typeof 操作符
对于Function， String， Number ，Undefined 等几种类型的对象来说，他完全可以胜任，但是为Array时

var arr=new Array("1","2","3","4","5");
alert(typeof(arr)); // object
你会收到一个object 的答案，有点让人失望。

2. instanceof 操作符
JavaScript中instanceof运算符会返回一个 Boolean 值，指出对象是否是特定类的一个实例。
使用方法：result = object instanceof class,
还是刚刚的数组，再来一次，嗯，成功的返回 true。

var arrayStr=new Array("1","2","3","4","5");
alert(arrayStr instanceof Array);

小总结：看样子我们今天讨论的问题已经得到了解答，但事实上在多个frame中穿梭就会产生大问题了。

var iframe = document.createElement('iframe');   
document.body.appendChild(iframe);   
xArray = window.frames[window.frames.length-1].Array;      
var arr = new xArray("1","2","3","4","5");//这个写法IE大哥下是不支持的，FF下才有
alert(arr instanceof Array); // false
alert(arr.constructor === Array); // false
返回结果为两个False，让人大失所望。

ECMA-262 写道
Object.prototype.toString( ) When the toString method is called, the following steps are taken:
1.	Get the [[Class]] property of this object.
2.	Compute a string value by concatenating the three strings “[object “, Result (1), and “]”.
3.	Return Result (2)
上面的规范定义了Object.prototype.toString的行为：
首先，取得对象的一个内部属性[[Class]]，然后依据这个属性，返回一个类似于"[object Array]"的字符串作为结果
（看过ECMA标准的应该都知道，[[]]用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”）。
利用这个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]，然后把类型检测转化为字符串比较，以达到我们的目的。
还是先来看看在ECMA标准中Array的描述吧。

ECMA-262 写道
new Array([ item0[, item1 [,…]]])
The [[Class]] property of the newly constructed object is set to “Array”.
于是利用这点，第三种方法登场了。

function isArray(obj) {  
  return Object.prototype.toString.call(obj) === '[object Array]';   
}
call改变toString的this引用为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是'[object Array]'，以判断其是否是Array的实例。
也许你要问了，为什么不直接o.toString()？嗯，虽然Array继承自Object，也会有toString方法，但是这个方法有可能会被改写而达不到我们的要求，
而Object.prototype则是老虎的屁股，很少有人敢去碰它的，所以能一定程度保证其“纯洁性”：）
与前面几个方案不同，这个方法很好的解决了跨frame对象构建的问题，
经过测试，各大浏览器兼容性也很好，可以放心使用

一个好消息是，很多框架，比如jQuery、Base2等等，都计划借鉴此方法以实现某些特殊的，比如数组、正则表达式等对象的类型判定，不用我们自己写了
