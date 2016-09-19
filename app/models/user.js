'use strict';

import knex from 'knex';

import configs from '../configs/index';

const knex = knex(configs.knexConfig);
export default class User{
	static async insert(req, res){

	}
}