import User from "../modals/User";


export const getUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500);
    }
}


export const updateUserProfile = async(req,res)=>{
    
}

export const followUser= async(req,res)=>{

}

export const unfollowUser = async(req,res)=>{

}

export const getUserFriends = async(req,res)=>{
    
}