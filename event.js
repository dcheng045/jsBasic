添加事件有几种方法，各有什么不同？

1. html中添加事件
<input type="button" value="Click Me" onclick="alert('Clicked')" />
<input type="button" value="Click Me" onclick="showMessage()" />
showMessage()函数内部，this值等于目标元素
两个缺点：1. HTML元素一出现在页面上，就执行相应的事件，但当时的事件处理程序有可能尚不具备执行条件，所以要用try，catch
  另外， 扩展作用域链，不同的浏览器处理不同

2. DOM0级添加，用js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(this.id);    //"myBtn" this引用当前元素，事件处理程序被认为是元素的方法，事件处理程序在元素中运行
}; //冒泡阶段被处理
btn.onclick = null; // 删除事件处理程序

3. DOM2级，好处，添加多个，指定true就是捕获阶段处理，false是冒泡阶段处理
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
    alert(this.id);
}, false);
btn.addEventListener("click", function(){
    alert("Hello world!");
}, false);

如何删除事件处理程序
var btn = document.getElementById("myBtn");
var handler = function(){
    alert(this.id);
};
btn.addEventListener("click", handler, false);
//       代码
btn.removeEventListener("click", handler, false); //有
