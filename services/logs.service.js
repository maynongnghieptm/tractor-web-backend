const { SORT_ORDER } = require("../constants");
const { getAllLogs } = require("../models/repository/logs.repository");

class LogsService {
    static async getAllLogs({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter }) {
        return await getAllLogs({ limit, sortBy, sortOrder, page, filter, select: ['_id', 'missionId', 'tractorId', 'log'] });
    }
}

module.exports = LogsService;