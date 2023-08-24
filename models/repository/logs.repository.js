const { getSortBy, getSelectData } = require("../../utils");
const LogsModel = require("../logs.model");

const getAllLogs = async ({ limit, sortBy, sortOrder, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sort = getSortBy(sortBy, sortOrder);
    const logs = await LogsModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean();

    return logs;
}

module.exports = {
    getAllLogs
}