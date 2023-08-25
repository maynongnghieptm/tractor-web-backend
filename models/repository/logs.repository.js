const { getSortBy, getSelectData } = require("../../utils");
const LogsModel = require("../logs.model");

const QUERY_STRING = {
    START_TIME: 'start_time',
    END_TIME: 'end_time',
    PERCENT: 'percent',
    PERCENT_END: 'percent_end',
    LINE_INDEX: 'line_index',
    LINE_COUNT: 'line_count',
}

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

const getAllLogsByMissionId = async ({ missionId, query }) => {
    const { start_time, end_time, percent, line_index, line_count } = query;
    console.log(line_index)
    console.log(line_count)
    console.log(line_index && line_count)
    let logs = await LogsModel.find({ missionId: missionId });

    if(start_time && end_time) {
        logs = logs.filter(logs => {
            if(new Date(logs.createdAt).getTime() >= new Date(start_time).getTime() 
                    && new Date(logs.createdAt).getTime() <= new Date(end_time).getTime()) {
                return true;
            }
            return false;
        })
    } else if(percent) {
        const logsLength = logs.length;
        const percentIndex = parseInt(logsLength * percent);
        logs = logs.slice(0, percentIndex);
    } else if(line_index && line_count) {
        logs = logs.slice(parseInt(line_index), parseInt(line_index) + parseInt(line_count));
    } else {
        throw new Error("Please fill all input");
    }

    return logs;
}

module.exports = {
    getAllLogs,
    getAllLogsByMissionId,
}