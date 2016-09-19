'use strict';

module.exports = {
	client: 'mysql',
	connection: {
		host: '192.168.1.101',
		user: 'root',
		password: '',
		database: 'everyday_record',
		port: 3306
	},
	pool:{
		min: 0,
		max: 10
	}
}