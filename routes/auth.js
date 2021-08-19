const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');

const AuthHandler = require('../controllers/auth.js');
const validationMiddleware = require('../middlewares/validation');



router.post(
	'/login', 

	[
		check('username', 'Поле username отсуствует').exists(),
		check('password', 'Поле password отсуствует').exists(),
	],

	validationMiddleware,

	AuthHandler.login
);


router.post(
	'/refresh', 

	AuthHandler.refresh
);





module.exports = router;