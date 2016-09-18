'use strict';

module.exports = {
	client: 'mysql',
	connection: {
		host: '192.168.1.101',
		user: 'root',
		password: '',
		database: 'expressDemo_test',
		port: 3306
	},
	pool:{
		min: 0,
		max: 10
	}
}