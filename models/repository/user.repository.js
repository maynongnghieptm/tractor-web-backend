const { getSortBy, getSelectData, getUnselectData } = require('../../utils');
const UserModel = require('../user.model');

const queryUser = async ({ query, limit, skip }) => {
    const results = await UserModel.find(query)
        .select('-password -secretKey')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    return results;
}

const getAllUsers = async ({ limit, sortBy, sortOrder, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sort = getSortBy(sortBy, sortOrder);
    const users = await UserModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean();
    return users;
}

const getUser = async ({ user_id, unSelect }) => {
    return await UserModel.findById(user_id).select(getUnselectData(unSelect));
}

module.exports = {
    queryUser,
    getAllUsers,
    getUser,
}