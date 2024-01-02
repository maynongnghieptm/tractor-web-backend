const { USER_ROLE } = require("../constants");
const UserService = require("../services/user.service");
const About_us = require("../models/content.model")
class UserController {
    static async editPage(req, res, next) {
        try {
            const data = new About_us({
                url: req.body.url,
                content: req.body.content,
                designJSON: req.body.designJSON
            });
            console.log(data);
            data.save();
            return res.status(200).json({
                code: 200,
                message: 'Store content successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
            });
        }
    }

    static async updateContent(req, res, next) {
        try {
            const result = await UserService.updateContent(req.query.id, req.body)
            console.log(res)
            return res.status(200).json({
                code: 200,
                message: result,
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
            });
        }
    }

    static async deleteContent(req, res, next) {
        try {
            console.log(req.body.id);
            const result = await UserService.deleteContent(req.params.id)
            return res.status(200).json({
                code: 200,
                message: result,
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
            });
        }
    }

    static async storeDesignJSON(req, res, next) {
        try {
            console.log(req.body.content);
            const data = new About_us({
                designJSON: req.body.content,
            });
            data.save();
            return res.status(200).json({
                code: 200,
                message: 'Store content successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
            });
        }
    }

    static async geteditPage(req, res, next) {
        try {
            console.log(req.query.url);
            let url = req.query.url || '';
            if (url.endsWith('/')) {
                url = url.slice(0, -1);
            }
            const data = await UserService.getEditContent(url)
            console.log(data)
            return res.status(200).json({
                code: 200,
                message: data,
            });
        } catch (error) {
        }
    }

    static async getAdmineditPage(req, res, next) {
        try {
            console.log(req.query.id)
            const data = await UserService.getAdminEditContent(req.query.id)
            console.log(data)
            return res.status(200).json({
                code: 200,
                message: data,
            });
        } catch (error) {
        }
    }

    static async getAllDoc(req, res, next) {
        try {
            const data = await UserService.getAllDoc()
            return res.status(200).json({
                code: 200,
                message: data,
            });
        } catch (error) {

        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers(req.query);
            return res.status(200).json({
                code: 200,
                message: 'Get all users successfully',
                data: users,
            });
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }

    static async getUser(req, res, next) {
        try {
            if (req.user.role === USER_ROLE.USER && req.params.user_id !== req.user.userId) {
                throw new Error('Bad request when access user information');
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            //console.log(11111111111111)
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
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
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
}

module.exports = UserController;