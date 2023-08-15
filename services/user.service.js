const { SORT_ORDER, USER_ROLE } = require("../constants");
const { getAllUsers, getUser } = require("../models/repository/user.repository");
const UserModel = require("../models/user.model");
const { getInfoData } = require("../utils");

class UserService {
    static async getAllUsers({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter = { role: USER_ROLE.USER } }) {
        return await getAllUsers({ limit, sortBy, sortOrder, page, filter, select: ['username', 'email', 'fullname', 'address'] });
    }

    static async getUser({ user_id, unSelect = ['password'] }) {
        return await getUser({ user_id, unSelect })
    }

    static async getUnconfirmedUser({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter = { role: USER_ROLE.USER, isConfirmed: false, isDeleted: false }}) {
        return await getAllUsers({ limit, sortBy, sortOrder, page, filter, select: ['username', 'email', 'fullname', 'address'] });
    }

    static async createUser(payload) {
        const existedUser = await UserModel.findOne({ $or: [ {'username': payload.username}, {'email': payload.email} ]}).lean();
        if(existedUser) {
            throw new Error('Error: Username or email has been already registed');
        }

        const newUser = await UserModel.create(payload);
        return getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address'], object: newUser });
    }

    static async confirmUser({ user_id }) {
        const existedUser = await UserModel.findOne({ _id: user_id, isConfirmed: false, isDeleted: false });
        if(!existedUser) {
            throw new Error('Error: User is not exist');
        }

        existedUser.isConfirmed = true;
        await existedUser.save();
        return getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address', 'isConfirmed'], object: existedUser })
    }
}

module.exports = UserService;