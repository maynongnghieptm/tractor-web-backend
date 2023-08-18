const { getSortBy, getSelectData } = require("../../utils");
const FileConfigModel = require("../fileConfig.model");

const getAllFileConfigs = async ({ limit, sortBy, sortOrder, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sort = getSortBy(sortBy, sortOrder);
    const fileConfigs = await FileConfigModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean();

    return fileConfigs;
}

module.exports = {
    getAllFileConfigs,
}