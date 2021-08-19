const Category = require('../models/category');


class CategoryController{
    async getCategory(req, res){
        try{
            const categories = await Category.find().exec();
            const data = [{title: 'Баардык курстар', categoryId: 'all'}, ...categories]
            return res.status(200).json({
                categories: data
            })
        }catch (e) {
            return res.status(500).end();
        }
    }
}

module.exports = new CategoryController();