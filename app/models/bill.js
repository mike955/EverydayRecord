'use strict';

import Knex from 'knex';
import validator from 'validator';
import md5 from 'md5';

import configs from '../configs/index';

const knex = Knex(configs.knexConfig);

export default class Bill{
	//新建账单
	static async create(req, res){
		let result;

		try{
			result = await knex('core_user_bill').insert(req);
		}catch(error){
			console.log(error);
		}

		if(result[0]){
			result = 'success';
		}
		return result;
	}

	//查找用户id
	static async findByName(req, res){
		let result;

		try{
			result = await knex('core_account')
							.select('id')
							.where('username', req);
		}catch(error){
			console.log(error);
		}
		return result;
	}

	/*static async findById(req, res){
		let result;

		try{
			result = await knex('core_account')
							.select('username')
							.where('id', req);
		} catch(error){
			console.log(error);
		}
		return result;
	}*/

	static async findAll(req, res){
		let result;

		try{
			result = await knex('core_user_bill')
						    	.select('ways', 'type', 'money', 'createdTime')
						    	.where('accountID', req);
		}catch(error){
			console.log(error);
		}

		return result;
	}

	//求money的和
	static async sumMoney(req, res){
		let result;

		try{
			result = await knex('core_user_bill')
							.sum('money')
							.where('accountID', req);
		}catch(error){
			console.log(error);
		}
		return result;
	}

	//求ways的和
	static async sumWays(way, accountID, res){
		let result;

		try{
			result = await knex('core_user_bill')
							.sum('money')
							.where('ways', way)
							.where('accountID', accountID);
		}catch(error){
			console.log(error);
		}
		return result;
	}

	//求type的和
	static async sumType(type, accountID, res){
		let result;

		try{
			result = await knex('core_user_bill')
							.sum('money')
							.where('type', type)
							.where('accountID', accountID);
		}catch(error){
			console.log(error);
		}
		return result;
	}
}