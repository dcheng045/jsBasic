大众点评面试，创建对象都有哪些方式？
1. 最简单的var obj = new Object(); obj.name = 'debbie'; obj.sayName = function(){ alert(this.name)}
2. 或者对象字面量方式
这两种方法的缺点是：只能创建单个object


以下的全都是以function打头的，能创建多个object
1. 工厂模式
2. 构造函数模式
3. 原型链模式
4. 组合使用构造函数模式和原型模式
构造函数模式用于定义实例属性,
原型模式用于定义方法和共享的属性。
结果,每个实例都会有自己的一份实例属性的副本, 但同时又共享着对方法的引用,最大限度地节省了内存。
另外,这种混成模式还支持向构造函数传递参 数;可谓是集两种模式之长。下面的代码重写了前面的例子。

1. 工厂模式创建对象
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
      alert(this.name);
  };
  return o;
}

var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");


//////////////
2. 构造函数模式
function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            alert(this.name);
}; }

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

 没有显式地创建对象;
 直接将属性和方法赋给了 this 对象;
 没有 return 语句。

要创建 Person 的新实例,必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4 个步骤:
(1) 创建一个新对象;
(2) 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);
(3) 执行构造函数中的代码(为这个新对象添加属性);
(4) 返回新对象。
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true

对象的 constructor 属性最初是用来标识对象类型的。但是,提到检测对象类型,还是 instanceof 操作符要更可靠一些。
alert(person1 instanceof Object);  //true
alert(person1 instanceof Person);  //true
alert(person2 instanceof Object);  //true
alert(person2 instanceof Person);  //true

////////////////////构造函数模式的问题
alert(person1.sayName == person2.sayName);  //false
改进：把方法放到外面去
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name);
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

但是也并不好，会造成很多的全局方法，那么把这些方法放在哪里呢？

////////////////////
构造函数和普通函数的区别
任何函数,只要通过 new 操作符来调用,那它就可以作为构造函数;

// 当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); //"Nicholas"

// 作为普通函数调用，属性和方法都被添加给 window 对象了。
Person("Greg", 27, "Doctor"); // 添加到window window.sayName(); //"Greg"


// 在对象 o 的作用域中调用的,因此调用后 o 就拥有了所有属性和 sayName() 方法。
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse"); o.sayName(); //"Kristen" this就指向这个o了

///////////////
6.2.3 原型模式

使用原型对象的好处是可以 让所有对象实例共享它所包含的属性和方法
function Person(){}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
person1.sayName();   //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName);  //true

这个连接存在于实例与构造函数的原型对象之间,而不是存在于实例与构造函数之间。

alert(Person.prototype.isPrototypeOf(person1));  //true
alert(Person.prototype.isPrototypeOf(person2));  //true

alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"Nicholas"


查找一个属性或方法，先在实例上查找，再在对象的原型对象上查找


//////实例中创建的属性，覆盖原型上的属性
在实例中创建该属性,该 属性将会屏蔽原型中的那个属性。来看下面的例子。
function Person(){}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
  alert(this.name);
};

var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg"——来自实例
alert(person2.name); //"Nicholas"——来自原型

添加这 个属性只会阻止我们访问原型中的那个属性,但不会修改那个属性。

使用 delete 操作符则可以完全删除实例属性,从而让我们能够重新访问原型中的属性
delete person1.name;


//////// 检测name在不在实例中，不关心原型
hasOwnProperty()方法可以检测一个属性是存在于实例中,还是存在于原型中
person1.hasOwnProperty("name")


/////in操作符，关心实例，关心原型
有两种方式使用 in 操作符:
1. 单独使用
alert("name" in person1);  //true  无论实例上，还是原型对象上有name，都为true。
2. 在 for-in 循环中使用

////自定义方法，看name是在原型上，还是实例上

function hasPrototypeProperty(object, name){
        return !object.hasOwnProperty(name) && (name in object);
}
true表明在原型上
false表明不在原型上

/////
屏蔽了原型中不可枚举属性的实例属性也会在 for-in 循环中返回,因为根据规定,所 有开发人员定义的属性都是可枚举的。
——只有在 IE8 及更早版本中例外。

IE 早期版本的实现中存在一个 bug,即屏蔽不可枚举属性的实例属性不会出现在 for-in 循环中。 例如:
var o = {
  toString : function(){
    return "My Object";
  }
};

for (var prop in o){
if (prop == "toString"){
    alert("Found toString");
//在 IE 中不会显示
} }

该 bug 会影响默认不可枚举的所有属性和方法,
包括: hasOwnProperty()、propertyIsEnumerable()、toLocaleString()、toString()和 valueOf()。


////////
更简单的原型
function Person(){
}
Person.prototype = {
    // constructor : Person, 确保了通过该属 性能够访问到适当的值。
    // 以这种方式重设 constructor 属性会导致它的[[Enumerable]]特性被设置为 true。默认 情况下,原生的 constructor 属性是不可枚举的,
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

var friend = new Person();
alert(friend instanceof Object); //true
alert(friend instanceof Person); //true
alert(friend.constructor == Person); //false
alert(friend.constructor == Object); //true

完全重写了默认的 prototype 对象,因此 constructor 属性也就变成了新
对象的 constructor 属性(指向 Object 构造函数),不再指向 Person 函数

//重设构造函数,只适用于 ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});


///原型的动态性,实例与原型 之间的连接只不过是一个指针,而非一个副本

尽管可以随时为原型添加属性和方法,并且修改能够立即在所有对象实例中反映出来,但如果是重 写整个原型对象,那么情况就不一样了。
把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。

function Person(){}
Person.prototype = {
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {};
}


////
var friend = new Person();
Person.prototype.sayHi = function(){
    alert("hi");
};
friend.sayHi(); //"hi"(没有问题!)

/// 实例化的时候，还没有sayName这个方法，所以报错。
function Person(){
}
var friend = new Person();
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
friend.sayName();   //error

// 原生对象的原型上定义了很多方法
alert(typeof Array.prototype.sort); //"function"
alert(typeof String.prototype.substring); //"function"


可以像修改自 定义对象的原型一样修改原生对象的原型,因此可以随时添加方法。
String.prototype.startsWith = function (text) {
    return this.indexOf(text) == 0;
};
尽管可以这样做,但我们不推荐在产品化的程序中修改原生对象的原型。如果因 某个实现中缺少某个方法,
就在原生对象的原型中添加这个方法,那么当在另一个支 持该方法的实现中运行代码时,就可能会导致命名冲突。
而且,这样做也可能会意外 地重写原生方法。


////////原型对象的问题
原型对象的问题
原型模式也不是没有缺点。
1. 它省略了为构造函数传递初始化参数这一环节
2. 原型模式的最大问题是由其共享的本性所导致的。
原型中所有属性是被很多实例共享的,这种共享对于函数非常合适。对于那些包含基本值的属性倒 也说得过去, 可以在做隐藏，
然而,对于包含引用类型值的属性来说,问题就比较突出了。

function Person(){
}
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
} };
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court,Van"
alert(person1.friends === person2.friends);  //true

6.2.4 组合使用构造函数模式和原型模式
创建自定义类型的最常见方式,就是组合使用构造函数模式与原型模式。
构造函数模式用于定义实例属性,
原型模式用于定义方法和共享的属性。
结果,每个实例都会有自己的一份实例属性的副本, 但同时又共享着对方法的引用,最大限度地节省了内存。
另外,这种混成模式还支持向构造函数传递参 数;可谓是集两种模式之长。下面的代码重写了前面的例子。
好处： 1. 最大限度节省内存
      2. 支持向构造函数传参
function Person(name, age, job){
  this.name = name; 3
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");
alert(person1.friends);    //"Shelby,Count,Van"
alert(person2.friends);    //"Shelby,Count"
alert(person1.friends === person2.friends);//false
alert(person1.sayName === person2.sayName);//true


//// 动态原型模型
function Person(name, age, job){
//属性
this.name = name;
this.age = age;
this.job = job;
  //方法
  if (typeof this.sayName != "function"){
      Person.prototype.sayName = function(){
          alert(this.name);
        };
  }
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();

6.2.6 寄生构造函数模式
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();  //"Nicholas"


这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊
数组。由于不能直接修改 Array 构造函数,因此可以使用这个模式。
function SpecialArray(){
6.2 创建对象 161
1
    2 //添加值 3
//创建数组
var values = new Array();
     values.push.apply(values, arguments);
//添加方法
values.toPipedString = function(){
        return this.join("|");
    };
//返回数组
    return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"

构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此,
不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题,我们建议在可以使用其他模式的情 况下,不要使用这种模式。
