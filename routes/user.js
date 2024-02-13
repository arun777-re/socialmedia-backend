import express from 'express';
import {verifyToken} from '../middleware/verifyToken.js'
import { login,register,followUser,unfollowUser,updateUser,getUser} from '../usercontrollers/post.js';
import { check } from 'express-validator';

const router = express.Router();
router.post('/register',[
    check('firstName').notEmpty().withMessage("please enter the firstname"),
    check('lastName').notEmpty().withMessage("please enter the lastname"),
    check('email').isEmail().notEmpty().withMessage("please enter the valid email"),
    check('password').isLength({min:8}).notEmpty().withMessage("please enter the password with min 8 chars"),
],register);
router.post('/login',[
    check('email').isEmail().notEmpty().withMessage('Enter the valid email'),
    check('password').isLength({min:8}).notEmpty().withMessage('enter password with minimum 8 chars')
],verifyToken,login);
router.post('/follow',verifyToken,followUser)
router.post('/unfollow',verifyToken,unfollowUser);
router.get('/:id/getuser',getUser);
router.put('/:userId/profile',verifyToken,updateUser)


// in follow and unfollow route we use the static method for route bc
// we already get the follow and unfollowuserId from uestAnimationFrame.params



export default router;