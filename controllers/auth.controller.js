const AuthService = require("../services/auth.service");

class AuthController {
    static async logIn(req, res, next) {
        try {
            const authUser = await AuthService.logIn(req.body);
            return res.status(200).json({
                code: 200,
                message: 'Login successfully',
                data: authUser,
            });
        } catch (err) {
            return res.json({
                code: err.statusCode || 500,
                message: err.message || 'Internal Server Error',
            });
        }
    }
}

module.exports = AuthController;