const Course = require('../../models/course');


class AdminController{
	async newCourse(req, res){
		const {
			courseName,
			coursePrice,
			courseDiscount,
			category,
			imageUrl,
			schedule,
			courseTime,
			tools,
			courseDesc
		} = req.body;

		try {
			await Course.create({
				courseName,
				coursePrice,
				courseDiscount,
				category,
				imageUrl,
				schedule,
				courseTime,
				tools,
				courseDesc
			});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async changeCourse(req, res){
		const {
			_id,
			courseName,
			coursePrice,
			courseDiscount,
			category,
			imageUrl,
			schedule,
			courseTime,
			tools,
			courseDesc
		} = req.body;
		try {
			const result = await Course.findOneAndUpdate({_id: _id}, {
				courseName,
				courseDiscount,
				coursePrice,
				category,
				imageUrl,
				schedule,
				courseTime,
				tools,
				courseDesc
			}, {new: true});
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
	async deleteCourse(req, res){
		const { _id } = req.body;
		try {
			await Course.deleteOne({_id: _id}).exec();
			return res.status(200).end();
		} catch(e) {
			return res.status(500).end();
		}
	}
}


module.exports = new AdminController();