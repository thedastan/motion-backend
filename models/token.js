const mongoose = require('mongoose');
const { Schema, model} = require('mongoose');


const schema = new Schema({
	userId: {
		type: String,
		required: true
	},
 	refreshToken: {
 		type: String,
 		required: true
 	}
});


module.exports = model('tokens', schema, 'tokens');