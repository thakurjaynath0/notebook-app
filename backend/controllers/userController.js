const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { validationResult } = require('express-validator');


const createUser = async(req, res) => {
    const {name, email, password} = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    
    try {

        let user = await User.findOne({email})
     
        if(user){
            return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: 'User with this email already exists'});
        }
        user = await User.create({name, email, password});
       const token = user.createJWT();
       res.status(StatusCodes.OK).json({success: true, token});

        } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
       }
}

const login = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({success: false, errors: errors.array() });
   }

   const {email, password} = req.body;
   
    try {
    let user = await User.findOne({email})
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: 'Login with valid credentials'});
    }

    //compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).json({success: false, error: 'Login with valid credentials'});
    }

    //if correct create token
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({success: true, token});
   } 
   catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
   }

}


const getUser = async (req, res) => {
    const id  = req.user.userId;

    try {
        const user = await User.findById(id).select('-password');
        res.status(StatusCodes.OK).json({user})    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }

}


module.exports = {
    createUser,
    login,
    getUser,
}