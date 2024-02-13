import express from 'express';
import { markAsReadNotifications,getallNotifications } from '../notififactionController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.patch('/:notificationId/note',verifyToken,markAsReadNotifications)
router.get('/:userId/getnote',verifyToken,getallNotifications)



export default router