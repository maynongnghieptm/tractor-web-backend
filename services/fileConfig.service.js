const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');
const FileConfigModel = require("../models/fileConfig.model");
const { getIOInstance } = require("../configs/websocket.config");
const { getAllFileConfigs } = require("../models/repository/fileConfig.repository");
const { SORT_ORDER } = require("../constants");
const FileImageModel = require("../models/fileImage.model")
class FileConfigService {
    static async createFileConfig(payload) {
        const tractorIds = JSON.parse(payload.tractorIds).map(tractorId => {
            return new mongoose.Types.ObjectId(tractorId);
        })
        const io = getIOInstance();
        for (const tractorId of tractorIds) {
            io.emit(tractorId.toString(), {
                fileConfig: payload.fileConfig
            });
        }
        return await FileConfigModel.create({
            ...payload,
            tractorIds: tractorIds
        });
    }
   

    static async getAllFileConfigs({ limit = 25, sortBy = 'createdAt', sortOrder = SORT_ORDER.DESC, page = 1, filter }) {
        return await getAllFileConfigs({ limit, sortBy, sortOrder, page, filter, select: ['_id', 'tractorIds', 'fileConfig', 'createdAt'] });
    }
    static async deleteFileConfig({ file_id }) {
        const fileConfig = await FileConfigModel.findOne({ _id: file_id });
        if (!fileConfig) {
            throw new Error('Error: File Config is not exist')
        }
        const filename = fileConfig.fileConfig.split('/')[fileConfig.fileConfig.split('/').length - 1];
        const filepath = path.join(__dirname, '..', 'public', 'file-config', filename);
        fs.unlink(filepath, (err) => {
            if (err) {
                throw err;
            }
            console.log(`File ${filepath} has been removed`);
        })
        const deletedFileConfig = await fileConfig.deleteOne({ new: true });
        return deletedFileConfig;
    }
}

module.exports = FileConfigService;