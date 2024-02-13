// Post Routes


import Post from '../modals/Post.js'
import {check,validationResult} from 'express-validator'


export const createPost = async(req,res)=>{
    await check('caption').notEmpty().withMessage('caption is required').run(req);
    await check('image').notEmpty().withMessage("Image is required").run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.mapped()})
    }
    try {
        
 
     const {user,caption,image,likes,comments} = req.body;

     const post = await new Post.create({
        user,image,caption,comments:comments || [],
        likes:likes || []
     });

     const newPost = await post.save();
     return res.status(201).json({message:"Post created successfully",newPost});
    } catch (error) {
        console.error("Error creating post:",error)
        res.status(500).json("Internal Server Error",error.message);
    }
}

// route to get all the posts
export const getPosts= async(req,res)=>{
    try {
        const post = await Post.find();
        return res.status(200).json(post);
    } catch (error) {
        res.status(500).json("Internal Server Error",error.message)
    }

}

// routes for the getting post to a specified user
export const getUserPosts = async(req,res)=>{
    try {
        const {id} = req.params;
        const userPosts = await Post.findById(id);
        if(!userPosts){
            return res.status(404).json({error:"User not found"})
        }
        return res.status(200).json(userPosts);
    } catch (error) {
        console.log("Error fetching user posts:",error.message);
        res.status(500).json("Internal Server Error");
    }

}

export const likePost = async(req,res)=>{
try {
    const {postId} = req.params;
    const {userId} = req.user;
    // check if the post exists or not
    const post = await Post.findById(postId);
    if(!post){
        return res.status(404).json({error:"Post not found"});

    }
    // check if the user already liked the post
    if(post.likes.includes(userId)){
        return res.status(400).json({error:"Post already liked by you"})
    }
    // Add the user ID to the likes array
    post.likes.push(userId);
    await post.save();
    return res.status(200).json({message:"Post liked successfully"})
} catch (error) {
    console.error("error in liking post ",error.message);
    return res.status(500).json({error:"Internal Server Error"})
}

}
export const unlikePost = async(req,res)=>{
try {
    const {postId} = req.params;
    const {userId} = req.body;
    // check whether if both things are provided 
    if(!postId || ! userId){
        return res.status(404).json({error:"didnot find user or post"})
    }
    // find this particular post 
    const post = await Post.findById(postId);
    // if not post 
    if(!post){
        return res.status(404).json("post is not found");
    }
    
    // remove the userId from the likes array
    // filter creates the new array in which userId is not included
    post.likes = post.likes.filter((id)=> id !== userId);
    
    // save the updated post 
    await post.save();
    return res.status(200).json({message:"Post unliked successfullly",post})
} catch (error) {
    console.error(error);
    return res.status(500).json({error:"Internal severr error"})
}
}

export const commentOnPost = async(req,res)=>{
try {
    // find the userId and postId
    // destructuring means we are getting a value from something
    const {postId} = req.params;
    const {userId,text} = req.body;

    // find the post 
     const post = await Post.findById(postId);
     if(!post){
        return res.status(404).json({Error:"Post not found"})
     }    
    //  add the comment to the comments array
    post.comments.push({user:userId,text});

    await post.save();
    return res.status(200).json({message:"comment added successfully"})
} catch (error) {
    console.error(error.message);
    return res.status(500).json({Error:"interrnal server error"})
}
}


export const deletePost = async (req,res)=>{
    try {
        const {postId} = req.params;
        const {userId} = req.user;
        // find the post 
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({Error:"Post does not exists"});
        }
        // check whether the user is authorized to delete this post
        if(post.user.toString === userId){
            return res.status(403).json({error:"Unauthorized"})
        }

        //  at last delete the post
        await post.findByIdAndDelete(postId);

        return res.status(200).json({message:"Post deleted successfully"})
    

    } catch (error) {
        console.error("Error in deleting the post",error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

