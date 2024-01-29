const AuthService = require("../services/auth.service");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const VerificationCode = require('../models/verificationCode.model')
const moment = require('moment');

let username = ''
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
    static async findUser(req, res, next) {
        try {
            username = req.params.user_username;
            // console.log(username)
            const user = await AuthService.findUser({ username });
            console.log(user)
            if (user) {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error searching for user' });
        }
    }
    static async findEmail(req, res, next) {
        // console.log(username)
        try {
            const email = req.params.user_email;
            const verificationCode = crypto.randomBytes(32).toString('hex');
            const newVerificationCode = new VerificationCode({
                code: verificationCode,
                expirationTime: new Date(Date.now() + 2 * 60 * 1000),
                user: username,
            });
            newVerificationCode.save()
                .then(savedCode => {
                    console.log('Mã xác thực đã được lưu vào cơ sở dữ liệu.');
                })
                .catch(error => {
                    console.error('Lỗi khi lưu mã xác thực:', error);
                });
            const isSub = await AuthService.findUseremail({ email });
            if (isSub) {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'maynongnghieptm@gmail.com',
                        pass: 'xrbz oqsn kojf tyov'
                    }
                });
                const mailOptions = {
                    from: 'maynongnghieptm@gmail.com',
                    to: email,
                    subject: 'Đặt lại mật khẩu',
                    html:
                        '<p>Truy cập địa chỉ bên dưới để đặt lại mật khẩu tài khoản của bạn:</p>' +
                        `http://tractorserver.myddns.me:3000/#/auth/changepassword/${username}?code=${verificationCode}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).json({ message: 'Email sent successfully' });
                    }
                });
            }
            else {
                console.log('sai')
            }
        } catch (error) {
            res.status(500).json({ message: 'Error sending email' });
        }
    }
    static async changePassword(req, res, next) {

        try {
            const username = req.body.username;
            const newPassword = req.body.password;
            const code = req.body.code;
            const verificationCode = await VerificationCode.findOne({
                code: code, user: username,
            })
            if (!verificationCode) {
                console.log('Invalid or expired verification code');
                return res.status(400).json({ message: 'Mã xác thực không đúng' });
            } else if (verificationCode.isActive === false) {
                return res.status(401).json({ message: 'Mã xác thực đã được sử dụng' })
            }
            //console.log(verificationCode.isActive)
            const expirationTime = moment(verificationCode.expirationTime);
            const currentTime = moment();
            if (currentTime.isAfter(expirationTime)) {
                console.log('Verification code has expired');
                return res.status(402).json({ message: 'Mã xác thực đã hết hạn' });
            }
            await AuthService.changepassword({ username, newPassword });
            verificationCode.isActive = false;
            await verificationCode.save();
            res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
        } catch (error) {
            console.log('An error occurred:', error);
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = AuthController;