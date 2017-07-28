//造数据
'use strict'

const AV = require('leanengine')


AV.init({
  appId: 'vHLTtHOJSNkDCFaW6U3RE6Nl-gzGzoHsz',
  appKey: 'awjoYtyYWrw7tlkLOLOK1ewY',
  masterKey: 'g6YqvlLgXMX81JLAOhirH5dW'
});
//================

var user = new AV.User();

	user.setUsername('admin');
  user.setPassword('admin');
  user.set('isAdmin', true);
  user.save();