const TractorService = require("../services/tractor.service");

class TractorController {
    static async getAllTractors(req, res, next) {
        try {
            const tractors = await TractorService.getAllTractors();
            return res.status(200).json({
                code: 200,
                message: 'Get all tractors successfully',
                data: tractors
            });
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }

    static async createTractor(req, res, next) {
        try {
            const newTractor = await TractorService.createTractor(req.body);
            return res.status(201).json({
                code: 200,
                message: 'Create tractor successfully',
                data: newTractor
            });
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
}

module.exports = TractorController;