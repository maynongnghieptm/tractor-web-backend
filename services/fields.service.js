const FieldModel = require('../models/fields.model')
class FieldServie {
    static async createField({ coordinate, strokecolor, strokewidth, fillcolor, fillopacity }) {
        console.log(coordinate)
        const fieldInstance = new FieldModel({
            coordinate: coordinate,
            strokeColor: strokecolor,
            strokeWidth: strokewidth,
            fillColor: fillcolor,
            fillOpacity: fillopacity
        });
        fieldInstance.save()
            .then((savedField) => {
                console.log('Field saved successfully:', savedField);
                return true
            })
            .catch((error) => {
                console.error('Error saving field:', error);
                return false
            });
    }
    static async getAllFields() {
        return await FieldModel.find();
    }
    static async getFieldById(id) {
        return await FieldModel.findById(id);
    }
    static async updateField({ Id, payload }) {
        const existedTractor = await FieldModel.findOne({ _id: Id });
        if (!existedTractor) {
            throw new Error('Error: Tractor is not exist')
        }

        Object.keys(payload).map((key) => {
            existedTractor[key] = payload[key];
        })

        await existedTractor.save();
        return existedTractor;
    }
    static async deleteField(Id) {
        const deletedTractor = await FieldModel.findByIdAndDelete(Id);
        return deletedTractor;
    }

}
module.exports = FieldServie