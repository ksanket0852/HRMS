const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification
} = require('../controllers/notification.controller');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createNotification); // Use with caution, restrict to admin ideally
router.get('/', getUserNotifications);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;
