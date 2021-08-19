const { Router } = require('express');
const router = Router();


const ServiceController = require('../controllers/service');


router.post(
	'/get-services', 


	ServiceController.getServices
);


router.get(
	'/get-by-id/:id', 


	ServiceController.getById
);

router.get(
	'/get-last-service', 


	ServiceController.getLastService
);




module.exports = router;