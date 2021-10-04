const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required:true,
        match:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,1024}$/
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    isDeliveryMan: {
        type: Boolean,
        default:false
    } 
},{
    timestamps:true
    })

const Users=mongoose.model('users',UserSchema);

module.exports=Users;