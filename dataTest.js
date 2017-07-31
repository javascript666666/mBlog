//造数据
'use strict'

const AV = require('leanengine')


AV.init({
    appId: 'vHLTtHOJSNkDCFaW6U3RE6Nl-gzGzoHsz',
    appKey: 'awjoYtyYWrw7tlkLOLOK1ewY',
    masterKey: 'g6YqvlLgXMX81JLAOhirH5dW'
});
//================
//添加有管理员权限的用户
// var user = new AV.User();
//
//   user.setUsername('韩建文');
//   user.setPassword('asdsad123');
//   user.set('isAdmin', true);
//   user.save();
//=============================================================


/*
 //添加数据类型事例

 //AV.Object 支持以下数据类型：
 // 该语句应该只声明一次
 var TestObject = AV.Object.extend('DataTypeTest');

 var number = 2014;
 var string = 'famous film name is ' + number;
 var date = new Date();
 var array = [string, number];
 var object = { number: number, string: string };

 var testObject = new TestObject();
 testObject.set('testNumber', number);
 testObject.set('testString', string);
 testObject.set('testDate', date);
 testObject.set('testArray', array);
 testObject.set('testObject', object);
 testObject.set('testNull', null);
 testObject.save().then(function(testObject) {
 // 成功
 }, function(error) {
 // 失败
 });
 */

// AV.Object.extend('className') 所需的参数 className 则表示对应的表名
// 声明一个类型
//var Todo = AV.Object.extend('Todo');
/*
 //从 v1.4.0 开始，SDK 支持使用 ES6 中的 extends 语法来声明一个继承自 AV.Object 的类，上述的 Todo 声明也可以写作：
 //   class Todo extends AV.Object {}
 // 需要向 SDK 注册这个 Class
 AV.Object.register(Todo);
 2
 每个 id 必须有一个 Class 类名称，这样云端才知道它的数据归属于哪张数据表。


 Class 类名称（ClassName）必须以字母开头，只能包含字母、数字和下划线。
 */
//==================================================

/*
 *  向云存储 数据库中添加表 Category类
 *  构建一个 AV.Object 可以使用如下方式：
 *   AV.Object.extend('className') 所需的参数 className 则表示对应的表名
 */
// 声明一个Category 类型
// var Category = AV.Object.extend('Category');
// var category = new Category();
// category.set('name','Javascript');
// category.save().then(function(testObject) {
//     // 成功
//     console.log('数据库中添加成功')
// }, function(error) {
//     // 失败
//     console.log('数据库中添加失败')
// });

//===========================================================
/* 创建关联数据类型事例
 // 新建一个 AV.Object
 var GuangZhou = new AV.Object('City');// 广州
 GuangZhou.set('name', '广州');
 var GuangDong = new AV.Object('Province');// 广东
 GuangDong.set('name', '广东');
 GuangZhou.set('dependent', GuangDong);// 为广州设置 dependent 属性为广东
 GuangZhou.save().then(function (guangZhou) {
 console.log(guangZhou.id);
 });
 // 广东无需被单独保存，因为在保存广州的时候已经上传到云端。
 */

/*
 * 向云存储 数据库中添加表 Content类
 * */
// var Content = new AV.Object('Content');
// var category = new AV.Object('Category');
// category.set('name','科技新闻');
// var user = new AV.User();
// user.setUsername('韩建文');
// user.setPassword('asdsad123');
// user.set('isAdmin', true);
//
// Content.set('category',category);
//
// Content.set('title','测试文章标题:李彦宏发内部信:搜索业务已逐渐摆脱既往负面影响');
// Content.set('user',user);
// Content.set('views',10);
// Content.set('description','测试文章内容简介:网易科技讯7月28日消息，百度今日发布了2017年第二季度未经审计的财务报告，随后李彦宏发内部信称：“第二季度我们在教育、汽车、物流、本地服务等多个行业增加了近20000名在线活跃客户；相比较一季度，大客户原生广告收入提升250%，信息流广告收入提升200%。客户的持续认可和积极投放，说明我们的搜索业务已逐渐摆脱既往负面影响，更是百度整体平台价值复苏的最有力证明！”');
// Content.set('content','<p>李彦宏难掩兴奋，在内部信中多处引用诗句，他认为人工智能的趋势如“大河汤汤，不可逆转”，并称“千红万紫安排著，只待新雷第一声”，改变世界的蓝图正在我们眼前展开。</p><p><b>以下为李彦宏内部信原文：</b></p><p>各位亲爱的百度同学们：</p><p>大家好。北京时间7月28日，我们公布了百度2017年第二季度的财务报告。过去这个季度公司营业收入约为208.74亿元人民币，比去年同期增长14.3%。人工智能时代从“下一幕”走进“这一幕”的变革时刻，闪耀着每一个百度人不懈创新、执着前行的光辉。在此，我谨代表公司董事会和管理层向大家表示由衷的感谢！</p><p>第二季度，在“夯实移动基础，决胜AI时代”的核心战略之路上，我们的步伐坚定而坚实，移动收入占比达72%，AI正日益成为提升公司核心业务与核心产品的基础驱动力。</p><p>“搜索 + 信息流”的双重引擎不断加大马力，并依托AI的支撑，带给用户更流畅、更丰富的信息世界。信息流的日活跃用户（DAU）超过1亿，新推出的手百9.0版本使搜索体验更加形象化、语音化。百科、知道、贴吧迭代了全新的内容产品形态。6月份统计数据显示，爱奇艺用户每月花在PC和移动APP上的时间分别高达1240亿分钟和3830亿分钟，媒体时间占有能力仅次于微信。</p><p>这些努力和成果，都在推动我们在智能时代做好内容分发和服务连接，让百度真正成为最懂用户的公司，也让客户越来越接受这样的组合服务：第二季度我们在教育、汽车、物流、本地服务等多个行业增加了近20000名在线活跃客户；相比较一季度，大客户原生广告收入提升250%，信息流广告收入提升200%。客户的持续认可和积极投放，说明我们的搜索业务已逐渐摆脱既往负面影响，更是百度整体平台价值复苏的最有力证明！</p><p>我们的人工智能的提前探索与合作布局，在第二季度迎来引爆产业的契机。</p><p>七月初的AI开发者大会上，我们发布了Apollo和DuerOS两大开放平台，第一次向行业展示最完整、最开放、最前沿、也最具活力的AI生态。</p><p>我们正式发布了Apollo 1.0和Apollo开放平台的整体战略与开放路线图，推出了国内首个可量产的车载自动驾驶计算平台BCU（Baidu Computing Unit），并和福特、戴姆勒、微软、博世、大陆、奇瑞、一汽等50家合作伙伴（包括13家整车厂商）构建起全球最强大的自动驾驶生态，帮助伙伴实现“从0到1”的能力跨越，推动数据资源的交换与贡献，加速创新诞生和技术迭代。无人驾驶乃至整个汽车产业的格局和未来，因为Apollo而变得不同以往！</p><p>DuerOS开放平台目前已具备10大类目、100+功能，为手机、智能家居、智能穿戴、车载等多个行业赋能。对人工智能创业公司KITT.AI的全资收购，将进一步增强我们的语音唤醒能力和自然语言理解技术深度。作为下一代基于自然语言的人类计算平台，DuerOS正在中国为全球行业树立新的标准。</p><p>第二季度也是百度金融立足智能金融、培养核心能力的关键时期。上个月，我们与中国农业银行达成合作、共建智能银行，在客户的信用评估、风险管理和产品定位等丰富的应用场景中为传统金融贡献AI Fintech之力，以更加开放的心态与生态伙伴分享、共赢。</p><p>基于人工智能的大数据云计算（ABC）已经成为百度整体人工智能战略行业输出的承担者，冷存储、快存储、存储网关等产品技术也居于业界领先位置。以此为基础，百度云正在开创不同重点行业的云化转型新路径，并构建百度云特色的整体行业生态。</p><p>重视人工智能已渐成全球共识，如大河汤汤、不可逆转。这是所有百度人期待已久的全新机遇，让我们充满了信心和斗志，也对我们的事业提出了更高的要求。五四青年节那天，我们发布了公司的新使命，把原来的“让人们最平等便捷地获取信息找到所求”延伸为“用科技让复杂的世界更简单”。这也意味着百度已经成为一家AI公司，以新使命为感召，不断强化技术创新在在社会、政策层面的改变力量：上个月，我们与南航合作，在河南南阳机场首次实现刷脸登机；与重庆市政府、山西省政府等也签署了合作协议，共同加速智慧城市建设和产业转型升级……未来随着技术能力的不断完备、应用场景的不断丰富，从“连接信息”到“唤醒万物”的理想也必将更为清晰、触手可及。</p><p></p>');
// Content.set('comments',[]);
//
//
// Content.save().then(function(content){
//   console.log(content.id);
// },function(err){
//   console.log(err);
// })
//===============================
//现在登录的用户
// AV.User.current()
//======================================
//一对多关系 Pointers 存储
// 新建一个 AV.Object
//var GuangZhou = new AV.Object('City');// 广州
//GuangZhou.set('name', '广州');
//var GuangDong = new AV.Object('Province');// 广东
//GuangDong.set('name', '广东');
//GuangZhou.set('dependent', GuangDong);// 为广州设置 dependent 属性为广东
//GuangZhou.save().then(function (guangZhou) {
//console.log(guangZhou.id);
//});
// 广东无需被单独保存，因为在保存广州的时候已经上传到云端。

//注意：保存关联对象的同时，被关联的对象也会随之被保存到云端。


//要关联一个已经存在于云端的对象，例如将「东莞市」添加至「广东省」，方法如下：


// 假设 GuangDong 的 objectId 为 56545c5b00b09f857a603632
/*var GuangDong = AV.Object.createWithoutData('Province', '56545c5b00b09f857a603632');
 var DongGuan = new AV.Object('City');
 DongGuan.set('name', '东莞');
 DongGuan.set('dependent', GuangDong);
 DongGuan.save();*/


/*
 Pointers 查询
 假如已知一个城市，想知道它的上一级的省份：
 +

 // 假设东莞作为 City 对象存储的时候它的 objectId 是 568e743c00b09aa22162b11f，这个  objectId 可以在控制台查看
 var DongGuan = AV.Object.createWithoutData('City', '568e743c00b09aa22162b11f');
 DongGuan.fetch({ include: ['dependent'] }).then(function (city) {
 var province = city.get('dependent');
 console.log(province.get('name'));
 });
 */

//假如查询结果中包含了城市，并想通过一次查询同时把对应的省份也一并加载到本地：

/*
 var query = new AV.Query('City');
 query.equalTo('name', '广州');
 query.include(['dependent']);
 query.find().then(function (result) {
 if (result.length > 0) {
 var GuangZhou = result[0];
 var province = GuangZhou.get('dependent');
 }
 });*/

//假如已知一个省份，要找出它的所有下辖城市：


// 假设 GuangDong 的 objectId 为 56545c5b00b09f857a603632
/*
 var GuangDong = AV.Object.createWithoutData('Province', '56545c5b00b09f857a603632');
 var query = new AV.Query('City');
 query.equalTo('dependent', GuangDong);
 query.find().then(function (cities) {
 cities.forEach(function (city, i, a) {
 console.log(city.id);
 });
 });*/
//======================================================
//评论数据测试

//文档事例
/*
 var comment = new AV.Object('Comment');// 构建 Comment 对象
 comment.set('likes', 1);// 如果点了赞就是 1，而点了不喜欢则为 -1，没有做任何操作就是默认的 0
 comment.set('content', '这个太赞了！楼主，我也要这些游戏，咱们团购么？');
 // 假设已知被分享的该 TodoFolder 的 objectId 是 5735aae7c4c9710060fbe8b0
 var targetTodoFolder = AV.Object.createWithoutData('TodoFolder', '5735aae7c4c9710060fbe8b0');
 comment.set('targetTodoFolder', targetTodoFolder);
 comment.save();//保存到云端*/

var comment = new AV.Object('Comment');
comment.set('likes', 1);
comment.set('content','这是一篇好文章');
var targertContent = AV.Object.createWithoutData('Content','597b5f4f128fe10056103c34');
var targetUser = AV.Object.createWithoutData('User','597ab069fe88c20057afb184')
comment.set('content',targertContent);
comment.set('content',targetUser);
comment.save();

//=================================================
var targetContent = AV.Object.createWithoutData('Content', req.body.contentid);
var Comment = new AV.Query('Comment');
Comment.equalTo('content', targetContent);
query.find().then(function (results) {
    var comments = results.map(function(item) {
        return {
            username: item.get('username'),
            postTime: item.get('createdAt'),
            contentId: item.get('contentId'),
            content: item.get('content'),
            likes: item.get('likes')
        }
    })