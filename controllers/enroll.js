const Course = require('../models/course');
const CourseMember = require('../models/course-member');
const CourseInterestedUser = require('../models/course-interested-users');



class EnrollController{
	async newCourseMember(req, res){
		const { courseId, name, phone } = req.body;
		try {
			const course = await Course.findOne({_id: courseId}).exec();
			if(!course) return res.status(400).json({
				message: "Такого курса нету"
			});
			await CourseMember.create({
				name,
				phone,
				courseId
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async newCourseInterestedUser(req, res){
		const { courseId, name, phone } = req.body;
		try {
			await CourseInterestedUser.create({
				name,
				phone,
				courseId
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
}


module.exports = new EnrollController();