'use strict';

import Index from '../controllers/index';
import User from '../controllers/user';
import Bill from '../controllers/bill';

module.exports = function(app) {
	app.get('/', Index.index);							//主页面
	app.get('/user/signup', User.showSignup);			//注册页面
	app.get('/user/signin', User.showSignin);			//登录页面
	app.get('/main',User.main);							//登录成功页面

	app.get('/bill/create', Bill.create); 					//创建订单页面
	//app.get('bill/history', Bill.history);					//查看订单历史页面

	app.post('/signup', User.signup);					//用户注册
	app.post('/signin', User.signin);						//用户登陆


	app.get('/*', function(req, res, next){
		return res.send('Hello , please check your URL and make is sure true');
	})
}