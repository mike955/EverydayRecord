'use strict';

import UserModel from '../models/user';


export default class User{

	//showSignin page
	static showSignin(req, res){
		res.render('user/signin',{
		});
	}

	//showSignup page
	static showSignup(req ,res){
		res.render('user/signup',{
			title: '用户注册'
		});
	} 

	//signup
	static async signup(req, res){
		let user_data = req.body;

		//存储数据到数据库
		let result =await UserModel.insert(user_data);
		
		//用户名为空
		if(result === 'usernameIsNull'){
			res.render('user/signup',{
				info: "用户名不能为空，请重新输入"
			});
		}

		//用户名存在
		if(result === 'usernameIsExist'){
			res.render('user/signup',{
				info: "用户名已存在，请重新输入"
			});
		}

		//密码输入不能为空
		if(result === 'passwordIsNull'){
			res.render('user/signup',{
				info: "密码输入不能为空，请重新输入"
			});
		}

		//两次密码输入不一样
		if(result === 'passwordWrong'){
			res.render('user/signup',{
				info: "两次密码输入不一样，请重新输入"
			});
		}

		//电话号码格式不对
		if(result === 'phoneWrong'){
			res.render('user/signup',{
				info: "电话号码长度不对，请重新输入"
			});
		}

		//电话号码已被注册
		if(result === 'phoneIsExist'){
			res.render('user/signup',{
				info: "该手机号已被注册，请更换手机号重新输入"
			});
		}

		//邮箱格式不正确
		if(result === 'emailWrong'){
			res.render('user/signup',{
				info: "邮箱格式不对，请重新输入"
			});
		}

		//邮箱已存在
		if(result === 'emailIsExist'){
			res.render('user/signup',{
				info: "该邮箱已被注册，请更换邮箱重新输入"
			});
		}
		
		//插入数据成功
		if(result === 'success'){
			res.render('user/signin',{
				title: '登录'
			})
		}
	}

	//signin
	static async signin(req, res) {
		let user_data = req.body;
		//判断用户名和密码
		let result =await UserModel.signin(user_data);

		//用户名不存在
		if(result === 'usernameIsNotExist'){
			res.render('user/signin',{
				title: '登录',
				info: '用户名不存在'
			})
		}

		//密码不对
		if(result === 'passwordWrong'){
			res.render('user/signin',{
				title: '登录',
				info: '密码错误'
			})
		}

		//登陆成功
		if(result === 'success'){
			req.session.user = user_data;
			res.redirect('/main');
		}
	}

	//main
	static async main(req, res){
		res.render('user/index', {
			title: 'main',
			user: req.session.user
		});
	}

	//logout
	static async logout(req, res){
		delete req.session.user;
		res.redirect('/');
	}
}