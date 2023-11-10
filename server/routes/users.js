const router = require('express').Router();
const userController = require('../controller/users');

// get user by id or email
router.get('/:userId', userController.getUserById);
/**
 * update user by id
 * @method PUT
 */
router.put('/:userId', () => {});
/**
 * update user by id
 * @method PATCH
 */
router.patch('/:userId', () => {});
// delete user by id 
router.delete('/:userId', () => {});
/**
 * Get all users include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/users?sort=['by': 'name']
 * @method GET
 * @visibility Private
 */
router.get('/', userController.getUsers);
// create a new user
router.post('/', userController.postUser);

module.exports = router;