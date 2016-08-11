大众点评面试，Object上有哪些方法:

1. Object.getPrototypeOf(person1) == Person.prototype; //true
返回一个实例的原型

2. Object.keys()方法，
Object.keys(Person.prototype);
Object.keys(p1);
接收一个对象原型，或者实例作为参数,返回一个包含所有可枚举属性的字符串数组。

例如:
var keys = Object.keys(Person.prototype);
alert(keys);       // "name,age,job,sayName"
var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
alert(p1keys);    //"name,age"
Object.keys() 返回的数组只包含"name"和"age"这两个实例属性。

3. Object.getOwnPropertyNames()
如果你想要得到所有实例属性,无论它是否可枚举,都可以使用 Object.getOwnPropertyNames() 方法。
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys);    //"constructor,name,age,job,sayName"

4. Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});


////////////

isPrototypeOf是定义在原型上的方法
alert(Person.prototype.isPrototypeOf(person1));  //true
alert(Person.prototype.isPrototypeOf(person2));  //true

hasOwnProperty可以查看属性是定义在实例上，还是定义在原型对象上
person1.hasOwnProperty("name") //true定义在实例上
