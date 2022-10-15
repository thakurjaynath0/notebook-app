const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(StatusCodes.UNAUTHORIZED).send({error: 'Please authenticate using a valid token'})
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId};
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({error: 'Please authenticate using a valid token'})
    }
}

module.exports = fetchuser;