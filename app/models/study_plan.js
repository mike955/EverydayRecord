'use strict';

import Knex from 'knex';
import validator from 'validator';
import md5 from 'md5';

import configs from '../configs/index';

const knex = Knex(configs.knexConfig);

export default class StudyPlan{
	//新建大事件
	static async create(req, res){
		let result;

		try{
			result = await knex('core_user_study_plan').insert(req);
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
}