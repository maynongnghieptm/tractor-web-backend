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
            console.log(err)
            return res.json({
               
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }

    static async createFileContent(req, res, next) {
        try {
            const imageUrl = `http://tractorserver.myddns.me:8000/uploads/${req.file.filename}`;
            console.log(imageUrl)
            return res.status(201).json({
                code: 200,
                message: 'Create file config successfully',
                data: imageUrl
            })
        } catch (err) {
            console.log(err)
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
}

module.exports = FileConfigController;