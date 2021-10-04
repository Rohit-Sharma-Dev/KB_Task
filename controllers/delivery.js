const User=require('../models/Users')
const Orders=require('../models/Orders')
const {validationResult}=require('express-validator')

const updateStatus=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({msg:"error in your req body"})
    }
    try {
        let status=await Orders.findById(req.params.id)

        if(!status){
            return res.status(404).json({msg:"Not found"})
        }
        status.itemstatus='Delivered';

        await status.save();

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    

}

module.exports={updateStatus}