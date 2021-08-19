const Category = require('../../models/category');
const uuid = require('uuid');


class AdminController{
	async newCategory(req, res){
		const {
			title
		} = req.body;

		try {
			await Category.create({
				title,
				categoryId: uuid.v4()
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async changeCategory(req, res){
		const {
			title,
			_id
		} = req.body;
		try {
			await Category.findOneAndUpdate({_id: _id}, {
				title
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async deleteCategory(req, res){
		const { _id } = req.body;
		try {
			await Category.deleteOne({_id: _id}).exec();
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
}


module.exports = new AdminController();