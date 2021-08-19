const mongoose = require('mongoose');
const { Schema, model} = require('mongoose');


const schema = new Schema({
	title: {
		type: String,
		required: true
	},
	categoryId: {
		type: String,
		required: true
	}
});


module.exports = model('categories', schema, 'categories');