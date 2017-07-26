//造数据
'use strict'

const AV = require('leanengine')


AV.init({
  appId: 'qMXwMb82EgtCiAnslcjKmR31-gzGzoHsz',
  appKey: 'KsCbss7I0Pv685NK37xBujWH',
  masterKey: 'BVm1yVPVrfFuMGBcOmSnhPMs'
});

 
new AV.Object('Tags',{
   tagName: 'Javascript'
 }).save();