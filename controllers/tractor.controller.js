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

    static async getTractor(req, res, next) {
        try {
            const tractor = await TractorService.getTractor({
                tractorId: req.params.tractorId,
            });
            return res.status(200).json({
                code: 200,
                message: 'Get tractor successfully',
                data: tractor
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

    static async updateTractor(req, res, next) {
        try {
            const updatedTractor = await TractorService.updateTractor({
                tractorId: req.params.tractorId,
                payload: req.body,
            });
            return res.status(201).json({
                code: 200,
                message: 'Update tractor successfully',
                data: updatedTractor
            });
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }   

    static async deleteTractor(req, res, next) {
        try {
            const deletedTractor = await TractorService.deleteTractor({
                tractorId: req.params.tractorId
            });
            return res.status(201).json({
                code: 200,
                message: 'Delete tractor successfully',
                data: deletedTractor
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