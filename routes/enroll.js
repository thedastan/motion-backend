const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const EnrollController = require('../controllers/enroll');
const http = require("request");


router.post(
	'/course-member', 

	[
		check('courseId', 'Поле courseId отсуствует').exists(),
		check('name', 'Поле name отсуствует').exists(),
		check('phone', 'Поле phone отсуствует').exists(),
	],

	EnrollController.newCourseMember
);

router.post(
	'/course-interested-user', 

	[
		check('courseId', 'Поле courseId отсуствует').exists(),
		check('name', 'Поле name отсуствует').exists(),
		check('phone', 'Поле phone отсуствует').exists(),
	],

	EnrollController.newCourseInterestedUser
);


router.post('/', async (req, res) => {
	try {
		const token = "1793401295:AAHX-iAa69_j1RG9caGIpSwkdb8H5JKtj6M";
		const id = "547616061";

		const newZapis = [
			`<b>Name: <i> ${req.body.name}</i></b>`,
			`<b>Phone: <i>${req.body.phone}</i></b>`,
			`<b>Select: <i>${req.body.select}</i></b>`,
		];
		let msg = "";
		newZapis.forEach((i) => {
			msg += i+"\n"
		})

		http.post(encodeURI(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&parse_mode=html&text=${msg}`))

	} catch (e) {
		console.error(e)
		return res.status(400).send(e)
	} console.log(req.body)

})

router.post('/reqs', async (req, res) => {
	try {
		const token = "1793401295:AAHX-iAa69_j1RG9caGIpSwkdb8H5JKtj6M";
		const id = "547616061";

		const newZapis = [
			`<b>Name: <i> ${req.body.name}</i></b>`,
			`<b>Phone: <i>${req.body.phone}</i></b>`,
			`<b>Select: <i>${req.body.select}</i></b>`,
		];
		let msg = "";
		newZapis.forEach((i) => {
			msg += i+"\n"
		})

		http.post(encodeURI(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&parse_mode=html&text=${msg}`))

	} catch (e) {
		console.error(e)
		return res.status(400).send(e)
	} console.log(req.body)

})



module.exports = router;