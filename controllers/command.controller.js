const { HEADER } = require("../constants");
const CommandService = require("../services/command.service");

class FileConfigController {
    static async sendCommand(req, res, next) {
        try {
            const command = await CommandService.sendCommand({
                userId: req.headers[HEADER.USER_ID],
                command: req.body.command,
            })
            return res.status(200).json({
                code: 200,
                message: 'Send command successfully',
                data: command
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = FileConfigController;