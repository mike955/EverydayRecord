'use strict';

import Index from '../controllers/index';
import User from '../controllers/user';
import Bill from '../controllers/bill';
import Memo from '../controllers/memo';
import BreakingNew from '../controllers/breaking_new';
import StudyPlan from '../controllers/study_plan';
import StudyExperience from '../controllers/study_experience';

module.exports = function(app) {
	//pre handle user
	/*app.use(function(req, res, next){
		let _user = req.session.user;
		app.locals.user = _user;
		console.log(app.locals.user);
		next();
	});*/

	app.get('/', Index.index);							//主页面
	app.get('/user/signup', User.showSignup);			//注册页面
	app.get('/user/signin', User.showSignin);			//登录页面
	app.get('/main',User.main);							//登录成功页面

	app.post('/signup', User.signup);					//用户注册
	app.post('/signin', User.signin);						//用户登陆
	app.get('/logout', User.logout);						//用户退出

	//bill
	app.get('/bill/create', Bill.showCreate); 				//创建订单页面
	app.post('/bill/create', Bill.create);					//新建账单

	app.get('/bill/history', Bill.showHistory);				//查看账单页面
	app.get('/bill/statistic', Bill.showStatistic);			//查看账单统计页面


	//memo
	app.get('/memo/create', Memo.showCreate);		//创建备忘录页面
	app.post('/memo/create', Memo.create);			//新建备忘录

	//breaking_new
	app.get('/breaking_new/create', BreakingNew.showCreate); 	//创建大事件页面
	app.post('/breaking_new/create', BreakingNew.create);		//新建大事件

	//study_plan
	app.get('/study_plan/create', StudyPlan.showCreate);	//创建学习计划页面
	app.post('/study_plan/create', StudyPlan.create);		//新建学习计划

	//study_experience
	app.get('/study_experience/create', StudyExperience.showCreate);		//创建学习心得页面
	app.post('/study_experience/create', StudyExperience.create);		//新建学习心得

	app.get('/*', function(req, res, next){
		return res.send('Hello , please check your URL and make is sure true');
	})
}