import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import helmet from 'helmet';
import { func } from './db.js';
func();

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import notificationRoutes from './routes/notification.js';
import { register } from './usercontrollers/post.js';
import { createPost } from './postcontrollers/post.js';

const router = express.Router();
// for pocessing the .env files
dotenv.config();

const port = 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// Logger middleware using morgan
app.use(morgan('combined'));


// using multer for handling file uploads
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        // specify the destination folder for uploads
        cb(null,'uploads/');
    },
    filename:function(req,res,cb){

        cb(null,Date.now() + '-' +file.originalname)
    }
});

const upload = multer({storage:storage})


// route for registering a user with file upload
router.post('/user/register',upload.single('user'),register);
router.post('/posts/createpost',upload.single('post'),createPost);

// routes 
app.use('/user',userRoutes);
app.use('/posts',postRoutes)


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
});










