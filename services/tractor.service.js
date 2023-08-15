const TractorModel = require("../models/tractor.model");

class TractorService {
    static async getAllTractors() {
        return await TractorModel.find();
    }
    static async createTractor(payload) {
        return await TractorModel.create(payload);
    }
}

module.exports = TractorService;