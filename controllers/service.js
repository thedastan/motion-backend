const Service = require('../models/service');


class ProjectController{
	async getServices(req, res){
		const { sortBy} = req.body;
		const sortFilter = {
			order: -1
		}
		try {
			const services = await Service.find().sort(sortFilter).exec();
			return res.json({
				services: services
			});
		} catch(e) {
			return res.status(500).end();
		}
	}
	async getById(req, res){
		const { id } = req.params;
		try {
			const service = await Service.findOne({_id: id}).exec();
			if(!service){
				return res.status(404).end();
			}
			return res.json({
				service: service
			});
		} catch(e) {
			console.log(e)
			return res.status(500).end();
		}
	}
	async getLastService(req, res){
		try {
			const service = await Service.findOne().sort({order: -1}).exec();
			if(!service){
				return res.json({
					service: {order: 0}
				})
			}
			return res.json({
				service: service
			});
		} catch(e) {
			console.log(e)
			return res.status(500).end();
		}
	}
}



module.exports = new ProjectController();
