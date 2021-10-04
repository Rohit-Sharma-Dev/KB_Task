const express=require('express')
const router = express.Router();

const {updateStatus}= require('../controllers/delivery')
const { check, validationResult } = require('express-validator')
const auth=require('../middleware/auth')
const isAdmin=require('../middleware/isAdmin')


// router.put('updatestatus',updateStatus)

// module.exports=router;