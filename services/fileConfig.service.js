const mongoose = require("mongoose");
const FileConfigModel = require("../models/fileConfig.model");
const { getIOInstance } = require("../configs/websocket.config");

class FileConfigService {
    static async createFileConfig(payload) {
        const tractorIds = JSON.parse(payload.tractorIds).map(tractorId => {
            return new mongoose.Types.ObjectId(tractorId);
        })
        const io = getIOInstance();
        io.emit('fileCreated', {
            fileConfig: payload.fileConfig
        })
        return await FileConfigModel.create({
            ...payload,
            tractorIds: tractorIds
        });
    }
}

module.exports = FileConfigService;