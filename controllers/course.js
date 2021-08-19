const Course = require('../models/course');


class CourseController{
	async getCourses(req, res){
		const { category, sortBy, limit, skip } = req.body;
		const findFilter = {}
		const sortFilter = {}
		let skipCount = 0;
		let limitCount = 10;
		if(skip) skipCount = skip;
		if(limit) limitCount = limit;
		if(category) findFilter.category = category;
		if(sortBy){
		 	if(sortBy === 'desc') sortFilter._id = -1;
		 	if(sortBy === 'asc') sortFilter._id = 1;
		}else {
			sortFilter._id = -1;
		}	
		try {
			const courses = await Course.find(findFilter).sort(sortFilter).skip(skipCount).limit(limitCount).exec();
			return res.status(200).json({
				courses: courses
			});
		} catch(e) {
			return res.status(500).json();
		}
	}
	async getById(req, res){
		const { id } = req.params;
		try {
			const course = await Course.findOne({_id: id}).exec();
			if(!course){
				return res.status(404).end();
			}
			return res.json({
				course: course
			});
		} catch(e) {
			return res.status(500).end();
		}
	}
}

module.exports = new CourseController();