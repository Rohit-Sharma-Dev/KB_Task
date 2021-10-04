const express = require('express');
const router = express.Router();

const {createUser,login,orderSomething}= require('../controllers/user')
const { check, validationResult } = require('express-validator')


const auth=require('../middleware/auth')



router.post('/signup', [
    check('phone', 'Name is required').not().isEmpty(),
    check('password', 'Please enter the password 8 or more characters'),
],createUser);



// login


router.post("/login",[
    check("phone", "please include a valid phone").isNumeric().isLength({ min: 10,max:10 }),
    check("password", "password is required").exists(),
],login)


// order something

module.exports=router;
