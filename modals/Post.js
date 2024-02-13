import mongoose from 'mongoose';
import User from './User.js';

const postSchema = new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     caption:{
      type:String,
      required:true,
      max:100,
      min:10,
     },
     image:{
      type:String,
      required:true,
      default:''
     },
     likes:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
      },
     ],

     comments:[
      {
         user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
         },
         text:{
            type:String,required:true,
         },
         createdAt:{
            type:Date,
            default:Date.now,
         },
      },
     ],
     location:{
      type:{
         type:String,
         enum:['Point'],
         required:false
      },
      coordinates:{
         type:[Number],
         required:false,
      },
     },
         
},{timestamps:true});

// index the 'location' field for geospatial queries
postSchema.index({location:'2dsphere'})

const Post = mongoose.model('Post',postSchema);

export default Post;