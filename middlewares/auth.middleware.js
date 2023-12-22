const { HEADER, SECRET_KEY, USER_ROLE } = require("../constants");
const { verifyToken } = require("../utils/auth");

const isAuthenticated = async (req, res, next) => {
    try {
        const userId = req.headers[HEADER.USER_ID];
        console.log('userId: ', userId)
        if (!userId) {
            throw new Error('Invalid request');
        }
        const accessToken = req.headers[HEADER.AUTHORIZATION];
        //console.log('accessToken: ', accessToken);
        if (!accessToken) {
            throw new Error('Invalid request');
        }
        const decodedUser = verifyToken(accessToken.split(' ')[1], SECRET_KEY);
        console.log('decodedUser: ', decodedUser);
        if (decodedUser.userId !== userId) {
            throw new Error('Invalid user')
        }
        req.user = decodedUser;
        return next();
    } catch (err) {
        next(err);
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role === USER_ROLE.ADMIN) {
            return next();
        }
        throw new Error('Invalid request');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
}