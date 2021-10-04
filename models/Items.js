const mongoose =require('mongoose')

const itemsSchema=new mongoose.Schema({

    categoryName : {
        type:String, 
        required:true
    },
    itemName:{
        type:String, 
        required:true
    },
    address:{
        type:String,
        enum:["delhi","himachal","haryana"]
    },
    quantiy:{
        type:Number,
        required:true
    }
    
})

const Items=mongoose.model('items',itemsSchema)

module.exports=Items