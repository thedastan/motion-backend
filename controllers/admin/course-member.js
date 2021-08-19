const CourseMember = require('../../models/course-member');


class AdminController{
	async deleteUser(req, res){
		const { _id } = req.body;
		try {
			await CourseMember.findOneAndDelete({_id: _id}).exec();
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async getUsers(req, res){
		const { courseId, skip, count } = req.body;
		const filter = {
			skip: 0,
			count: 12,
			filter: {}
		}
		if(skip) filter.skip = skip;
		if(courseId) filter.filter.courseId = courseId;
		if(count) filter.count = count;
		try {
			const members = await CourseMember.find(filter.filter).skip(filter.skip).limit(filter.limit).exec();
			return res.json({
				members: members
			});
		} catch(e) {
			return res.status(500).end();
		}
	}
}

module.exports = new AdminController();