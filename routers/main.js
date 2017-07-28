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

router.get('/',function (req, res) {
    var query = new AV.Query('Category');
    query.ascending('createdAt');
    query.find().then(function (result) {
    if(result.length){
        var categories = result.map(function(item) {
            return {
                id:item.id,
                name: item.attributes.name
            };
        })
        //console.log(categories);
        res.render('main/index', {
            userInfo: req.userInfo,
            categories: categories
        });
    }
    },function(err){

    })

});
module.exports = router;