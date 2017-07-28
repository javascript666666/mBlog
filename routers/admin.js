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

    var user = new AV.Query('User');
    //查询总数:
    user.count().then(function (count) {
       pages = Math.ceil( count/limit);
       page = Math.min(page, pages);
       page = Math.max(page,1);
       var skip = (page -1) * limit;
       //console.log(pages);

       user.descending('createdAt');
       user.limit(limit);
       user.skip(skip);
       user.find().then(function (result) {
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
    }, function (error) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '用户名未找到'
        });
    });
})

/*
* 分类管理
* */

router.get('/category',function(req, res) {
    var page = Number(req.query.page || 1);
    var limit = 4;
    var pages = 0;

    var categories = new AV.Query('Category');
    categories.count().then(function(count){
        pages = Math.ceil( count/limit);
        page = Math.min(page, pages);
        page = Math.max(page,1);
        var skip = (page -1) * limit;

        categories.descending('createdAt');
        categories.limit(limit);
        categories.skip(skip);
        categories.find().then(function (result) {
            var categoriesArr = result.map(function(item, index){
                return {
                    _id: item.id,
                    name:item.attributes.name,
                    createdAt:item.createdAt.toString()
                }
            });

            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categoriesArr,

                count: count,
                pages: pages,
                page: page,
                limit: limit
            })
        },function(err){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库未找到数据'
            });
        });
    })
})

//分类添加

router.get('/category/add', function(req, res) {
    res.render('admin/category_add');
})

//分类的保存
router.post('/category/add',function(req, res){
    var name = req.body.name || '';
    if(name.trim() == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }

    //数据库中查找是否存在同类名称
    var categories = new AV.Query('Category');
    categories.equalTo('name', name);
    categories.find().then(function (rs) {
        if(rs.length){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类名称重复'
            });
            return;
        }
        var Category = AV.Object.extend('Category');
        var category = new Category();
        category.set("name", name);
        category.save().then(function(category) {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '分类保存成功'
            });
            return;
        })
    }),function(err){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类名称保存失败'
        });
    };
});


/*
* 分类的修改
* */

router.get('/category/edit',function(req, res){
    //获取要修改的分类信息, 并且用表单的形式展现出来
    var _id = req.query.id || '';
    var query = new AV.Query('Category');
    query.get(_id).then(function(result){
        if (!result) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return;
        }
        var category = {
            name: result.attributes.name,
            _id: result.objectId
        }
        res.render('admin/category_edit', {
            userInfo: req.userInfo,
            category: category
        })
        return;
    },function(err) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类名称未找到'
        });
    });
})

/*
*  分类修改的保存
* */

router.post('/category/edit',function(req, res) {
    var _id = req.query.id || '';
    var newname = req.body.name.trim() || '';
    if (!newname){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类名称不能为空'
        });
    }
    var query = new AV.Query('Category');
    //查询这条数据是否在数据库中存在
    query.get(_id).then(function(result){
        if (!result) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return;
        }
        var oldname = result.attributes.name;
       //查看新加的名称是否重名
        query.equalTo('name',newname);
        query.find().then(function (rs) {
            if(rs.length){
               //重名
                if( newname == oldname){
                    res.render('admin/success', {
                        userInfo: req.userInfo,
                        message: '修改成功',
                        url: '/admin/category'
                    });
                    return;
                }
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '分类名称重名,请重新输入'
                });
                return;
            } else {

                var  category = AV.Object.createWithoutData('Category', _id);
                category.set('name', newname);
                category.save().then(function(){
                    res.render('admin/success', {
                        userInfo: req.userInfo,
                        message: '修改成功',
                        url: '/admin/cagegory'
                    });
                    return;
                },function(err){
                    res.render('admin/error', {
                        userInfo: req.userInfo,
                        message: '数据库出差,保存失败'
                    });
                    return;
                })

            }
        })
    },function(err) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类名称未找到'
        });
    });
});


/*
*  分类修改的删除
* */

router.get('/category/delete',function(req, res){
    var _id = req.query.id || '';
    var query = new AV.Query('Category');
    query.get(_id).then(function(category){
        if(!category){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            })
            return;
        } else {
            var category = AV.Object.createWithoutData('Category', _id);
            category.destroy().then(function (success) {
                // 删除成功
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '删除成功',
                    url: '/admin/category'
                })
            }, function (error) {
                // 删除失败
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '删除失败'
                });
            })
        }
    })
})

/*
* 内容管理
* */
//内容首页
router.get('/content', function(req, res) {
    res.render('admin/content_index',{
        userInfo: req.userInfo
    })
})


/*
* 内容添加
* */
router.get('/content/add',function(req, res){

    var query = new AV.Query('Category');
    query.descending('createdAt');
    query.find().then(function (result) {
        if(result.length){
            var categories = result.map(function(item) {
                return {
                    id:item.id,
                    name: item.attributes.name
                };
            })
            //console.log(categories);
            res.render('admin/content_add', {
                userInfo: req.userInfo,
                categories: categories
            });
        }
    },function(err){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '数据未找到'
        });
    })
})
module.exports = router;