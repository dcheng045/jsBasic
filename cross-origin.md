(1) document.domain + iframe  实践
document.domain设置为同一个父域，用iframe实现跨域。

<!-- parent.html -->
<!DOCTYPE html>
<html>
<head>
<title>parent</title>
<script>
    document.domain = "wwwcomy.com";
    function parentFunction() {
        alert('function in parent');
    }

    function callChild() {
        child.window.childFunction();
        /*
            child 为iframe的name属性值，
            不能为id，因为在FireFox下id不能获取iframe对象
        */
    }
</script>
</head>
<body>
<input type="button" name="call child"  value="call child" onclick="callChild()"/>
<br/><br/>
<iframe name="child" src="http://d1.wwwcomy.com/child.html" >
<!-- <iframe name="child" src="child.html" > -->
</iframe>
</body>
</html>


<!-- child.html -->
<!DOCTYPE html>
<head>
<title>child</title>
<script>
    document.domain = "wwwcomy.com";
    function childFunction() {
        alert('function in child');
    }

    function callParent() {
        parent.parentFunction();
    }
</script>
</head>
<body>
<input type="button" name="call parent" value="call parent" onclick="callParent()"/>
<br/><br/>
</body>
</html>

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
