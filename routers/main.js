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
    res.render('main/index', {
        userInfo: req.userInfo
    });
});
module.exports = router;