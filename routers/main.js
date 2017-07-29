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
var findcategory;

router.get('/',function (req, res) {
    data = {
        userInfo: req.userInfo,
        categories: [],
        category: req.query.category || '',

        count:0,
        page: Number(req.query.page || 1),
        limit: 10,
        pages: 0
    };
    var query = new AV.Query('Category');
    query.ascending('createdAt');
    query.find().then(function (result) {
        if(!result.length){
            return
        }
        var categories = result.map(function(item) {
            return {
                id:item.id,
                name: item.attributes.name
            };
        });
        data.categories = categories;

        if (data.category){
            var Category = new AV.Query('Category');
            return Category.get(data.category);
        }
        }).then(function(category) {
        //console.log(category);
        findcategory = category;
        var Content = new AV.Query('Content');
        if (data.category) {
            Content.equalTo('category', category);
            return Content.count();
        }
        return Content.count();
    }).then(function(count){
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page - 1) * data.limit;

        var Content = new AV.Query('Content');
        Content.limit(data.limit);
        Content.skip(skip);
        Content.include(['user', 'category']);
        Content.descending('createdAt');
        if (data.category){
            Content.equalTo('category',findcategory);
            return Content.find();
        }
        return Content.find();
    }).then(function(querycontents) {
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
            res.render('main/index', data);
        },function(err){
        console.log(err);
    }).catch(function(error) {
        console.error(error);
    });
});
module.exports = router;