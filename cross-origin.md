(1) document.domain + iframe  实践
document.domain设置为同一个父域，用iframe实现跨域。

解释：
document.domain的设置是有限制的，我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同。

document.getElementById('￼iframe').contentWindow
contentWindow 可取得子窗口的 window 对象

var iframe = document.getElementById('￼iframe');
var win = document.contentWindow;//可以获取到iframe里的window对象，但该window对象的属性和方法几乎是不可用的

http://wwwcomy.iteye.com/blog/1806724
创建 nodejs Web 前端开发环境 参考文档
参考代码 /Users/appledev115/nodeJSBack

(2) 动态创建script标签
/Users/appledev115/Downloads/play with/demo
