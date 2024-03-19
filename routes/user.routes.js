const Router = require('express')
const  router = new Router()
const {check} = require('express-validator')
const userController = require('../controllers/user.controller')
const roleMiddleware = require('../middleware/roleMidleware')

router.post('/user',  roleMiddleware(['ADMIN']), [
  check('username', "Username сannot be empty").notEmpty(),
  check('password', "The password cannot be less than 4 characters").isLength({min:4}),
],  userController.createUser)
router.post('/user/auth', userController.login)
router.get('/user', userController.getUser)
router.get('/user/:id',  roleMiddleware(['USER', "ADMIN"]), userController.getOneUser)
router.put('/user',  roleMiddleware(['ADMIN']), userController.updateUser)
router.delete('/user/:id', roleMiddleware(['ADMIN']), userController.deleteUser)

module.exports = router