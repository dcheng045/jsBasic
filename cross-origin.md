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

(2) JSOP，旧的浏览器支持度比较高，动态script标签，是个典型的例子。
/Users/appledev115/Downloads/play with/demo
JSONP是一个非官网的解决跨域访问的协议，JSON作为传输数据的载体，JSONP有url，query和callback三部分，callback方法定义在浏览器端。

3. cors定义了浏览器与服务器应该如何沟通，思想是自定义http头部。XMLHttpRequest是cors跨域的标志，现代浏览器普遍支持，尤其是移动端，
支持度非常高，支持get，post等，有更好的错误处理。

4. 图片ping， <img src
允许跨域引用资源，而不能读取内容


1. 如果是端口或者协议造成的跨域问题前端是无能为力的，只能通过后台来解决
2. 在跨域问题上，域仅仅通过URL的首部来识别，而不会尝试判断相同的IP地址对应的域或者两个域是否对应一个IP
3. 什么是域：
二级，三级...n级，都是顶级域名的子域名
mail.google.com 中 google.com是顶级域名
mail.google.com 是二级域名
pwc.mail.google.com 是三级域名
4. 具有src属性的标签都有跨域能力，为同源策略开后门
5. 都有哪些流行的服务器，apache，IIS，nginx（反向域名解析）
