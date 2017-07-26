/**
 * 应用程序的启动(入口)文件
 */
//加载express模块
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');
//加载模板处理模块
var swig = require('swig');
//加载cookies模块,用来记录登录信息
var Cookies = require('cookies');


/*//引入当前的用户模型 判断当前等陆用户的类型
var User = require('./models/User');*/


//创建app应用  等同 NodeJS 中的服务端对象 Http.createServe(); 服务端对象
var app = express();

//设置静态文件托管
//当用户访问的url以/public开始, 那么直接返回对应的__dirname + '/public' 下的文件
app.use('/public', express.static(__dirname + '/public'));


//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数: 模板引擎的名称,同时也是模板引擎的后缀,第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录,第一个参数必须是views,第二个参数是存放目录
app.set('views', './views');
//注册所使用的模板引擎,第一个参数必须是view engine, 第二个参数和app.engine这个方法中定义的模板引擎的名称(第一个参数)是一致的
app.set('view engine', 'html');
//在开发过程中,需要取消模板缓存
swig.setDefaults({cache: false});

//bodyParser设置  app调用bodyParser下的urlencoded方法 会在req对象上增加个body属性获取到前端提交过来的数据
app.use(bodyParser.urlencoded({extended: true}));


/*//通过中间件设置cookie  只要用户访问站点 都会运行这个中间继
app.use(function(req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析用户登录的cookie信息
    req.userInfo = {};
    if(req.cookies.get("userInfo")) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前登录用户的类型,是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch(e){
            next();
        }

    } else {
        //console.log( req.cookies.get("userInfo"));
        next();
    }
});*/

//路由绑定
// /**
//  * 首页
//  * req request对象 保存客户端请求相关的的一些数据 -http.request
//  * res response对象 服务端输出对象,提供了一些服务端输出相关的一些方法 -http.response
//  * next 方法 用于中心下一个和路径匹配的函数
//  *
//  */
app.get('/',function(req, res, next) {
    //内容输出: res.send(string)发送内容至客户端
    //res.send('<h1>欢迎来到我的博客</和==
    /*
    * 读取views 目录下的知道文件,解析并返回给客户端
    * 第一个参数: 表示模板的文件, 相对于views目录   views/index.html
    * 第二个参数: 传递给模板使用的数据
    * */
    //res.render('index');
    res.send('你好')
})

/*
* 根据不同的功能划分模块 ./routers
* admin 后台管理模块
* api API模块
* main 前台模块
* */
// app.use('/admin', require('./routers/admin'));
// app.use('/api', require('./routers/api'));
// app.use('/',require('./routers/main'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
  res.render('index', { currentTime: new Date() });
});



app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;
