题目1：
var a = 'this is outer'
function A(a) {
  this.a = a || 'this is inner'
  console.log(this.a)
  this.b = 'this is a bum'
  return this.b
}

console.log(new A())
console.log(a)
console.log(b)
A('this is test')
console.log(b)
console.log(a)

考察点，console.log(new A())，函数的构造函数调用，会返回一个新的object，这个object会有a和b的值。
A('this is test')函数的普通调用，this指的是window，内部会给a和b都赋值，所以执行过之后，再打印a和b就都有值了。
即便是构造函数调用，内部的console.log也是会打印的；
return 会返回，但是是不会打印在屏幕上的。

题目2：
function A(b) {
  if(typeof b === 'array') {
    return b.join()
  } else if (typeof b === 'object') {
    return b.toString()
  } else {
    return '' + b
  }
}

考察点，如何判断一个object是array，
方法一： typeof obj == "object" && obj.constructor==Array
方法二： typeof o == 'object' && typeof o.length = 'number'
方法三： a instanceof Array 如果true，就是array
方法四： function isArray(obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        }
该规范定义了Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]，然后依据这个属性，
返回一个类似于"[object Array]"的字符串作为结果（看过ECMA标准的应该都知道，[[]]用来表示语言内部用到的、
外部不可直接访问的属性，称为“内部属性”）。
利用这个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]，然后把类型检测转化为字符串比较，以达到我们的目的。

首先看：
typeof new Array()
"object"
typeof new Array
"object"
typeof [3,5,5,5]
"object"
typeof ['debbie','mathew']
"object"
typeof Array
"function"
typeof array
"undefined"
所以，array类型的对象，typeof 判断是得到 object 的， typeof Array其实是构造函数，所以是个function。

如何判断一个值是对象，还是数组，
[2,4,5].constructor
function Array() { [native code] }
[2,4,5].constructor === Array // true

var aaaa = {a: 'name'};
aaaa.constructor
function Object() { [native code] }



题目3：
var obj = {
  desc: 'obj A',
  print: function(msg) {
    return [this.desc, msg].join(' ')
  }
}

var desc = 'lame'
var func = obj.print
console.log(obj.print('awesome'))

var b = obj
b.desc = 'obj B'
console.log(obj.print('wierd'))
console.log(func.call())

对象的方法，this的值是由调用时的obj。所以第一次输出 obj A awesome
var func = obj.print 所有func.call是在全局调用，输出lame
var b = obj, b.desc赋值，所以obj里面的desc就变了, console.log(obj.print('wierd'))输出obj B wierd

题目四：
写一个js函数，parseQueryString， 用途是把URL参数解析为一个对象并返回。
var url = "http://www.xhs.com?page=1&keywords=bag&currency=dollar#index"

// it should return something like:
{
    query: {
      'page': 1,
      'keywords': 'bag',
      'currency': 'dollar'
    },
    fragment: 'index'
}

方法一：主要用split解决
function parseQueryString(url) {
  let stringTarget = url.split('?')[1]
  let arrayTarget = stringTarget.split('#')
  let arrayResult = arrayTarget[0].split('&')
  let queryResult = {}
  for (index in arrayResult) {
    console.log(arrayResult)
    let splited = arrayResult[index].split('=')
    console.log(index)
    queryResult[splited[0]] = splited[1]
  }
  let result = {
    query: queryResult,
    fragment: arrayTarget[1]
  }
  return result
}

var url = "http://www.xhs.com?page=1&keywords=bag&currency=dollar#index"
parseQueryString(url)

方法二：用element a的属性 a.href = url, a.host, a.hostname, a.search, a.hash可以去到host，取到查询串，去到#以及后面的内容
function parseQueryString(url) {
  var a=document.createElement("a");
  a.href=url;
  console.log(a.host+","+a.hostname+","+a.search+","+a.hash);
  var searches=a.search.slice(1).split("&");
  console.log(searches);//["key0=0", "key1=1", "key2=2"]
  var res={};
  searches.forEach(function(elem){
  var ss=elem.split("=");
    if(ss.length===2){
      res[ss[0]]=ss[1];
    }
  });
  return res;
}

//http://www.nowcoder.com/questionTerminal/224ff0a9b88640889e47566058b15cc9锻炼操作字符串的能力

参照以下执行结果，实现add函数
add(2,5) //return 7
add(2)(5) //return 7

function add(number1, number2) {
  if (arguments.length === 1) {
    let temp = arguments[0]
    return function add(number) { return number + temp}
  } else if (arguments.length === 2) {
    return number1 + number2
  }
}



var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
o.f()

判断是否是严格模式有几种方法？根据this的值是 undefined 还是window来判断
"use strict"
var strict3 = (function(){return !this}());
strict3

// true, means strict mode

var strict3 = (function(){return !this}());
strict3
// false, means not strict mode

function f1()
{
  return this;
}
f1() === window; //true非严格模式


function f2()
{
  "use strict";
  return this;
}
f2() === undefined; //true 严格模式

This题目
var length = 10;
function fn() {
  console.log(this.length);
  console.log(this)
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);



求字符串中，出现次数最多的字符数
/////////// hash table
var s = 'aaabbbcccaaabbbaaa';
var obj = {};
var maxn = -1;
var letter;
for(var i = 0; i < s.length; i++) {
  if(obj[s[i]]) {
    obj[s[i]]++;
    if(obj[s[i]] > maxn) {
      maxn = obj[s[i]];
      letter = s[i];
    }
  } else {
    obj[s[i]] = 1;
    if(obj[s[i]] > maxn) {
      maxn = obj[s[i]];
      letter = s[i];
    }
  }
}

console.log(letter + ': ' + maxn);

////regulation expression
var s = 'aaabbbcccaaabbbaaabbbbbbbbbb';
var a = s.split('');
a.sort();
s = a.join('');
var pattern = /(\w)\1*/g;
var ans = s.match(pattern);
ans.sort(function(a, b) {
  return a.length < b.length;
});;
console.log(ans[0][0] + ': ' + ans[0].length);



数组去重，利用obj 的不重复性
var arr = [1 ,1 ,2, 3, 3, 2, 1];
Array.prototype.unique = function(){
         var ret = [];
         var o = {};
         console.log(this)
         var len = this.length;
         for (var i=0; i<len; i++){
                   var v = this[i];
                   if (!o[v]){
                                o[v] = 1;
                                ret.push(v);
                  }
       }
        return ret;
};

alert(arr.unique());



var lang = ["php","java","javascript"];
var removed = lang.splice(1,1); // 从下标是1的位置，去掉一个
alert(lang); //php,javascript
alert(removed); //java ,返回删除的项
//插入
var insert = lang.splice(0,0,"asp"); //
alert(insert); //
alert(lang); //asp,php,javascript
//替换
var replace = lang.splice(1,1,"c#","ruby");
alert(lang); //asp,c#,ruby，javascript
alert(replace); //php, 被替换掉得作为返回值
