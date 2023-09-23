const { USER_ROLE } = require("../constants");
const { BadRequestError } = require("../response/error.response");
const UserService = require("../services/user.service");

class UserController {
    static async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers(req.query);
            return res.status(200).json({
                code: 200,
                message: 'Get all users successfully',
                data: users,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getUnconfirmedUsers(req, res, next) {
        try {
            const unconfirmedUsers = await UserService.getUnconfirmedUser(req.query);
            return res.status(200).json({
                code: 200,
                message: 'Get all users successfully',
                data: unconfirmedUsers,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getDeletedUsers(req, res, next) {
        try {
            const deletedUsers = await UserService.getDeletedUsers(req.query);
            return res.status(200).json({
                code: 200,
                message: 'Get all users successfully',
                data: deletedUsers,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getUser(req, res, next) {
        try {
            if(req.user.role === USER_ROLE.USER && req.params.user_id !== req.user.userId) {
                throw new BadRequestError('Bad request when access user information');
            }
            const user = await UserService.getUser({
                user_id: req.params.user_id,
            });
            return res.status(200).json({
                code: 200,
                message: 'Get user successfully',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    static async createUser(req, res, next) {
        try {
            const newUser = await UserService.createUser(req.body);
            return res.status(201).json({
                code: 201,
                message: 'Create new user successfully',
                data: newUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async confirmUser(req, res, next) {
        try {
            const confirmedUser = await UserService.confirmUser({
                user_id: req.params.user_id,
            });
            return res.status(201).json({
                code: 201,
                message: 'Confirm user successfully',
                data: confirmedUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async restoreUser(req, res, next) {
        try {
            const restoredUser = await UserService.restoreUser({
                user_id: req.params.user_id,
            });
            return res.status(201).json({
                code: 201,
                message: 'Restore user successfully',
                data: restoredUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async unconfirmedUser(req, res, next) {
        try {
            const unconfirmedUser = await UserService.unconfirmUser({
                user_id: req.params.user_id,
            });
            return res.status(201).json({
                code: 201,
                message: 'Unconfirm user successfully',
                data: unconfirmedUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const deletedUser = await UserService.deleteUser({ user_id: req.params.user_id });
            return res.status(201).json({
                code: 201,
                message: 'Delete user successfully',
                data: deletedUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const updatedUser = await UserService.updateUser({
                user_id: req.params.user_id,
                payload: req.body,
            });
            return res.status(201).json({
                code: 201,
                message: 'Update user successfully',
                data: updatedUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async asignTractorsToUser(req, res, next) {
        try {
            const updatedUser = await UserService.asignTractorsToUser({
                userId: req.body.userId,
                tractorList: req.body.tractorList,
            });
            return res.status(201).json({
                code: 201,
                message: 'Assign tractors to user successfully',
                data: updatedUser
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;