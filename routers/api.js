var express = require('express');
var router = express.Router();
var AV = require('leanengine');

//统一返回格式
var responseData;

router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

/*
* 用户注册
* */

router.post('/user/register',function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if(!username || username.trim().length ==0 || !password || password.trim().length == 0) {
        responseData.code = 1;
        responseData.message = '用户名密码不能为空';
        res.json(responseData);
        return;
    }
    if(password != repassword) {
        responseData.code = 2;
        responseData.message = '两次输入密码不一致';
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册, 查找数据库中同名用户名,存在已注册

    var query = new AV.Query('User');
     query.equalTo('username',username);
     query.find().then(function (rs) {
         console.log(rs);
         if( rs.length != 0){
             responseData.code = 3;
             responseData.message = '用户名已重名';
             res.json(responseData);
             return;
         }
         var user = new AV.User();
         user.set("username", username);
         user.set("password", password);
         user.signUp().then(function(user) {
             responseData.message = '注册成功';
             res.json(responseData);
             return;
         })
     });
})

/*
* 登录
* */
router.post('/user/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username =='' || password == ''){
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return;
    }

    //查询数据库中相同用户名和密码的记录是否存在,如果存在则登录成功
    AV.User.logIn(username, password).then(function(userInfo) {
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: userInfo.id,
            username: userInfo.attributes.username
        }
        //登录成功 给客户端发送cookies信息
        res.saveCurrentUser(userInfo);
        res.json(responseData);
        return;
    },function(err) {
        responseData.code = 4;
        responseData.message = '登录失败,用户名或密码错误';
        res.json(responseData);
    })
})


/*
* 退出
* */
router.get('/user/logout', function(req, res) {
    req.currentUser.logOut();
    res.clearCurrentUser();//从Cookie中删除用户
    responseData.message = '退出成功'
    res.json(responseData);
});



module.exports = router;