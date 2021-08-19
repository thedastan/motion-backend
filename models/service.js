const { Schema, model} = require('mongoose');


const schema = new Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	imageUrl: {type: String, required: true},
	price: {type: String, required: true},
	order: {type: Number, required: true}
})


module.exports = model('services', schema, 'services');