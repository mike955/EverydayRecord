'use strict'
/***** import node.js librarie *****/

/***** import third-party libraries *****/
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bunyan from 'bunyan';
import fs from 'fs-extra';
import moment from 'moment';

/***** import own libraries *****/
import config from './app/configs/index';
import router from './app/routes/routes';

const app = express();
const RedisStore = connectRedis(session);

/*********判断日志文件是否存在，每天新建一个日志文件，名字为当天时间*********/
let data = new moment(Date.now()).format('YYYY-MM-DD');
let file = 'logger/' + data.toString() + '.log';
fs.ensureFile(file, function(err){
	if(err) console.log(err);
});
console.log(file);

/*********日志配置*********/
const log = bunyan.createLogger({
						name: 'hostlocal',
						streams: [{
							path: file
						}]
					});
//TODO 打印的日志时间没有格式化，日志文件大小还不知道如何确定

//打印第一天日志
log.info('login : ' + data.toString());

/*********express设置*********/
app.set('views', path.join(__dirname, 'app/views/pages'))
	.set('view engine', 'pug')
/*	.engine('.html', ejs.__express)
	.set('view engine', 'html')	*/

/*********静态文件*********/
app
	.use(express.static(path.join(__dirname, 'app/public')))
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())
	.use(session({
		resave: false,
		saveUninitialized: true,
		secret: 'everyday_record',
		store: new RedisStore(config.redisConfig)
	}))

/*********路由*********/
router(app);

/*********服务器监听端口*********/
app.listen(config.portConfig, () =>{
	console.log("server start on " + config.portConfig);
});