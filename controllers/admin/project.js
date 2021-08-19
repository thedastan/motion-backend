const Project = require('../../models/project');



class AdminController{
	async changeProject(req, res){
		const { _id, title, description, imageUrl, link } = req.body;
		try {
			await Project.findOneAndUpdate({_id: _id}, {
				title,
				description,
				imageUrl,
				link
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async deleteProject(req, res){
		const { _id } = req.body;
		try {
			await Project.deleteOne({_id: _id});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async addNewProject(req, res){
		const { title, description, imageUrl, link } = req.body;
		try {
			await Project.create({
				title,
				description,
				imageUrl,
				link
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
}


module.exports = new AdminController();