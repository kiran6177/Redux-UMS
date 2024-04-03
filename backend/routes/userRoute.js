const express = require('express')
const router =  express.Router();
const userController = require('../controller/userController')
const {isLogin} = require('../middleware/userAuth')
const upload = require('../utils/multer')

router.post('/login',userController.login)
router.post('/signup',userController.signup)
router.post('/profileUpload',isLogin,upload.single('image'),userController.profileUpdate);


module.exports = router