//用来测试代理服务
http = require('http');
const app = require('../app');
const debug = require('debug')('login2:server');
const mongoose = require('mongoose');
httpProxy = require('http-proxy');

// 新建一个代理 Proxy Server 对象
var port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:8000' // 接口地址
});

// 捕获异常
proxy.on('error', function
    (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('error message.');
});

// 另外新建一个 HTTP 80 端口的服务器，也就是常规 Node 创建 HTTP 服务器的方法。
// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options对目标的web请求传递到选项中
// also you can use `proxy.ws()` to proxy a websockets request您还可以使用代理.ws()要代理一个websockets请求

var server = http.createServer(app, function (req, res) {
    // You can define here your custom logic to handle the request
    // 您可以在这里定义您的自定义逻辑来处理请求
    // and then proxy the request.然后代理请求
    var host = req.url;
    host = url.parse(host);
    host = host.host;
    proxy.web(req, res);
});

mongoose.connect('mongodb://127.0.0.1:27017/db', function (err, db) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功 : 7000');
        server.listen(7000);
        server.on('error', onError);
        server.on('listening', onListening);
    }
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
