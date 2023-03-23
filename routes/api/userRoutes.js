const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// create a user
router.route('/').get(getUsers).post(createUser);

// update a user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// add/delete a friend
router.route('/:userId/friends/:friendId').put(addFriend).delete(deleteFriend);

module.exports = router;