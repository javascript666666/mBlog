var express = require('express');
var router = express.Router();
var AV = require('leanengine');

var data;
/*
* 通用数据处理
* */

router.use(function(req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: [],
        category: req.query.category || ''
    }
    //console.log(data.category,1111111111)
    var query = new AV.Query('Category');
    query.ascending('createdAt');
    query.find().then(function (result) {
        var categories = result.map(function (item) {
            return {
                id: item.id,
                name: item.attributes.name
            };
        });
        data.categories = categories;
        next();
    },function(err) {
        console.log(err);
        next();
    });
});

/*
* 首页
* */

var findcategory = "";

router.get('/',function (req, res) {
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;
   //console.log(data,2222);
    function countFn(){
        console.log(data.category,9999999)
        if (data.category) {
            return (function(){
                var Category = new AV.Query('Category');
                return Category.get(data.category)
            })().then(function (category) {
                //console.log(category);
                findcategory = category;
                var Content = new AV.Query('Content');
                if (data.category) {
                    Content.equalTo('category', category);
                    return Content.count();
                }
            })
        }
        var Content = new AV.Query('Content');
        console.log(222222);
        return Content.count();
    };
    countFn().then(function (count) {
        console.log(count);
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
        //console.log(findcategory);
        if (data.category) {
            Content.equalTo('category', findcategory);
            return Content.find();
        }
        return Content.find();
    }).then(function (querycontents) {
        var contents = querycontents.map(function (item) {
            //console.log(item);
            var user = item.get('user');
            var category = item.get('category');
            return {
                id: item.getObjectId(),
                description: item.get('description'),
                content: item.get('content'),
                title: item.get('title'),
                addTime: item.get('createdAt'),
                views: item.get('views'),
                comments: item.get('comments'),
                user: user.getUsername(),
                category: category.get('name')
            }
        });
        data.contents = contents;
        res.render('main/index', data);
    }).catch(function (error) {
        console.error(error);
    });
})
/*
* 阅读全文
* */
router.get('/view', function(req, res){
    var contentId = req.query.contentid || '';
    var Content = new AV.Query('Content');
    Content.get(contentId).then(function(result) {
        //console.log(result,999);
        var content = {
            title: result.get('title'),
            content: result.get('content'),
            addTime: result.get('createdAt'),
            username: result.get('user').get('name'),
            comments: result.get('comments'),
            views: result.get('views')+1
        };
        data.content = content;
        data.category = result.get('category').getObjectId();
        result.increment('views', 1);
        result.save();
    }).then(function(success){
        //console.log(data); 阅读数保存成功
        res.render('main/view',data);
    },function(err){
        //console.log(err)
    })
});

module.exports = router;