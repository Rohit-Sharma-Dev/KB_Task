const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    item:{
        type:String, 
        required:true
    },
    quantity:{
        type:Number, 
        default:0
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
        index: true,
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "items",
        index: true,
    },
    itemstatus:{
        type: String,
        enum:['Task_Created', 'Reached Store', 'Items Picked', 'Enroute', 'Delivered', 'Canceled'],
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        index: true,
    }

})

const Orders=mongoose.model('orders',OrderSchema);

module.exports=Orders;


// 

// category
// categoryName : food
// address:["Delhi","himachal"]



// Itmes 
// category: ref category
// itemsName : 4,
// quantity: 2


// orders
// customerId: ref users
// itemId: ref Itmes
// quantity: 1
// crea