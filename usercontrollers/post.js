import User from "../modals/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check,validationResult } from "express-validator";

// $push method is used to push/append a element into array if a element is not an array then it automatically creates it an array
// while $pull method is used to delete a element from an array


export const register = async(req,res)=>{
await check('firstName').notEmpty().withMessage('please enter the firstName').run(req)
await check('lastName').notEmpty().withMessage('please enter the lastName').run(req)
await check('email').isEmail().withMessage('please enter the email').run(req)
await check('password').isLength({min:6}).withMessage('please enter the password').run(req)

// check for validation errors
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.mapped()})
}
    try {
        const {firstName,lastName,
            occupation,location,
        email,password,userPicture} = req.body;
        // these information are coming from the user side
        const salt =await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);
        // generating the hash of the password using bcrypt
        const user = await new User({
        firstName,lastName,location,password:hashPassword,
        email,userPicture,occupation
        });
        const newUser = await user.save();
        res.status(200).json(newUser)     
    } catch (error) {
        res.status(500).json("Internal Server Error",error.message)
    }
   
};

export const login = async (req,res)=>{
    // adding validation to the body using express validator 
    await check('email').isEmail().withMessage('please enter the valid email').run(req),
    await check('password').notEmpty().isLength({min:8}).withMessage("please enter the password with min 8 chars").run(req)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.mapped()})
    }
    try { 
        const {email,password} = req.body;

    const user = await User.findOne({email});
    // if user doenot exists
    if(!user){
        res.status(404).json("user credentials are wrong")
    }
    //  compare the password of the user with the actual password
    const isMatch = bcrypt.compare(password,user.password)
    // if password doesnot match
    if(!isMatch){
        return res.status(404).json("wrong credentials")
    }
    
    // if user exists then generate the token
    const token = jwt.sign(user.id,process.env.JWT_SECRET)
   return  res.status(200).json(token)
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({Error:"Internal Seerver Error",error})
    }
    

}

export const getUser = async(req,res)=>{
    try {
        const {id} =req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({Error:"User doesnot exists"});
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({Error:"Internal Server Error"})
    }
}

// put is used to replace an entire resource while Patch is used to apply partial modification to a resource
// patch request
export const updateUser = async (req,res)=>{
    try {
        const userId = req.user.id;
        const {firstName,lastName,occupation,location,userPicture} = req.body;
        // Validation:Ensure required fields are provided
        if(!firstName || !lastName ||!occupation ||!location){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
            $set:{
                firstName,lastName,occupation,location,userPicture,
            },
        },{new:true})

        res.json(200).json({user:updatedUser,message:"User profile updated successfully"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }

}

// Follow a User
export const followUser = async (req,res)=>{

    try {
        // current logged in user
       const userId = req.user.id; 
       const {followedUserId} = req.params;
    //    Add followed UserId to the following list of the current user
    await User.findByIdAndUpdate(userId,{
        $addToSet:{following:followedUserId},
    });
// Add userId to the followers list list of the followed user
// $addToSet mongodb update operator
    await User.findByIdAndUpdate(followedUserId,{
        $addToSet:{
            followers:userId
        }
    })
    res.json({message:"User followed successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const unfollowUser = async (req,res)=>{
    try {
 
// current logged in user
    const userId = req.user.id;
    const {unfollowedUserId}= req.params;

    // Remove unfollowedUserId from the following list of the current logged in user
    await User.findByIdAndUpdate(userId,{
        $pull:{following:unfollowedUserId}
    });
    // Remove userId from the followers list of the unfollowed user
    await User.findByIdAndUpdate(unfollowedUserId,
        {$pull:{followers:userId}})
   res.json(200).json({message:"User unfollowed successfully"})
          
} catch (error) {
         console.error(error);
         res.status(500).json({message:"Internal Server Error"})  
}
}