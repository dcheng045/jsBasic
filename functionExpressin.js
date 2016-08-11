1.函数声明
2. 函数表达式

函数声明提升
sayHi(); //ok
function sayHi(){
  alert("Hi!");
}

表达式没有提升
sayHi(); // 错误，函数还不存在
var sayHi = function(){
   alert("Hi!");
};

// 只会保留第二个，有的浏览器会保留第一个
if(condition){
    function sayHi(){
        alert("Hi!");
}
} else {
    function sayHi(){
        alert("Yo!");
} }

// 正确
var sayHi;
    if(condition){
        sayHi = function(){
            alert("Hi!");
        };
    } else {
        sayHi = function(){
            alert("Yo!");
        };
}

// 递归，用arguments.callee,是一个指向正在执行的函数的指针
// 严格模式，不能访问arguments.callee
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num-1);
} }

// 严格不严格都好用 P196
 var factorial = (function f(num){
        if (num <= 1){
            return 1;
        } else {
            return num * f(num-1);
} });
