const mongoose = require('mongoose');
const { Schema, model} = require('mongoose');


const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	courseId: {
		type: String,
		required: true
	}
});


module.exports = model('course-members', schema, 'course-members');