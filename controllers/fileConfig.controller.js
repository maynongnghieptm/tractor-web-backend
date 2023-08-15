const FileConfigService = require("../services/fileConfig.service");

class FileConfigController {
    static async createFileConfig(req, res, next) {
        try {
            const fileConfig = `http://localhost:8000/file-config/${req.file.filename}`;
            const payload = {
                ...req.body,
                fileConfig,
            }
            const newFileConfig = await FileConfigService.createFileConfig(payload);
            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                data: newFileConfig
            })
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
}

module.exports = FileConfigController;