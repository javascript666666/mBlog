var express = require('express');
var router = express.Router();
var AV = require('leanengine');

router.use(function(req, res, next) {
    if(!req.userInfo.isAdmin){
        //如果当前用户是非管理员
        res.send('对不起,只有管理员才能进入后台管理');
        return;
    }
    next();
})


/*
* 首页
* */
router.get('/', function(req, res) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

/*
* 用户管理
* */

router.get('/user',function(req, res){
    //从数据库中读取所有用户数据
    var query = new AV.Query('User');
    query.descending('createdAt');
    query.find().then(function (result) {
        var users = result.map(function(item, index){
            return {
                _id: item.id,
                username:item.attributes.username,
                createdAt:item.createdAt.toString(),
                isAdmin: Boolean(item.attributes.isAdmin)
            }
        });
        //console.log( users);
        res.render('admin/user_index', {
            userInfo: req.userInfo,
            users: users
        });
    })
})

/*
*
* */
module.exports = router;