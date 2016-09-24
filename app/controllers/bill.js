'use strict';

import Bill from '../models/bill';

exports.showCreate =  function(req, res){
	res.render('bill/create', {
		user: req.session.user
	});
}

exports.Create = async function(req, res){
	console.log(req.body);
	let new_data = {};

	//没有输入金额
	if(req.body.money === ''){
		res.render('bill/create', {
			info: '请输入金额',
			user: req.session.user
		});
	}else{
		new_data.money = req.body.money;

		/**********************************
		“消费方式” 转换为 数字 进行存储
		1:天猫超市，2:京东超市，3:淘宝天猫，
		4:京东商城，5:当当网，6:亚马逊，7:现金消费
		，8:唯品会，9:其它
		***********************************/
		switch(req.body.ways){
			case '天猫超市': new_data.ways = 1;
					break;
			case '京东超市': new_data.ways = 2;
					break;
			case '淘宝天猫': new_data.ways = 3;
					break;
			case '京东商城': new_data.ways = 4;
					break;
			case '当当网': new_data.ways = 5;
					break;
			case '亚马逊': new_data.ways = 6;
					break;
			case '现金消费': new_data.ways = 7;
					break;
			case '唯品会': new_data.ways = 8;
					break;
			case '其它': new_data.ways = 9;
					break;
			default: new_data.ways = 0;
		}

		/*************************************
		“消费用途” 转换为 数字进行存储
		1:生活用品，2:学习书籍，3:电子产品，4:公交地铁打车，
		5:饭卡充值，6:餐饮，7:礼品赠品，8:其它
		**************************************/

		switch(req.body.types){
			case '生活用品' : new_data.type = 1;
					break;
			case '学习书籍' : new_data.type = 2;
					break;
			case '电子产品' : new_data.type = 3;
					break;
			case '公交地铁打车' : new_data.type = 4;
					break;
			case '饭卡充值' : new_data.type = 5;
					break;
			case '餐饮' : new_data.type = 6;
					break;
			case '礼品赠品' : new_data.type = 7;
					break;
			case '其它' : new_data.type = 8;
					break;
			default : new_data.type = 0;
					break;
		}
	}	
	
	//查找用户id
	let uid = await Bill.findByName(req.session.user.username);
	
	if(uid[0].id){
		new_data.accountID = uid[0].id;
		let result = await Bill.create(new_data);

		if(result === 'success'){
			res.render('bill/create', {
				info: '消费记录成功',
				user: req.session.user
			});
		}else{
			res.render('bill/create', {
				info: '请重新输入',
				user: req.session.user
			});
		}
	}else{
		res.render('user/signin', {
		});
	}
}