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
            next(err);
        }
    }

    static async getAllFileConfigs(req, res, next) {
        try {
            const fileConfigs = await FileConfigService.getAllFileConfigs(req.query)
            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                data: fileConfigs
            })
        } catch (err) {
            next(err);
        }
    }

    static async deleteFileConfig(req, res, next) {
        try {
            const fileConfigs = await FileConfigService.deleteFileConfig({
                file_id: req.params.file_id,
            })

            return res.status(200).json({
                code: 200,
                message: 'Delete file config successfully',
                data: fileConfigs
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = FileConfigController;