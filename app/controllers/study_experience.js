'use strict';

import StudyExperienceModel from '../models/study_experience';


export default class StudyExperience{
	static showCreate(req, res){
		//判断用户是否登陆
		if(!req.session.user){
			res.render('user/signin', {
			});
		}else{	
			res.render('study_experience/create', {
				user: req.session.user
			});	
		}
	}

	static async create(req, res){
		//判断用户是否登陆
		if(!req.session.user){
			res.render('user/signin', {
			});
		}else{
			let post_data = req.body;
			let new_data = {};

			if(post_data.subject === ''){
				res.render('study_experience/create', {
					user: req.session.user,
					info: '请填写学科类型'
				});
			} else if(post_data.category === ''){
				res.render('study_experience/create', {
					user: req.session.user,
					info: '请填写类别'
				});
			} else if(post_data.content === ''){
				res.render('study_experience/create', {
					user: req.session.user,
					info: '请填写学习心得'
				});
			} else {
				/*转为学科为对应数字进行存储
				1:计算机
				******************************/
				switch(post_data.subject){
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
				switch(post_data.category ){
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
				new_data.content = post_data.content;

				//差找用户id
				let uid = await StudyExperienceModel.findByName(req.session.user.username);

				if(uid[0].id){
					new_data.accountID = uid[0].id;
					let result = await StudyExperienceModel.create(new_data);

					if(result === 'success'){
						res.render('study_experience/create', {
							info: '学习心得创建成功',
							user: req.session.user
						});
					}else{
						res.render('study_experience/create', {
							info: '请重新创建学习心得',
							user: req.session.user
						});
					}
				}else{
					res.render('user/signin', {
					});
				}
			}	
		}
	}
}
// exports.ShowCreate =function(req, res){
// 	//判断用户是否登陆
// 	if(!req.session.user){
// 		res.render('user/signin', {
// 		});
// 	}else{	
// 		res.render('study_experience/create', {
// 			user: req.session.user
// 		});	
// 	}
// }

// exports.Create = async function(req, res){
// 	//判断用户是否登陆
// 	if(!req.session.user){
// 		res.render('user/signin', {
// 		});
// 	}else{
// 		let post_data = req.body;
// 		let new_data = {};

// 		if(post_data.subject === ''){
// 			res.render('study_experience/create', {
// 				user: req.session.user,
// 				info: '请填写学科类型'
// 			});
// 		} else if(post_data.category === ''){
// 			res.render('study_experience/create', {
// 				user: req.session.user,
// 				info: '请填写类别'
// 			});
// 		} else if(post_data.content === ''){
// 			res.render('study_experience/create', {
// 				user: req.session.user,
// 				info: '请填写学习心得'
// 			});
// 		} else {
// 			/*转为学科为对应数字进行存储
// 			1:计算机
// 			******************************/
// 			switch(post_data.subject){
// 				case '计算机':
// 					new_data.subject = 1;
// 					break;
// 				default:
// 					new_data.subject = 0;
// 					break;
// 			}


// 			/*转换类别为对应数字进行存储
// 			1:数据库，2:Node.js，3:源码，4:NPM模块，5:架构，
// 			6:JavaScript，7:React，8:HTML+CSS，9:其它
// 			******************************/
// 			switch(post_data.category ){
// 				case '数据库':
// 					new_data.category = 1;
// 					break;
// 				case 'Node.js':
// 					new_data.category = 2;
// 					break;
// 				case '源码':
// 					new_data.category = 3;
// 					break;
// 				case 'NPM模块':
// 					new_data.category = 4;
// 					break;
// 				case '架构':
// 					new_data.category = 5;
// 					break;
// 				case 'JavaScript':
// 					new_data.category = 6;
// 					break;
// 				case 'React':
// 					new_data.category = 7;
// 					break;
// 				case 'HTML+CSS':
// 					new_data.category = 8;
// 					break;
// 				case '其它':
// 					new_data.category = 8;
// 					break;
// 				default:
// 					new_data.category = 0;
// 					break;
// 			}
// 			new_data.content = post_data.content;

// 			//差找用户id
// 			let uid = await StudyExperience.findByName(req.session.user.username);

// 			if(uid[0].id){
// 				new_data.accountID = uid[0].id;
// 				let result = await StudyExperience.create(new_data);

// 				if(result === 'success'){
// 					res.render('study_experience/create', {
// 						info: '学习心得创建成功',
// 						user: req.session.user
// 					});
// 				}else{
// 					res.render('study_experience/create', {
// 						info: '请重新创建学习心得',
// 						user: req.session.user
// 					});
// 				}
// 			}else{
// 				res.render('user/signin', {
// 				});
// 			}
// 		}	
// 	}
// }