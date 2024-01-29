const FieldServie = require('../services/fields.service')
class FieldController {
    static async createField(req, res, next) {
        //console.log(req.body.coordinate)
        const coordinate = req.body.coordinate
        const strokecolor = req.body.strokeColor
        const strokewidth = req.body.strokeWidth
        const fillcolor = req.body.fillColor
        const fillopacity = req.body.fillOpacity
        //const name = req.body.name
        try {
            const create = await FieldServie.createField({ coordinate, strokecolor, strokewidth, fillcolor, fillopacity })
            console.log(create)
            return res.status(200).json({
                code: 200,
                message: 'Create field successfully',
                data: create.data,
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }

    static async getAllFields(req, res, next) {
        //console.log(req.body.coordinate)
        try {
            const getAllField = await FieldServie.getAllFields()

            return res.status(200).json({
                code: 200,
                message: 'Get Fields successfully',
                data: getAllField
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }

    static async getFieldById(req, res, next) {
        //console.log(req.body.coordinate)
        const id = req.query.id
        try {
            const getField = await FieldServie.getFieldById(id)

            return res.status(200).json({
                code: 200,
                message: 'Get Field successfully',
                data: getField
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }

    static async updateField(req, res, next) {
        const id = req.query.id
        try {
            const update = await FieldServie.updateField({ Id: id, payload: req.body })
            return res.status(200).json({
                code: 200,
                message: 'Update Field successfully',
                data: update
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }

    static async deleteField(req, res, next) {
        const id = req.query.id
        try {
            const deleteField = await FieldServie.deleteField(id)
            return res.status(200).json({
                code: 200,
                message: 'Update Field successfully',
                data: deleteField
            });
        } catch (error) {
            return res.json({
                code: error.statusCode || 500,
                message: error.message || 'Internal Server Error',
            });
        }
    }
}
module.exports = FieldController