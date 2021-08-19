const fs = require('fs');


class ImgController{
	async uploadImg(req, res){
		if(!req.isOk){
			return res.status(400).json({
				message: 'Такой файл уже существует'
			});
		}
		try {
			if(req.file){
				return res.status(200).json({
					message: `Изображение успешно добавлено под именем ${req.file.filename}`
				});
			}
			return res.status(500).json({
				message: 'Произошла ошибка при загрузки изображение'
			});
		} catch(e) {
			return res.status(500).json({
				message: 'Произошла какая то ошибка'
			});
		}
	}
	async deleteImg(req, res){
		fs.unlink(`public/uploads/${req.body.name}`, function(err) {
		    if(err && err.code == 'ENOENT') {
		        return res.status(404).json({
		        	message: 'Такое изображение не существует'
		        });
		    } else if (err) {
		        return res.status(500).json({
		        	message: 'Произошла какая то ошибка при удалении изображение'
		        });
		    } else {
		        return res.status(200).json({
		        	message: 'Изображение успешно удалено'
		        });
		    }
		});
	}
	async checkImgExist(req, res){
		fs.stat(`public/uploads/${req.body.name}`, (err, stats) => {
			if (err && err.code == 'ENOENT') {
				return res.status(200).json({
					message: `Файл не существует`
				});
			}else{
				return res.status(200).json({
					message: 'Файл существует'
				})
			}
		});
	}
}


module.exports = new ImgController();