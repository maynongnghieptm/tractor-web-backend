const LogsService = require("../services/logs.service");

class LogsController {
    static async getAllLogs(req, res, next) {
        try {
            const logs = await LogsService.getAllLogs(req.query)
            return res.status(201).json({
                code: 200,
                message: 'Get all logs successfully',
                data: logs
            })
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }

    static async getAllLogsByMissionId(req, res, next) {
        try {
            const logs = await LogsService.getAllLogsByMissionId({ missionId: req.params.missionId, query: req.query });
            return res.status(201).json({
                code: 200,
                message: 'Get all logs by missionId successfully',
                data: logs
            })
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
}

module.exports = LogsController;