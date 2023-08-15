const { SORT_ORDER, USER_ROLE, SECRET_KEY } = require("../constants");
const { getAllUsers, getUser } = require("../models/repository/user.repository");
const UserModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { getInfoData } = require("../utils");
const { createToken } = require("../utils/auth");

class AuthService {
    static async logIn({ username, password, role }) {
        const user = await UserModel.findOne({ username, isConfirmed: true, isDeleted: false });
        if(!user) {
            throw new Error('User has not been registed');
        }
        
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword) {
            throw new Error('Password is incorrect');
        }

        const accessToken = createToken({ userId: user._id, role: user.role }, SECRET_KEY);
        return {
            ...getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address'], object: user }),
            accessToken
        }
    }
}

module.exports = AuthService;