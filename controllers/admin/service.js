const Service = require('../../models/service');



class AdminController{
	async changeService(req, res){
		const { _id, title, description, imageUrl, price, order } = req.body;
		try {
			await Service.findOneAndUpdate({_id: _id}, {
				title,
				description,
				imageUrl,
				price,
				order
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async deleteService(req, res){
		const { _id } = req.body;
		try {
			await Service.deleteOne({_id: _id});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async addNewService(req, res){
		const { title, description, imageUrl, price, order } = req.body;
		try {
			await Service.create({
				title,
				description,
				imageUrl,
				price,
				order
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async changeServicesOrder(req, res){
		const { data } = req.body;
		try {
			for(let i = 0; i < data.length; i++){
				await Service.findOneAndUpdate({_id: data[i]._id}, {order: data[i].order});
			}
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
}


module.exports = new AdminController();