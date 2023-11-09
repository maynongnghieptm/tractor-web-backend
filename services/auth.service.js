const { SORT_ORDER, USER_ROLE, SECRET_KEY } = require("../constants");
const { getAllUsers, getUser } = require("../models/repository/user.repository");
const UserModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { getInfoData } = require("../utils");
const { createToken } = require("../utils/auth");
let obj_user
class AuthService {
    static async logIn({ username, password, role }) {
        const user = await UserModel.findOne({ username, isConfirmed: true, isDeleted: false });
        if(!user) {
            throw new Error('User has not been registed');
        }
        
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword) {
            throw new Error('Password is incorrect');
        }

        const accessToken = createToken({ userId: user._id, role: user.role }, SECRET_KEY);
        return {
            ...getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address', 'tractorList'], object: user }),
            accessToken
        }
    }
     static async findUser({ username }) {
     //   console.log(username)
        const user = await UserModel.findOne({ username: username, isConfirmed: true, isDeleted: false });
      //  console.log(user)
        if(!user) {
            throw new Error('User has not been registed');
        }
        obj_user = user
        return {

            ...getInfoData({ fields: ['_id', 'username', 'email', 'fullname', 'address'], object: user }),
            
        }
    }
    static async findUseremail({ email }) {
        if (!obj_user) {
            throw new Error('User object is not available');
        }
        //console.log(obj_user.email)
       // console.log(email)
        if (email === obj_user.email) {
         
          //  console.log('dung')
            return true;
        } else {
         
            //console.log('sai')
            return false;
        }
    }
   
    static async changepassword({ username, newPassword, }) {
        const user = await UserModel.findOne({ username: username, isConfirmed: true, isDeleted: false });
       // console.log(user)
        if (!user) {
            throw new Error('User not found');
        }
       

       // const hashedPassword = await bcrypt.hash(newPassword, 10); // You can adjust the saltRounds as needed
    
     
        user.password = newPassword;
        console.log(user.password)
        await user.save();
    
        return user;
    }
    
    
}

module.exports = AuthService;