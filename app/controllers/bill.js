'use strict';
import _ from 'lodash';
import moment from 'moment';

import BillModel from '../models/bill';

export default class Bill{

	//showCreate
	static showCreate(req, res){
		//判断用户是否登陆
		if(req.session.user){
			res.render('bill/create', {
				user: req.session.user
			});
		}else{
			res.render('user/signin', {
			});
		}
	}

	//create
	static async create(req, res){
		let new_data = {};
		//判用户是否登陆
		if(!req.session.user){
			res.render('user/signin', {
			});
		}else{
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
			let uid = await BillModel.findByName(req.session.user.username);
			
			if(uid[0].id){
				new_data.accountID = uid[0].id;
				let result = await BillModel.create(new_data);

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
	}

	//showHistory
	static async showHistory(req, res){
		let result;
		//判用户是否登陆
		if(!req.session.user){
			res.render('user/signin', {
			});
		}else{
			try{	//查找用户id
				let uid = await BillModel.findByName(req.session.user.username);

				if(uid[0].id){//查找用户的账单数据
					result = await BillModel.findAll(uid[0].id);

					//对取出的数据ways和type进行转换
					for(let m = 0; m < result.length; m++){
						result[m].createdTime = moment(result[m].createdTime).format('YYYY-MM-DD HH:mm:ss');

						switch(result[m].ways){
							case 1 :
								result[m].ways = '天猫超市';
								break;
							case 2 :
								result[m].ways = '京东超市';
								break;
							case 3 :
								result[m].ways = '淘宝天猫';
								break;
							case 4 :
								result[m].ways = '京东商城';
								break;
							case 5 :
								result[m].ways = '当当网';
								break;
							case 6 :
								result[m].ways = '亚马逊';
								break;
							case 7 :
								result[m].ways = '现金消费';
								break;
							case 8 :
								result[m].ways = '唯品会';
								break;					
							case 9 :
								result[m].ways = '其它';
								break;
							default:
								break;
						}

						switch(result[m].type){
							case 1 :
								result[m].type = '生活用品';
								break;
							case 2 :
								result[m].type = '学习书籍';
								break;
							case 3 :
								result[m].type = '电子产品';
								break;
							case 4 :
								result[m].type = '公交地铁打车';
								break;
							case 5 :
								result[m].type = '饭卡充值';
								break;
							case 6 :
								result[m].type = '餐饮';
								break;
							case 7 :
								result[m].type = '礼品赠品';
								break;
							case 8 :
								result[m].type = '其它';
							default:
								break;
						}
					}
				}else{
					res.render('user/signin', {
					});
				}
			}catch(error){
				console.log(error);
			}
			res.render('bill/history', {
				user: req.session.user,
				bills: result
			});
		}
	}

	//showStatistic
	static async showStatistic(req, res){
		//判用户是否登陆
		if(!req.session.user){
			res.render('user/signin', {
			});
		}else{
			let username = req.session.user.username;
			
			/**********************************
			“消费方式” 与数字对应关系 
			1:天猫超市，2:京东超市，3:淘宝天猫，
			4:京东商城，5:当当网，6:亚马逊，7:现金消费
			，8:唯品会，9:其它

			“消费用途” 与数字对应关系
			1:生活用品，2:学习书籍，3:电子产品，4:公交地铁打车，
			5:饭卡充值，6:餐饮，7:礼品赠品，8:其它
			***********************************/
			let uid;				//用户ID
			let sumMoney;		//所有消费

			let sumWays = [];	//消费方式
			let sumTypes = []; 	//消费用途

			/************************************************
			let sumWay[0];		//天猫超市消费
			let sumWay[1];		//京东超市消费
			let sumWay[2];		//淘宝天猫消费
			let sumWay[3];		//京东商城消费
			let sumWay[4];		//当当网消费
			let sumWay[5];		//亚马逊消费
			let sumWay[6];		//现金消费
			let sumWay[7];		//唯品会消费
			let sumWay[8];		//其它消费

			let sumType[0];		//生活用品消费
			let sumType[1];		//学习书籍消费
			let sumType[2];		//电子产品消费
			let sumType[3];		//公交地铁打车消费
			let sumType[4];		//饭卡充值消费
			let sumType[5];		//餐饮消费
			let sumType[6];		//礼品赠品消费
			let sumType[7];		//其它消费
			*************************************************/

			try{
				uid = await BillModel.findByName(username);
				if(uid[0].id){
					sumMoney = await BillModel.sumMoney(uid[0].id);
					sumWays[0] = await BillModel.sumWays(1, uid[0].id);
					sumWays[1] = await BillModel.sumWays(2, uid[0].id);
					sumWays[2] = await BillModel.sumWays(3, uid[0].id);
					sumWays[3] = await BillModel.sumWays(4, uid[0].id);
					sumWays[4] = await BillModel.sumWays(5, uid[0].id);
					sumWays[5] = await BillModel.sumWays(6, uid[0].id);
					sumWays[6] = await BillModel.sumWays(7, uid[0].id);
					sumWays[7] = await BillModel.sumWays(8, uid[0].id);
					sumWays[8] = await BillModel.sumWays(9, uid[0].id);

					sumTypes[0] = await BillModel.sumType(1, uid[0].id);
					sumTypes[1] = await BillModel.sumType(2, uid[0].id);
					sumTypes[2] = await BillModel.sumType(3, uid[0].id);
					sumTypes[3] = await BillModel.sumType(4, uid[0].id);
					sumTypes[4] = await BillModel.sumType(5, uid[0].id);
					sumTypes[5] = await BillModel.sumType(6, uid[0].id);
					sumTypes[6] = await BillModel.sumType(7, uid[0].id);
					sumTypes[7] = await BillModel.sumType(8, uid[0].id);
				}else{
					res.render('user/signin', {
					});
				}
			}catch(error){
				console.log(error);
			}

			let sumWays_new = []; 			//消费方式比
			let sumTypes_new = [];			//消费用途比
			let sumWays_money = []; 		//消费方式钱数量
			let sumTypes_money = [];		//消费用途钱数量
			let sumMoney_new;

			_.forEach(sumMoney[0], function(value){
				sumMoney_new =  value;
			});

			//将消费方式比和每一个消费方式的钱数量放进一个数组sumWays_new
			await sumWays.map(function(value, key){	
				_.forEach(value[0], function(value){
					if(value > 0){
						sumWays_new[key] = (value/sumMoney_new).toFixed(2);
						sumWays_money[key] = value;
					}else{
						sumWays_new[key] = 0;
						sumWays_money[key] = 0;
					}
				})
			});

			//将消费用途比放进一个数组sumTypes_new
			await sumTypes.map(function(value, key){	
				_.forEach(value[0], function(value){
					if(value > 0){
						sumTypes_new[key] = (value/sumMoney_new).toFixed(2);
						sumTypes_money[key] = value;
					}else{
						sumTypes_new[key] = 0;
						sumTypes_money[key] = 0;
					}
				})
			});

			res.render('bill/statistic', {
				user: req.session.user,
				data_ways: sumWays_new,
				data_types: sumTypes_new,
				sum: sumMoney_new,
				way1: sumWays_money[0],
				way2: sumWays_money[1],
				way3: sumWays_money[2],
				way4: sumWays_money[3],
				way5: sumWays_money[4],
				way6: sumWays_money[5],
				way7: sumWays_money[6],
				way8: sumWays_money[7],
				way9: sumWays_money[8],

				type1: sumTypes_money[0],
				type2: sumTypes_money[1],
				type3: sumTypes_money[2],
				type4: sumTypes_money[3],
				type5: sumTypes_money[4],
				type6: sumTypes_money[5],
				type7: sumTypes_money[6],
				type8: sumTypes_money[7],
			});
		}
	}
}