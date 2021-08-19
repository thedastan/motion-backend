const mongoose = require('mongoose');
const { Schema, model} = require('mongoose');


const schema = new Schema({
	username: {
		type: String,
		required: true
	},
 	password: {
 		type: String,
 		required: true
 	}
});


module.exports = model('users', schema, 'users');