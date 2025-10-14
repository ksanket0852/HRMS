const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const { listUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');

const router = express.Router();

router.use(authMiddleware, roleMiddleware('ADMIN'));

router.get('/', listUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
