const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const multer  = require('multer')
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  	destination: function (req, file, cb) {
   	 	cb(null, path.resolve(__dirname, '../public/uploads/'));
  	},
  	filename: function (req, file, cb) {
  		const fileFormat = file.mimetype.split('/');
        cb(null, file.originalname);
  	},
});

const fileFilter = (req, file, cb) => {
	fs.stat(`public/uploads/${file.originalname}`, (err, stats) => {
		if (err && err.code == 'ENOENT') {
			req.isOk = true;
			cb(null, true);
		}else{
			req.isOk = false;
			cb(null, false);
		}
	});
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const validationMiddleware = require('../middlewares/validation');
const authMiddleware = require('../middlewares/auth');
const checkFileExistMiddleware = require('../middlewares/check-file');

const CourseController = require('../controllers/admin/course');
const CategoryController = require('../controllers/admin/category');
const CourseInterestedUserController = require('../controllers/admin/course-interested-users');
const CourseMemberController = require('../controllers/admin/course-member');
const ProjectController = require('../controllers/admin/project');
const ServiceController = require('../controllers/admin/service');
const ImgController = require('../controllers/admin/upload-img');


router.post(
	'/new-course', 
	authMiddleware,
	[
		check('courseName', 'Имя должно быть не меньше 10 и не больше 40').exists(),
		check('coursePrice', 'Отсуствует поле CoursePrice').exists(),
		check('courseDiscount', 'Отсуствует поле courseDiscount').exists(),
		check('category', 'Отсуствует поле category').exists(),
		check('imageUrl', 'Отсуствует поле imageUrl').exists(),
		check('schedule', 'Отсуствует поле schedule').exists(),
		check('courseTime', 'Отсуствует поле courseTime').exists(),
		check('tools', 'Отсуствует поле tools').exists(),
		check('courseDesc', 'Отсуствует поле courseDesc').exists(),
	],
	validationMiddleware,
	checkFileExistMiddleware('imageUrl'),
	CourseController.newCourse
);
router.post(
	'/change-course',
	authMiddleware,
	[
		check('_id', 'Поле id отсуствует').exists(),
		check('courseName', 'Имя должно быть не меньше 10 и не больше 40').exists(),
		check('coursePrice', 'Отсуствует поле CoursePrice').exists(),
		check('courseDiscount', 'Отсуствует поле courseDiscount').exists(),
		check('category', 'Отсуствует поле category').exists(),
		check('imageUrl', 'Отсуствует поле imageUrl').exists(),
		check('schedule', 'Отсуствует поле schedule').exists(),
		check('courseTime', 'Отсуствует поле courseTime').exists(),
		check('tools', 'Отсуствует поле tools').exists(),
		check('courseDesc', 'Отсуствует поле courseDesc').exists(),
	],
	validationMiddleware,
	checkFileExistMiddleware('imageUrl'),
 	CourseController.changeCourse
);
router.post(
	'/delete-course', 
	authMiddleware,
	[
		check('_id', 'Поле id отсуствует').exists(),
	],
	validationMiddleware,
	CourseController.deleteCourse
);


router.post(
	'/new-category', 
	authMiddleware,
	[
		check('title', 'Поле title отсуствует').exists(),
	],
	validationMiddleware,
	CategoryController.newCategory
);
router.post(
	'/change-category', 
	authMiddleware,
	[
		check('title', 'Поле title отсуствует').exists(),
		check('_id', 'Поле _id отсуствует').exists(),
	],
	validationMiddleware,
	CategoryController.changeCategory
);
router.post(
	'/delete-category', 
	authMiddleware,
	[
		check('_id', 'Поле id отсуствует').exists(),
	],
	validationMiddleware,
	CategoryController.deleteCategory
);



router.post(
	'/get-course-int-user',
	authMiddleware,
	CourseInterestedUserController.getUsers
);
router.post(
	'/delete-course-int-user',
	authMiddleware,
	[
		check('_id', 'Поле _id отсуствует').exists(),
	],
	validationMiddleware,
	CourseInterestedUserController.deleteUser
);


router.post(
	'/delete-course-member',
	authMiddleware,
	[
		check('_id', 'Поле id отсуствует').exists(),
	],
	validationMiddleware,
	CourseMemberController.deleteUser
);
router.post(
	'/get-course-members',
	authMiddleware,
	CourseMemberController.getUsers
);


router.post(
	'/new-project',
	authMiddleware,
	[
		check('title', 'Поле title отсуствует').exists(),
		check('description', 'Поле description отсуствует').exists(),
		check('imageUrl', 'Поле imageUrl отсуствует').exists(),
		check('link', 'Поле link отсуствует').exists(),
	],
	validationMiddleware,
	checkFileExistMiddleware('imageUrl'),
	ProjectController.addNewProject
);
router.post(
	'/change-project',
	authMiddleware,
	[
		check('_id', 'Поле _id отсуствует').exists(),
		check('title', 'Поле title отсуствует').exists(),
		check('description', 'Поле description отсуствует').exists(),
		check('imageUrl', 'Поле imageUrl отсуствует').exists(),
		check('link', 'Поле link отсуствует').exists(),
	],
	validationMiddleware,
	checkFileExistMiddleware('imageUrl'),
	ProjectController.changeProject
);
router.post(
	'/delete-project',
	authMiddleware,
	[
		check('_id', 'Поле _id отсуствует').exists(),
	],
	validationMiddleware,
	ProjectController.deleteProject
);


router.post(
	'/delete-service',
	authMiddleware,
	[
		check('_id', 'Поле _id отсуствует').exists(),
	],
	validationMiddleware,
	ServiceController.deleteService
);
router.post(
	'/new-service',
	authMiddleware,
	[
		check('title', 'Поле title отсуствует').exists(),
		check('description', 'Поле description отсуствует').exists(),
		check('imageUrl', 'Поле imageUrl отсуствует').exists(),
		check('price', 'Поле price отсуствует').exists(),
	],
	validationMiddleware,
	checkFileExistMiddleware('imageUrl'),
	ServiceController.addNewService
);
router.post(
	'/change-service',
	authMiddleware,
	[
		check('_id', 'Поле _id отсуствует').exists(),
		check('title', 'Поле title отсуствует').exists(),
		check('description', 'Поле description отсуствует').exists(),
		check('imageUrl', 'Поле imageUrl отсуствует').exists(),
		check('price', 'Поле price отсуствует').exists(),
	],
	validationMiddleware,
	checkFileExistMiddleware('imageUrl'),
	ServiceController.changeService
);

router.post(
	'/change-services-order',
	authMiddleware,
	ServiceController.changeServicesOrder
);

router.post(
	'/upload-img', 
	authMiddleware,

	upload.single('name'), 

	ImgController.uploadImg
);

router.post(
	'/delete-img',
	authMiddleware,
	[
		check('name', 'Поле name отсуствует').exists(),
	],
	validationMiddleware,
	ImgController.deleteImg
)

router.post(
	'/check-img',
	authMiddleware,
	[
		check('name', 'Поле name отсуствует').exists(),
	],
	validationMiddleware,
	ImgController.checkImgExist
)


module.exports = router;