###同源策略：相同的端口号，域名，协议
####跨域的9种方式
- JSONP
- cros 跨域资源共享
- postMessage 借助iframe
- document.domain 借助iframe
- window.name 借助iframe
- location.hash 借助iframe 由于hash只能单向通信所以要经过一个中间的html进行传递
- http-proxy http代理 在node端 进行代理到另一个服务器
- nginx 反向代理到另一个服务器
- websocket  全双工通信 建立在tcp协议之上 

#####jsonp
通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。
jsonp 只能发送get 请求 不支持post put delete
不安全 xss攻击 比如说人家会把一些不安全的script写到你的页面中去  别人可以制造一些恶意的弹框
现在已经不采用jsonp了
1）原生实现
```javascript
     <script>
        var script = document.createElement('script');
        script.type = 'text/javascript';

        // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
        script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
        document.head.appendChild(script);

        // 回调执行函数
        function handleCallback(res) {
            alert(JSON.stringify(res));
        }
    </script>
```
2）后端node.js代码示例：
```javascript
    var querystring = require('querystring');
    var http = require('http');
    var server = http.createServer();

    server.on('request', function(req, res) {
        var params = qs.parse(req.url.split('?')[1]);
        var fn = params.callback;

        // jsonp返回设置
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(fn + '(' + JSON.stringify(params) + ')');

        res.end();
    });
    server.listen('8080');
    console.log('Server is running at port 8080...');
```
服务端返回如下（返回时即执行全局函数）：
```
    handleCallback({"status": true, "user": "admin"})
```
#####jsonp
参考原文：https://segmentfault.com/a/1190000011145364