'use strict';

import Index from '../controllers/user/login';

module.exports = function(app) {
	app.use('/', Index);

	app.use('/*', function(req, res, next){
		return res.send('Hello , please check your URL and make is sure true');
	})
}