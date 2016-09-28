'use strict';

import StudyPlan from '../models/study_plan';

exports.ShowCreate =function(req, res){
	res.render('study_plan/create', {
		user: req.session.user
	});
}

exports.Create = async function(req, res){
	let study_plan_data = req.body;
	let new_data = {};

	if(study_plan_data.subject === ''){
		res.render('breaking_new/create', {
			user: req.session.user,
			info: '请填写学科类型'
		});
	}else if(study_plan_data.category=== '') {
		res.render('breaking_new/create', {
			user: req.session.user,
			info: '请填写学科类别'
		});
	} else if(study_plan_data.planTime === ''){
		res.render('breaking_new/create', {
			user: req.session.user,
			info: '请填写计划完成时间'
		});
	} else if(study_plan_data.content === ''){
		res.render('breaking_new/create', {
			user: req.session.user,
			info: '请填写大事件内容'
		});
	}else{
		/*转为学科为对应数字进行存储
		1:计算机
		******************************/
		switch(study_plan_data.subject){
			case '计算机':
				new_data.subject = 1;
				break;
			default:
				new_data.subject = 0;
				break;
		}

		/*转换类别为对应数字进行存储
		1:数据库，2:Node.js，3:源码，4:NPM模块，5:架构，
		6:JavaScript，7:React，8:HTML+CSS，9:其它
		******************************/
		switch(new_data.category ){
			case '数据库':
				new_data.category = 1;
				break;
			case 'Node.js':
				new_data.category = 2;
				break;
			case '源码':
				new_data.category = 3;
				break;
			case 'NPM模块':
				new_data.category = 4;
				break;
			case '架构':
				new_data.category = 5;
				break;
			case 'JavaScript':
				new_data.category = 6;
				break;
			case 'React':
				new_data.category = 7;
				break;
			case 'HTML+CSS':
				new_data.category = 8;
				break;
			case '其它':
				new_data.category = 8;
				break;
			default:
				new_data.category = 0;
				break;
		}
		new_data.planTime = study_plan_data.planTime;
		new_data.content = study_plan_data.content;
		new_data.actualTime = '';
		new_data.finish = 0;  //0:未完成，1:完成
		new_data.cause = '';
		//查找用户id
		let uid = await StudyPlan.findByName(req.session.user.username);

		if(uid[0].id){
			new_data.accountID = uid[0].id;
			let result = await StudyPlan.create(new_data);

			if(result === 'success'){
				res.render('study_plan/create', {
					info: '学习计划创建成功',
					user: req.session.user
				});
			}else{
				res.render('study_plan/create', {
					info: '请重新创建学习计划',
					user: req.session.user
				});
			}
		}else{
			res.render('user/signin', {
			});
		}
	}
}