'use strict'
/***** import node.js librarie *****/

/***** import third-party libraries *****/
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

/***** import own libraries *****/
import config from './app/configs/index';
import router from './app/routes/routes';

const app = express();

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

/*********路由*********/
router(app);


/*********服务器监听端口*********/
app.listen(config.portConfig, () =>{
	console.log("server start on " + config.portConfig);
});