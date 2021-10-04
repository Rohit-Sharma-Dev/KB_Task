const User=require('../models/Users')
const Orders=require('../models/Orders')
const {validationResult}=require('express-validator')
const config = require('config')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


const createUser= async(req,res) =>{

    const error=validationResult(req)
    if(!error.isEmpty()){
        console.log("validation error")
        return res.status(400).json({errors:errors.array()})
    }
    const {name,phone,password,isAdmin,isDeliveryMan}=req.body;
    try {
        console.log(req.body,"sjhshkkkkk")
        var user=await User.findOne({ phone });
        console.log(user,"shjj")
        if(user){
            console.log("user already exist......")
            return res.status(400).json({msg:"user already exist.."})
        }

        user =new User({
            name,
            phone,
            password
        })
        console.log(user,"user")
     
        let salt=await bcrypt.genSalt(10)
        user.password=await bcrypt.hash(password,salt)
       
        // console.log(user.password,"pass")

       
        await user.save()

        console.log("skjsjkj")
        const payload = {
            user: {
                id: user.id,
            },
        };
        console.log(payload,"payload")
        

        jwt.sign(
            payload,
            config.get("jwtsecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
}

const login=async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log('validation result')
        res.status(400).json({msg:"validation error"})
    }
    const {phone,password}=req.body;
    try {
        let user = await User.findOne({ phone})

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] 
            })
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get("jwtsecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
}


const OrderSomething=async(req,res)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        console.log("validation error")
        res.status(400).json({msg:"validation error"})
    }
    const {item,quantity}=req.body

    try {
        
        
    } catch (err) {
        
    }
}

module.exports={createUser,login,OrderSomething}