var express = require('express');
var router = express.Router();
var AV = require('leanengine');

var data;
/*
* 通用数据处理
* */

// router.use(function(req, res, next) {
//     data = {
//         userInfo: req.userInfo
//     }
//     next();
// })

/*
* 首页
* */
var data;
var Content = new AV.Query('Content');
router.get('/',function (req, res) {
    data = {
        userInfo: req.userInfo,
        categories: [],

        count:0,
        page: Number(req.query.page || 1),
        limit: 10,
        pages: 0
    };
    console.log(1111111);
    var query = new AV.Query('Category');
    query.ascending('createdAt');
    query.find().then(function (result) {
    if(result.length){
        var categories = result.map(function(item) {
            return {
                id:item.id,
                name: item.attributes.name
            };
        });
        data.categories = categories;
        return Content.count();
    }
    }).then(function(count){
        console.log(22222222222222,count);
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page-1)*data.limit;
        Content.limit(data.limit);
        Content.skip(skip);
        Content.include(['user', 'category']);
        Content.descending('createdAt');
        Content.find().then(function(querycontents) {
            console.log(3333333333333333);
            var contents = querycontents.map(function(item){
                //console.log(item);
                var user = item.get('user');
                var category = item.get('category');
                return {
                    _id:item.getObjectId(),
                    description: item.get('description'),
                    content: item.get('content'),
                    title: item.get('title'),
                    addTime: item.get('createdAt'),
                    views: item.get('views'),
                    user: user.getUsername(),
                    category: category.get('name')
                }
            });
            data.contents = contents;
            console.log(data);
            res.render('main/index', data);
        })
    })

});
module.exports = router;