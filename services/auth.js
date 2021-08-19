const bcrypt = require('bcrypt');
const uuid = require('uuid');

const User = require('../models/user');

const tokenService = require('./token');


class AuthService {
    async refresh(refreshToken) {
        if (!refreshToken) {
            return {
                isAuth: false
            }
        }
        try{
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                return {
                    isAuth: false
                }
            }
            const user = await User.findById(userData.id);
            if(!user){
                return {
                    isAuth: false
                }
            }
            const tokens = tokenService.generateTokens({id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);
            return {
                isAuth: true,
                tokens,
            }
        }catch(e){
            return {
                isAuth: false
            }
        }
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

module.exports = new AuthService();