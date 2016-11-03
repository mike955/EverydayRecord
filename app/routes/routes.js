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
	app.get('/bill/create', Bill.ShowCreate); 				//创建订单页面
	app.post('/bill/create', Bill.Create);					//新建账单

	app.get('/bill/history', Bill.History);					//查看账单页面
	app.get('/bill/statistic', Bill.statistic);					//查看账单统计页面


	//memo
	app.get('/memo/create', Memo.ShowCreate);		//创建备忘录页面
	app.post('/memo/create', Memo.Create);			//新建备忘录

	//breaking_new
	app.get('/breaking_new/create', BreakingNew.ShowCreate); 	//创建大事件页面
	app.post('/breaking_new/create', BreakingNew.Create);		//新建大事件

	//study_plan
	app.get('/study_plan/create', StudyPlan.ShowCreate);	//创建学习计划页面
	app.post('/study_plan/create', StudyPlan.Create);		//新建学习计划

	//study_experience
	app.get('/study_experience/create', StudyExperience.ShowCreate);		//创建学习心得页面
	app.post('/study_experience/create', StudyExperience.Create);		//新建学习心得

	app.get('/*', function(req, res, next){
		return res.send('Hello , please check your URL and make is sure true');
	})
}