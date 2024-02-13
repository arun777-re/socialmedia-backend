import express from 'express';
import { createPost,likePost,unlikePost,commentOnPost,deletePost,getPosts,getUserPosts } from '../postcontrollers/post.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/getallposts',verifyToken,getPosts);
// router.get('/users/:userId/posts', authenticateUser, getUserPosts); // Get posts of a specific user
router.get("/userposts",verifyToken,getUserPosts);
router.post('/comment/:postId',verifyToken,commentOnPost);
router.post('/like/:postId',verifyToken,likePost);
router.post('/unlike/:postId',verifyToken,unlikePost)
router.delete('/:postId',verifyToken,deletePost);


export default router