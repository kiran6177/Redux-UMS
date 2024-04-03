const express = require('express')
const router =  express.Router();
const adminController = require('../controller/adminController');
const {isLogin} = require('../middleware/adminAuth');
const upload = require('../utils/multer')

router.post('/login',adminController.login);
router.get('/getusers',isLogin,adminController.getUsers);
router.put('/edituser',isLogin,upload.single('image'),adminController.editUser);
router.get('/blockunblock',isLogin,adminController.blockUnblock);
router.get('/delete',isLogin,adminController.deleteUser);
router.post('/create',isLogin,adminController.createUser);



module.exports = router