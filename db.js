import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/tyagi2"
export const func = async ()=>{
    try {
        const data = await mongoose.connect(url,{
        
            useUnifiedTopology:true
        })
        console.log("server is connected to database");
        return data
    } catch (error) {
        console.log("server is not commected to database",error)
    }
}