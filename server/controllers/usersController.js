const { response } = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({username});
        if (usernameCheck){
            return res.json({msg: "Username already used", status: false});
        }
        const emailCheck = await User.findOne ({ email });
        if (emailCheck){
            return res.json({msg: "Email already Registered", status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        })
        delete user.password;
        return res.json({status: true, user})
        
    } catch (error) {
        next(error);
    }
};

// FOR LOGIN 

module.exports.login = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (!user){
            return res.json({msg: "Incorrect username or password", status: false});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if( !isPasswordValid ){
            return res.json({msg: "Incorrect username or password", status: false});
        }
        delete user.password
        return res.json({status: true, user})
    } catch (error) {
        next(error);
    }
};

module.exports.setavatar = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImage: true,
            avatarImage,
        });
        return res.json({isSet: userData.isAvatarImage, image: userData.avatarImage});
    } catch(ex) {
        next(ex);
    }
};

module.exports.getallusers = async(req, res, next) => {
    try {
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email", "username", "avatarImage", "_id"
        ])
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};
