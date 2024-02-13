// import { request } from "express"
import Notification from "./modals/Notification.js"


//  function to mark notifications as read
// this controller will update the read status of notifications
 export const markAsReadNotifications = async(req,res)=>{
     try {
        // retrieve njotification id from the request
        const {notificationId} = req.body;
        // update the read status of notification in the database
        // updateMany() is a method provided by the mongoose to update many things at once that will match that condition
        // $set operator is used to update the fields in database
        await Notification.updateMany(
            // $in is a operator in mongoose how is it works let us explain
            // $in method is applied on a field here field id _id and the condition is notificationid means it will retrieve all the elements from the field id that will matches with notificationid condition
            {_id:{$in:notificationId}},
            {$set:{read:true}}
            // update read status to true
        )
        //  return a success message in the response
        return res.status(200).json({message :"notification marked as read"})
     } catch (error) {
        console.error(error.message);
        return res.status(500).json({Error:"Internal Server Error",error})
     }
}
// function to get all notifications


export const getallNotifications =async(req,res)=>{
    try {
        // retrieve userId from the requested user
        const userId = req.user._id;
        // query database for notifications associated with the user
        // Notificxation.find({recipient:userId}) is used to retrieve multiple notification for a specific user
        const notifications = await Notification.find({recipient:userId}).sort({createdAt:-1})

        //  r4eturn the notification in the response
        return res.status(200).json(notifications)
    } catch (error) {
       console.error(error.message);
       return res.status(500).json({Error:"Internal Server Error",error})
    }
}