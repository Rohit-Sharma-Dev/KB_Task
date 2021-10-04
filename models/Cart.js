const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        index: true,
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        index: true,
    }
})