const { validationResult } = require('express-validator');

const myValidationResult = validationResult.withDefaults({
  	formatter: error => {
	    return {
	      	key: error.param,
	      	message: error.msg
	    };
	},
});


module.exports = (req, res, next) => {
	const result = myValidationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({
			validationErrors: result.array()
		});
	}
	next();
}