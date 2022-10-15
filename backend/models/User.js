const mongoose =  require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    date: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});


UserSchema.pre('save',  async function(){
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function(){
   return jwt.sign({userId: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(providedPassword){
    const isMatch = await bycrypt.compare(providedPassword, this.password);
    return isMatch;
}




module.exports = mongoose.model('User', UserSchema);