'use strict';

import Memo from '../models/memo';

exports.ShowCreate =function(req, res){
	res.render('memo/create', {
		user: req.session.user
	});
}

exports.Create = async function(req, res){
	let memo_data = req.body;
	let new_data = {};

	if(memo_data.theme === ''){
		res.render('memo/create', {
			user: req.session.user,
			info: '请填写主题'
		});
	}else if(memo_data.time === '') {
		res.render('memo/create', {
			user: req.session.user,
			info: '请输入时间'
		});
	} else if( memo_data.content === ''){
		res.render('memo/create', {
			user: req.session.user,
			info: '请填写备忘录内容'
		});
	}else{
		new_data.theme = memo_data.theme;
		new_data.time = memo_data.time;
		new_data.content = memo_data.content;

		//查找用户id
		let uid = await Memo.findByName(req.session.user.username);

		if(uid[0].id){
			new_data.accountID = uid[0].id;
			let result = await Memo.create(new_data);

			if(result === 'success'){
				res.render('memo/create', {
					info: '备忘录记录成功',
					user: req.session.user
				});
			}else{
				res.render('memo/create', {
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