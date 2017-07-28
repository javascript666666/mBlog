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
    /*
    * 从数据库中读取所有用户数据
    *
    * 数据分页显示功能
    *     * query.limit(10);// 最多返回 10 条结果
    * query.skip(10);// 跳过 10 条结果
    * query.count() 统计中数
    *
    * 每页显示5 条
    * page1:  1-5  skip:0 ->(page-1)*limit
    * page2:  6-10  skip:1
     */

    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    var query = new AV.Query('User');
    //查询总数:
    query.count().then(function (count) {
       pages = Math.ceil( count/limit);
       page = Math.min(page, pages);
       page = Math.max(page,1);
       var skip = (page -1) * limit;
       console.log(pages);

       query.descending('createdAt');
       query.limit(limit);
       query.skip(skip);
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
               users: users,

               page: page,
               limit: limit,
               pages: pages,
               count: count
            });
        })
    }, function (error) {});
})

/*
*
* */
module.exports = router;