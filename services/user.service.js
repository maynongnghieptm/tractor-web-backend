const { SORT_ORDER, USER_ROLE } = require("../constants");
const { getAllUsers, getUser } = require("../models/repository/user.repository");
const UserModel = require("../models/user.model");
const { BadRequestError, NotFoundError } = require("../response/error.response");
const { getInfoData } = require("../utils");
const TractorService = require("./tractor.service");

class UserService {
    static async getAllUsers({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter = { role: USER_ROLE.USER, isDeleted: false } }) {
        return await getAllUsers({ limit, sortBy, sortOrder, page, filter, select: ['username', 'email', 'fullname', 'address', 'isConfirmed'] });
    }

    static async getUser({ user_id, unSelect = ['password'] }) {
        return await getUser({ user_id, unSelect })
    }

    static async getUnconfirmedUser({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter = { role: USER_ROLE.USER, isConfirmed: false, isDeleted: false }}) {
        return await getAllUsers({ limit, sortBy, sortOrder, page, filter, select: ['username', 'email', 'fullname', 'address', 'isConfirmed'] });
    }

    static async getDeletedUsers({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter = { role: USER_ROLE.USER, isDeleted: true } }) {
        return await getAllUsers({ limit, sortBy, sortOrder, page, filter, select: ['username', 'email', 'fullname', 'address', 'isConfirmed', 'isDeleted']});
    }

    static async createUser(payload) {
        const existedUser = await UserModel.findOne({ $or: [ {'username': payload.username}, {'email': payload.email} ]}).lean();
        if(existedUser) {
            throw new BadRequestError('Error: Username or email has been already registed');
        }

        const newUser = await UserModel.create(payload);
        return getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address'], object: newUser });
    }

    static async confirmUser({ user_id }) {
        const existedUser = await UserModel.findOne({ _id: user_id, isConfirmed: false, isDeleted: false });
        if(!existedUser) {
            throw new NotFoundError('Error: User is not exist');
        }

        existedUser.isConfirmed = true;
        await existedUser.save();
        return getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address', 'isConfirmed'], object: existedUser });
    }

    static async restoreUser({ user_id }) {
        const existedUser = await UserModel.findOne({ _id: user_id, isDeleted: true });
        if(!existedUser) {
            throw new NotFoundError('Error: User is not exist');
        }

        existedUser.isDeleted = false;
        await existedUser.save();
        return getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address', 'isConfirmed'], object: existedUser });
    }

    static async unconfirmUser({ user_id }) {
        const existedUser = await UserModel.findOne({ _id: user_id, isConfirmed: true, isDeleted: false });
        if(!existedUser) {
            throw new NotFoundError('Error: User is not exist');
        }

        existedUser.isConfirmed = false;
        await existedUser.save();
        return getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address', 'isConfirmed'], object: existedUser })
    }

    static async deleteUser({ user_id }) {
        const existedUser = await UserModel.findOne({ _id: user_id, isDeleted: false });
        if(!existedUser) {
            throw new NotFoundError('Error: User is not exist');
        }

        existedUser.isDeleted = true;
        await existedUser.save();
        return existedUser;
    }

    static async updateUser({ user_id, payload }) {
        const existedUser = await UserModel.findOne({ _id: user_id, isDeleted: false });
        if(!existedUser) {
            throw new NotFoundError('Error: User is not exist');
        }

        Object.keys(payload).map((key) => {
            existedUser[key] = payload[key];
        })

        await existedUser.save();
        return existedUser;
    }

    static async findUserByUsername(username) {
        const user = await UserModel.findOne({ username: username, isConfirmed: true   });
        return user;
    }

    static async asignTractorsToUser({ userId, tractorList }) {
        const existedUser = await UserModel.findOne({ _id: userId, isDeleted: false, role: USER_ROLE.USER });
        if(!existedUser) {
            throw new NotFoundError('Error: User is not exist');
        }

        existedUser.tractorList = tractorList;
        await existedUser.save();
        
        for(const tractorId of tractorList) {
            await TractorService.assignUserToTractor({ userId, tractorId });
        }

        return existedUser;
    }
}

module.exports = UserService;