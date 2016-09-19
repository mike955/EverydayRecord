'use strict';
import validator from 'validator';
import md5 from 'md5';

//showSignin page
exports.showSignin = function(req ,res){
	res.render('user/signin',{

	});
} ;

//showSignup page
exports.showSignup = function(req ,res){
	res.render('user/signup',{
		title: '用户注册'
	});
} 

//signup
exports.signup = function(req, res){
	let user_data = req.body;

	/********************************************
	存储数据规范化
	********************************************/
	let new_data = {};
	//判断两次密码输入输入一致
	if(user_data.password !== user_data.repassword){
		res.render('user/signup',{
			info: "两次密码输入不一样，请重新输入"
		});
	}else{
		new_data.password = user_data.password;
	}

	//判断邮箱
	if(validator.isEmail(user_data.email)){
		new_data.email = user_data.email;
	}else{
		res.render('user/signup',{
			info: "邮箱格式不对，请重新输入"
		});
	}

	//判断username
	if(user_data.username !== ''){
		new_data.username = user_data.username;
	}else{
		res.render('user/signup',{
			info: "用户名不能为空，请重新输入"
		});
	}

	//判断phone
	if(user_data.phone.length === 11){
		new_data.phone = user_data.phone;
	}else{
		res.render('user/signup',{
			info: "手机号位数不对，请重新输入"
		});
	}

	//密码加盐
	let salt_data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 's', 'y', 'z'];
	let salt = '';
	for(let m = 0; m < 5; m++){
		salt  += salt_data[Math.floor(Math.random()*36)];
	}
	new_data.salt = salt;
	new_data.password = md5(md5(user_data.password) + salt);


	//判断性别
	if(user_data.sex === '男'){
		new_data.sex = 1;
	}else{
		new_data.sex = 2;
	}

	//判断密码提示问题
	if(user_data.password_answer === ''){
		new_data.question = 0;
		new_data.answer = 0;
	}else{
		if(user_data.password_question === '我的真实姓名'){
			new_data.question = 1;
			new_data.answer = user_data.password_answer;
		}else if(user_data.password_question === '我的女朋友姓名') {
			new_data.question = 2;
			new_data.answer = user_data.password_answer;
		}else if(user_data.password_question === '我的身份证号码') {
			new_data.question = 3;
			new_data.answer = user_data.password_answer;
		}
	}

	//type、status
	new_data.type = 1;
	new_data.status = 0;
	console.log(new_data);
}