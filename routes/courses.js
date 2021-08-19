const { Router } = require('express');
const router = Router();

const CourseController = require('../controllers/course');


router.get('/get-by-id/:id', CourseController.getById);

router.post('/get-courses', CourseController.getCourses);




module.exports = router;