import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userPicture:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    ],
    following:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"User" 
        },
    ],
    Notifications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Notification"
        }
    ]
  
} ,{timestamps:true})


const User = mongoose.model('User',userSchema);
export default User;
