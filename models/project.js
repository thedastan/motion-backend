const mongoose = require('mongoose');
const { Schema, model} = require('mongoose');


const schema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	imageUrl: {type: String, required: true},
	link: {type: String, required: true}
});


module.exports = model('projects', schema, 'projects');