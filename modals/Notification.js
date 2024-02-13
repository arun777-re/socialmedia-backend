import mongoose from 'mongoose';
import User from './User.js';
const notificationSchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    read:{
        type:Boolean,
        default:false
    },
    link:{
        type:String,
        default:""
    }
},{timestamps:true});

const Notification = mongoose.model('Notification',notificationSchema);
export default Notification;