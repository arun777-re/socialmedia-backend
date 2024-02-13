import jwt from 'jsonwebtoken';
export const verifyToken = async (req,res,next)=>{
    try {
        const token = req.headers('Authorization');
        if(!token){
            return res.status(404).json("Access denied");
        }
        const verify = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }

}