函数调用时发生了什么，某个函数调用时，会创建一个执行环境，及相应的作用域链，
然后使用arguments和其他命名参数的值来初始化活动对象，
在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位...直到作用域链终点的全局执行环境。

在函数执行过程中，需要在作用域链中查找变量。

全局环境的变量对象始终存在，局部环境的变量对象仅在函数执行过程中存在，函数执行完毕后，局部活动对象就会被销毁。
但是闭包的情况不同，闭包会将外部函数的活动对象添加到自己的作用域链中，外部函数执行完毕后，外部函数的活动对象也不会被销毁，
因为内部函数的作用域链仍在引用这个活动对象。

也就是说，外部函数执行完毕后，外部函数的作用域链会被销毁，但他的活动对象仍在内存中，直到匿名函数被销毁。

compareNames = null;
解除对匿名函数的引用，释放内存。
 function createComparisonFunction(propertyName) {
        return function(object1, object2){
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value1 < value2){
                return -1;
            } else if (value1 > value2){
                return 1;
            } else {
                return 0;
} };
}

function assignHandler(){
  var element = document.getElementById("someElement");
  var id = element.id;
  element.onclick = function(){
    alert(id); // 消除循环引用
  };
  element = null; // 闭包会引用包含函数的整个活动对象，即使闭包不直接引用element，也需要把element变量设置为null
}


 (function(){
   // 模仿块级作用域
 })();

限制向全局作用域添加过多的变量和函数，避免命名冲突，不会搞乱全局作用域。
(function(){
        var now = new Date();
        if (now.getMonth() == 0 && now.getDate() == 1){
            alert("Happy new year!");
        }
})();
