'use strict';

const  env = [process.env.NODE_ENV || 'development'];

module.exports = {
	portConfig : require('./development/port').port,
	knexConfig: require('./development/knex')
}