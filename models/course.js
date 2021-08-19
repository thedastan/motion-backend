const mongoose = require('mongoose');
const { Schema, model} = require('mongoose');


const schema = new Schema({
	courseName: {
		type: String,
		required: true
	},
	coursePrice: {
 		type: String,
 		required: true
 	},
 	courseDiscount: {
 		type: String,
 		required: true
 	},
 	category: {
 		type: String,
 		required: true
 	},
 	imageUrl: {
 		type: String,
 		required: true
 	},
 	schedule: {
 		type: String,
 		required: true
 	},
 	courseTime: {
 		type: String,
 		required: true
 	},
 	tools: {type:String, required:true},

	courseDesc:{
		type:String, required: true
	},

});

// schedule == 'график'


module.exports = model('courses', schema, 'courses');