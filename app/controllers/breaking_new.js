'use strict';

import BreakingNewModel from '../models/breaking_new';


export default class BreakingNew{

	//showCreate
	static showCreate(req, res){
		//判断用户是否登陆
		if(!req.session.user){
			res.render('user/signin', {
			});
		}else{
			res.render('breaking_new/create', {
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
			let news_data = req.body;
			let new_data = {};

			if(news_data.theme === ''){
				res.render('breaking_new/create', {
					user: req.session.user,
					info: '请填写主题'
				});
			}else if(news_data.time === '') {
				res.render('breaking_new/create', {
					user: req.session.user,
					info: '请输入时间'
				});
			} else if(news_data.people === ''){
				res.render('breaking_new/create', {
					user: req.session.user,
					info: '请输入人物'
				});
			} else if(news_data.content === ''){
				res.render('breaking_new/create', {
					user: req.session.user,
					info: '请填写大事件内容'
				});
			}else{
				new_data.theme = news_data.theme;
				new_data.time = news_data.time;
				new_data.figure = news_data.people;
				new_data.content = news_data.content;
				//查找用户id
				let uid = await BreakingNewModel.findByName(req.session.user.username);

				if(uid[0].id){
					new_data.accountID = uid[0].id;
					let result = await BreakingNewModel.create(new_data);

					if(result === 'success'){
						res.render('breaking_new/create', {
							info: '大事件记录成功',
							user: req.session.user
						});
					}else{
						res.render('breaking_new/create', {
							info: '请重新输入',
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