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
var user = new AV.User();

    user.setUsername('韩建文');
  user.setPassword('asdsad123');
  user.set('isAdmin', true);
  user.save();
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

/*
* 向云存储 数据库中添加表 Content类
* */