'use strict';

import Index from '../controllers/index';
import User from '../controllers/user';

module.exports = function(app) {
	app.get('/', Index.index);							//主页面
	app.get('/user/signup', User.showSignup);			//注册页面
	app.get('/user/signin', User.showSignin);			//登录页面

	app.post('/signup', User.signup);					//用户注册
	app.post('/signin', User.signin);

	app.get('/*', function(req, res, next){
		return res.send('Hello , please check your URL and make is sure true');
	})
}