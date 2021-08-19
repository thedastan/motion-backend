const Project = require('../models/project');


class ProjectController{
	async getProjects(req, res){
		const { sortBy, skip, limit } = req.body;
		let skipCount = 0;
		let limitCount = 10;
		if(skip) skipCount = skip;
		if(limit) limitCount = limit;
		const sortFilter = {}
		const findFilter = {}
		if(sortBy){
			if(sortBy === 'desc') sortFilter._id = -1;
			if(sortBy === 'asc') sortFilter._id = 1;
		}else {
			sortFilter._id = -1;
		}
		try {
			const projects = await Project.find(findFilter).sort(sortFilter).skip(skipCount).exec();
			return res.json({
				projects: projects
			});
		} catch(e) {
			return res.status(500).end();
		}
	}
	async getById(req, res){
		const { id } = req.params;
		try {
			const project = await Project.findOne({_id: id}).exec();
			if(!project){
				return res.status(404).end();
			}
			return res.json({
				project: project
			});
		} catch(e) {
			return res.status(500).end();
		}
	}
}



module.exports = new ProjectController();