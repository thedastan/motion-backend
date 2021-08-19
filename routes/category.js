const {Router} = require('express');
const router = Router();
const CategoryController = require('../controllers/category');

router.post('/get-categories', CategoryController.getCategory);


module.exports = router;