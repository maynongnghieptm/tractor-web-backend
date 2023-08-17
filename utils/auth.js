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
    console.log(token);
    const decoded = JWT.verify(token.split(' ')[1], secretKey);
    return decoded;
}

module.exports = {
    createToken,
    verifyToken,
}