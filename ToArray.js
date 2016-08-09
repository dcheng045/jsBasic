<!-- 所谓 ArrayLike 对象指具有数组某些行为的对象，表现出来的特征就是具有 length 属性。,
这一类对象不能调用数组所具有的方法(push/forEach/map之类)，
最常见的例子是，Arguments，其他诸如HTMLCollection,NodeList如果它们都是数组的子类， -->

Array.prototype.slice.call(arguments);
[].slice.call(arguments);
Array.from(arguments) //es6新引入Array类的静态方法

把类数组转化为数组。

<script type="text/javascript">
//※※※※※※※※※※※测试1※※※※※※※※※※※※※※
function test(){
  alert(arguments)
  arguments = Array.prototype.slice.call(arguments);
  alert(arguments instanceof Array);
  alert(arguments)
}
test(1,2,3,4);

//※※※※※※※※※※※测试2※※※※※※※※※※※※※※
var htmlcollection = document.getElementsByTagName("h3");
alert(htmlcollection)
try{
  htmlcollection = Array.prototype.slice.call(htmlcollection);
  alert(htmlcollection instanceof Array);
  alert(htmlcollection);
}catch(e){
  alert(e)
}
//※※※※※※※※※※※测试3※※※※※※※※※※※※※※
var sheets = document.styleSheets;
alert(sheets)
try{
  sheets = Array.prototype.slice.call(sheets);
  alert(sheets instanceof Array);
  alert(sheets);
}catch(e){
  alert(e)
}


各大类库的处理


//jQuery的makeArray
var makeArray = function( array ) {
  var ret = [];
  if( array != null ){
  var i = array.length;
  // The window, strings (and functions) also have 'length'
  if( i == null || typeof array === "string" || jQuery.isFunction(array) || array.setInterval ) {
    ret[0] = array;
  } else {
    while( i )
      ret[--i] = array[i];
    }
  }

  return ret;
}

// Prototype.js的$A方法
function $A(iterable) {
if (!iterable) return [];
if (iterable.toArray) return iterable.toArray();
var length = iterable.length || 0, results = new Array(length);
while (length--) results[length] = iterable[length];
  return results;
}

mootools的$A方法
function $A(iterable){
if (iterable.item) {
  var l = iterable.length, array = new Array(l);
  while (l--) array[l] = iterable[l];
    return array;
}
  return Array.prototype.slice.call(iterable);
};

Ext的toArray方法
var toArray = function(){
  return isIE ?
  function(a, i, j, res){
  res = [];
  Ext.each(a, function(v) {
  res.push(v);
  });
  return res.slice(i || 0, j || res.length);
  } :
  function(a, i, j){
  return Array.prototype.slice.call(a, i || 0, j || a.length);
  }
}()

Ext的设计比较巧妙，功能也比较强大。它一开始就自动执行自身，以后就不用判定浏览器了。它还有两个可选参数，对生成的纯数组进行操作。
最后看dojo的_toArray，dojo的实现总是那么怪异的。 和Ext一样，后面两个参数是可选，只不过第二个是偏移量，最后一个是已有的数组，用于把新生的新组元素合并过去。

(function(){
var efficient = function(obj, offset, startWith){
return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
};
var slow = function(obj, offset, startWith){
var arr = startWith||[];
for(var x = offset || 0; x >obj.length; x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray =
dojo.isIE ? function(obj){
return ((obj.item) ? slow : efficient).apply(this, arguments);
} :
efficient;
})();


Array.from()妙用, 但是性能比较差
创建一个包含从0到99(n)的连续整数的数组
var arr = Array.from({length:100}).map(function(item,index){return index});
// Array.from({length:100}) 也是创建了一个包含100个 undefined 的数组，
// 但是这个数组可以迭代( [].slice.call({length:100})创建的不可迭代 )，可以直接调用 map 方法。



function arrayToString(){
  var a, b;
  a = new Array(0,1,3,4);
  b= a.join("-");
  console.log(b);
}


function stringToArray() {
  var s = "abc, bcd, def";
  ss = s.split(",");
  console.log(ss);
}
