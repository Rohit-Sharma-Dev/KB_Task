const express=require('express')
const router = express.Router();
const {createUser,login,orderSomething}= require('../controllers/user')

const {inputItems,assignItem,deliveryPersons,getStatus}= require('../controllers/admin')
const { check, validationResult } = require('express-validator')
const auth=require('../middleware/auth')
const isAdmin=require('../middleware/isAdmin')

router.post('/signup',[
    check('phone', 'phone is required').not().isEmpty(),
    check('isAdmin', 'isAdmin is required').not().isEmpty(),
    check('password', 'Please enter the password '),
],createUser
)

router.post('/login',[
    check('phone', 'Name is required').not().isEmpty(),
    check('password', 'Please enter the password 8 or more characters'),
],login)

router.post('/addItems',[
    check('Enter categoryName').not().isEmpty(),
    check('Enter itemName').not().isEmpty(),
    check('Enter address').not().isEmpty(),
    check('Enter quantiy').not().isEmpty()
],)

router.get('/DeliveryPerson',deliveryPersons)


router.get('/orderStatus',getStatus)


router.put('/assignItems',assignItem)

module.exports=router;


