const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const tokenService = require('../services/token');
const authService = require('../services/auth');



class AuthController{
	async refresh(req, res){
        const { token } = req.cookies;
		const info = await authService.refresh(token);
        if(info.isAuth){
            res.cookie('token', info.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true});
            return res.status(200).json({
                accessToken: info.tokens.accessToken
            });
        }
        return res.status(401).json({
            message: 'Вы не авторизованы'
        });
	}
    async login(req, res){
        const {username, password} = req.body;
        try {
            const candidate = await User.findOne({username: username}).exec();
            if(!candidate){
                return res.status(400).json({
                    message: 'Такого пользователя не существует или вы ввели неправильно'
                });
            }
            const match = await bcrypt.compare(password, candidate.password);
            if(!match){
                return res.status(400).json({
                    message: 'Неправильный пароль'
                });
            }
            const tokens = tokenService.generateTokens({id: candidate._id});
            const saveToken = await tokenService.saveToken(candidate._id, tokens.refreshToken);
            res.cookie('token', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true});
            return res.status(200).json({
                accessToken: tokens.accessToken,
                message: 'Вы успешно вошли в аккаунт'
            });
        }catch(e){
            return res.status(500).json({
                message: 'Произошла ошибка на стороне сервера'
            });
        }
    }
}


module.exports = new AuthController();
