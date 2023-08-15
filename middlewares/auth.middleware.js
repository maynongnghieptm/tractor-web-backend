const { HEADER, SECRET_KEY, USER_ROLE } = require("../constants");
const { verifyToken } = require("../utils/auth");

const isAuthenticated = async (req, res, next) => {
    const userId = req.headers[HEADER.USER_ID];
    if(!userId) {
        throw new Error('Invalid request');
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if(!accessToken) {
        throw new Error('Invalid request');
    }

    try {
        const decodedUser = verifyToken(accessToken, SECRET_KEY);
        if(decodedUser.userId !== userId) {
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
        if(req.user.role === USER_ROLE.ADMIN) {
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