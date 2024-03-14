const JWT = require('jsonwebtoken');

const createToken = (payload, secretKey) => {
    try {
        const accessToken = JWT.sign(payload, secretKey, {
            expiresIn: '2 days',
        });
        return accessToken;
    } catch (err) {
        throw err;
    
    }
}

const verifyToken = (token, secretKey) => {
    try {
        const decoded = JWT.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw error;
    }
   
}

module.exports = {
    createToken,
    verifyToken,
}