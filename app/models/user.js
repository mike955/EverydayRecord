'use strict';

import Knex from 'knex';
import validator from 'validator';
import md5 from 'md5';

import configs from '../configs/index';

const knex = Knex(configs.knexConfig);

export default class User{
	static async insert(req, res){
		/********************************************
		检验数据输入
		********************************************/
		let new_data = {};

		//判断username是否存在和为空
		if(req.username !== ''){
			let check_result;
			try{
				let check_result = await  knex('core_account')
										.select('username')
										.where('username', req.username);
				if(check_result.length > 0){
					return '用户名已存在，请重新输入';
				}else{
					new_data.username = req.username;
				}
			}catch(error){
				console.log(error);
			}
			new_data.username = req.username;
		}else{
			return 'usernameIsNull';	
		}

		//判断两次密码输入输入一致和为空
		if(req.password === ''){
			return "passwordIsNull";	
		}else{
			if(req.password !== req.repassword){
				return "passwordWrong";		
			}else{
				//密码加盐
				let salt_data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 's', 'y', 'z'];
				let salt = '';
				for(let m = 0; m < 5; m++){
					salt  += salt_data[Math.floor(Math.random()*36)];
				}
				new_data.salt = salt;
				new_data.password =await md5(md5(req.password) + salt);
			}
		}

		//判断phone长度和为空
		if(req.phone.length === 11){
			let check_result;
			try{
				check_result = await knex('core_account')
									.select('phone')
									.where('phone', req.phone);

				if(check_result.length > 0){
					return 'phoneIsExist';
				}else{
					new_data.phone = req.phone;
				}								
			}catch(error){
				console.log(error);
			}
		}else{
			return 'phoneWrong';
		}

		//判断邮箱
		if(validator.isEmail(req.email)){
			let check_result;
			try{
				check_result = await knex('core_account')
									.select('email')
									.where('email', req.email);

				if(check_result.length > 0){
					return 'emailIsExist';
				}else{
					new_data.email = req.email;
				}								
			}catch(error){
				console.log(error);
			}
		}else{
			return "emailWrong";
		}

		//判断性别
		if(req.gender === '男'){
			new_data.gender = 1;
		}else{
			new_data.gender = 2;
		}

		//判断密码提示问题
		if(req.password_answer === ''){
			new_data.question = 0;
			new_data.answer = 0;
		}else{
			if(req.password_question === '我的真实姓名'){
				new_data.question = 1;
				new_data.answer = req.password_answer;
			}else if(req.password_question === '我的女朋友姓名') {
				new_data.question = 2;
				new_data.answer = req.password_answer;
			}else if(req.password_question === '我的身份证号码') {
				new_data.question = 3;
				new_data.answer = req.password_answer;
			}
		}

		//type、status
		new_data.type = 1;
		new_data.status = 0;

		let result;
		try{
			result = await knex('core_account').insert(new_data);
		}catch(error){
			console.log(error);
		}

		if(result[0]){
			result = "success";
		}
		return result;
	}

	//登陆
	static async signin(req, res){
		let data;
		let result;
		try{
			data = await knex('core_account')
						.select('username', 'password', 'salt')
						.where('username', req.username);
			
			if(data.length === 0){
				result = 'usernameIsNotExist';
			}else{
				if(data[0].password ===  md5(md5(req.password) + data[0].salt)){
					result = 'success';
				}else{
					result = 'passwordWrong';
				}
			}						
		}catch(error){
			console.log(error);
		}
		return result;
	}
}