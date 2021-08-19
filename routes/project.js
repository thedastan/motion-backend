const { Router } = require('express');
const router = Router();


const ProjectController = require('../controllers/project');


router.post(
	'/get-projects', 


	ProjectController.getProjects
);

router.get(
	'/get-by-id/:id', 


	ProjectController.getById
);




module.exports = router;