const CourseInterestedUser = require('../../models/course-interested-users');


class AdminController{
	async deleteUser(req, res){
		const { _id } = req.body;
		try {
			await CourseInterestedUser.findOneAndDelete({_id: _id}).exec();
			return res.status(200).end();
		} catch(e) {
			console.log(e);
			return res.status(500).end();
		}
	}
	async getUsers(req, res){
		const { count, skip } = req.body;
		const filter = {
			count: 12,
			skip: 0
		}
		if(count) findFilter.count = count;
		if(skip) findFilter.skip = skip;
		try {
			const users = await CourseInterestedUser.find().skip(filter.skip).limit(filter.count).exec();
			return res.json({
				users: users
			});
		} catch(e) {
			return res.status(500).end();
		}
	}
}

module.exports = new AdminController();