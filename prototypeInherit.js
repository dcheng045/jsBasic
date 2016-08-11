基本思想是利用原型，让一个引用类型继承另外一个引用类型的属性和方法。
每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
假如让原型对象等于另一个类型的实例，那么此时，原型对象将包含一个指向另一个原型的指针，相应的，另一个原型中也包含着指向两一个构造函数的指针，
层层递进，构成了实例与原型的链条，就是所谓的原型链的基本概念。

function SuperType(){
  this.property = true;
} //构造函数

SuperType.prototype.getSuperValue = function(){
  return this.property;
}; //定义在原型上的共享方法

function SubType(){
    this.subproperty = false;
} //子类

SubType.prototype = new SuperType(); //子类的原型，指向父类的实例，实现继承

SubType.prototype.getSubValue = function (){
    return this.subproperty;
}; //定义在子类原型上的共享方法

var instance = new SubType();
alert(instance.getSuperValue()); //true


组合继承，伪经典继承，
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
}
function SubType(name, age){
  //继承属性
  SuperType.call(this, name);
  this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors);//"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29


var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
