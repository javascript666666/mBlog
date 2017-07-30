'use strict';
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



//创建app应用  等同 NodeJS 中的服务端对象 Http.createServe(); 服务端对象
var app = express();

//设置静态文件托管
//当用户访问的url以/public开始, 那么直接返回对应的__dirname + '/public' 下的文件
app.use('/public', express.static(__dirname + '/public'));


// 加载 cookieSession 以支持 AV.User 的会话状态
app.use(AV.Cloud.CookieSession({ secret: '05XgTktKPMkU', maxAge: 3600000, fetchUser: true }));

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
//=========================================================
//通过中间继设置cookie  只要用户访问站点 都会运行这个中间继 入口文件判断用户是否为管理员
app.use(function(req, res, next) {
  //解析用户登录的cookie 信息
  req.userInfo = {};
  var currentUser = req.currentUser || {};
  if(currentUser._isCurrentUser) {
      try {
          //获取当前登录用户的类型,是否是管理员
          req.userInfo._id = req.currentUser.id;
          req.userInfo.username = req.currentUser.attributes.username;
          req.userInfo.isAdmin = Boolean(req.currentUser.attributes.isAdmin);
          next();
      } catch (e) {
          next();
      }
  }else {
          next();
      }
});

//模块划分

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));



//=================================================
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


module.exports = app;
