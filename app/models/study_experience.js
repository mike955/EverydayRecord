'use strict';

import Knex from 'knex';
import validator from 'validator';
import md5 from 'md5';

import configs from '../configs/index';

const knex = Knex(configs.knexConfig);

export default class StudyExperience{
	//新建学习心得
	static async create(req, res){
		let result;

		try{
			result = await knex('core_user_study_experience').insert(req);
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