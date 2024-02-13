import User from "../modals/User";

router.post('/users', createUser); // Register a new user
router.get('/users/:userId', authenticateUser, getUserProfile); // Get user profile
router.put('/users/:userId', authenticateUser, updateUserProfile); // Update user profile
router.post('/users/:userId/follow', authenticateUser, followUser); // Follow a user
router.post('/users/:userId/unfollow', authenticateUser, unfollowUser); // Unfollow a user



export default router