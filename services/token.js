const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token.js');
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;



class TokenService {
    generateTokens(payload) {
        const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN, {expiresIn: '45d'});
        const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN, {expiresIn: '15m'});
        return {
            refreshToken,
            accessToken
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }
    
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({userId: userId});
        if (tokenData) {
            const changeToken = await tokenModel.updateOne({userId: userId}, {$set: {refreshToken: refreshToken}});
            return changeToken;
        }
        const token = new tokenModel({userId: userId, refreshToken: refreshToken});
        const saveToken = await token.save();
        return saveToken;
    }

    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({refreshToken: refreshToken});
        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = await tokenModel.findOne({refreshToken: refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();