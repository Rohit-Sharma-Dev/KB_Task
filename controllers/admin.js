const User=require('../models/Users')
const Orders=require('../models/Orders')
const Items=require('../models/Items')
const {validationResult}=require('express-validator')

const inputItems=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        console.log("validation error")
        return res.status(400).json({errors:errors.array()})
    }
    
    try {
        let items=req.body;
        if(items.length===0 || items=={}){
            res.status(400).json({msg:"enter some sufficient Data"})
        }
        
        await Items.save();
        return res.status(200).json({msg:`items added succesfully\n ${items}`})

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:"something went wrong"})
    }
}

const getStatus=async(req,res)=>{
   try {
       const orderStatus=await Orders.find()
       if (!(orderStatus.itemstatus ==='not_Delivered' && orderStatus.itemPicked==='not_Yet')){
           res.status(400).json({msg:"items you are seaching are not available at this time"})
       }
       return res.status(200).json(orderStatus)


   } catch (err) {
       console.log(err)
       return res.status(500).json({msg:"something went wrong"})
   }
}

const deliveryPersons=async(req,res)=>{
    try {
        const deliveryMen=await User.find({isDeliveryMan:true})

        return res.status(200).json(deliveryMen)
    } catch (err) {
        console.log
        (err)
        return res.status(500).json({msg:"something went wrong"})

    }
}

const assignItem=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg:"there should be problem in your request"})
    }
    let person=req.params.id
    try {
        let deliveryman= await User.findById(person)

        if(deliveryman.isDeliveryMan===false){
            console.log('you choses some wrong credential')
            return res.status(404).json({msg:"please give us some valid credentials"})
        }
        let orders=await Orders.find()
        if(orders.itesmstatus === 'Items Picked'){
            return res.status(400).json({msg:"this order is already assigned to some other person"})
        }
        orders.findByIdAndUpdate(_id, { assignedTo: deliveryman }, { upsert: true });

        await orders.save();
           
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:"something went wrong"})
    }
}

module.exports={inputItems,assignItem,deliveryPersons,getStatus}