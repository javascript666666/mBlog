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


router.get('/',function (req, res) {
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;

    function countFn(){
        var Content = new AV.Query('Content');
        if(data.category){
            Content.equalTo('category', new AV.Object.createWithoutData('Category',data.category));
            return Content.count();
        }
        return Content.count();
    };

    countFn().then(function (count) {
        //console.log(count);
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page - 1) * data.limit;

        var Content = new AV.Query('Content');
        Content.limit(data.limit);
        Content.skip(skip);
        Content.descending('createdAt');
        Content.include(['user', 'category']);
        if (data.category) {
            Content.equalTo('category', new AV.Object.createWithoutData('Category',data.category));
            return Content.find();
        }
        return Content.find();
    }).then(function (querycontents) {
        var contents = querycontents.map(function (item) {
           // console.log(item.get('user'));
            var user = item.get('user');
            var category = item.get('category');
            return {
                id: item.id,
                description: item.get('description'),
                content: item.get('content'),
                title: item.get('title'),
                addTime: item.createdAt,
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
    Content.include('user');
    Content.get(contentId).then(function(result) {
        var content = {
            id: result.id,
            title: result.get('title'),
            content: result.get('content'),
            addTime: result.get('createdAt'),
            username: result.get('user').getUsername(),
            views: result.get('views') + 1
        };
        data.content = content;
        data.category = result.get('category').id;
        result.increment('views', 1);
        return result.save();
    }).then(function(success){
        var Comment = new AV.Query('Comment');
        var targetContent = AV.Object.createWithoutData('Content', contentId);
        Comment.equalTo('contentId', targetContent);
        Comment.include('contentId')
        return Comment.find();
    }).then(function(Comments){
        //console.log(Comments,6666666)
        var comments = Comments.map(function(item){
            return {
                postTime: item.createdAt,
                contentId: item.get('contentId').id,
                content: item.get('content'),
                likes: item.get('likes')
            }
        });
        data.content.comments = comments;
    }).then(function(success){
        //console.log(data); 阅读数读取成功
        res.render('main/view',data);
    }).catch(function(err) {
        console.log(err);
    });
});



module.exports = router;