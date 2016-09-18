'use strict'
/***** import node.js librarie *****/

/***** import third-party libraries *****/
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';

/***** import own libraries *****/
import config from './app/configs/index';
import router from './app/routes/routes';

const app = express();

/*********express设置*********/
ejs.open = '{{';
ejs.close = '}}';

app
	.set('views', path.join(__dirname, 'app/views'))
	.engine('.html', ejs.__express)
	.set('view engine', 'html')	

/*********路由*********/
router(app);


/*********服务器监听端口*********/
app.listen(config.portConfig, () =>{
	console.log("server start on " + config.portConfig);
});