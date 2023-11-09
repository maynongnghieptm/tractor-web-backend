const { USER_ROLE } = require("../constants");
const TractorModel = require("../models/tractor.model");
const { BadRequestError, NotFoundError } = require("../response/error.response");

class TractorService {
    static async getAllTractors() {
        return await TractorModel.find();
    }
    static async getTractor({ tractorId }) {
        return await TractorModel.findById(tractorId);
    }

    static async createTractor(payload) {
        return await TractorModel.create(payload);
    }

    static async updateTractor({ tractorId, payload }) {
        const existedTractor = await TractorModel.findOne({ _id: tractorId });
        if(!existedTractor) {
            throw new BadRequestError('Error: Tractor is not exist')
        }

        Object.keys(payload).map((key) => {
            existedTractor[key] = payload[key];
        })

        await existedTractor.save();
        return existedTractor;
    }

    static async deleteTractor({ tractorId }) {
        const deletedTractor = await TractorModel.findByIdAndDelete(tractorId);
        return deletedTractor;
    }

    static async assignUserToTractor({ userId, tractorId }) {
        const tractor = await TractorModel.findById(tractorId);
        if(!tractor) {
            throw new NotFoundError('Tractor not found');
        }

        if(!tractor.userList || tractor.userList === null || tractor.userList === undefined) {
            tractor.userList = [];
        }

        const existedUserId = tractor.userList.indexOf(userId);

        if(existedUserId === -1) {
            tractor.userList.push(userId);
            await tractor.save();
        }
        
        return tractor;
    }

    static async removeUserFromTractor({ userId, tractorId }) {
        const tractor = await TractorModel.findById(tractorId);
        if(!tractor) {
            throw new NotFoundError('Tractor not found');
        }
        
        const splicedIndex = tractor.userList.indexOf(userId);
        if(splicedIndex === -1) {
            throw new NotFoundError('User not found');
        }

        tractor.userList.splice(splicedIndex, 1);
        await tractor.save();
        return tractor;
    }
}

module.exports = TractorService;