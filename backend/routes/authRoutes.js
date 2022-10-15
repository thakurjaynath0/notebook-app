const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const fetchuser = require('../middlewares/fetchuser');

const {createUser, login, getUser} = require('../controllers/userController');


router.route('/register')
.post([
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    createUser
);

router.route('/login')
.post([
    body('email').isEmail().exists(),
    body('password').exists()],
    login
);

router.route('/getuser/:id').get(fetchuser, getUser);


module.exports = router;
