const router = require('express').Router() 
const authGuard = require("./guards/auth.guard");

const check =require('express-validator').check

const groupController = require('../controllers/group.controller.js');
const bodyParser =require('body-parser').urlencoded ({extended:true})
const multer =require('multer')

router.get('/',authGuard.isAuth,groupController.getGroup)
router.get('/chat/:id',authGuard.isAuth,groupController.getChatGroup)


module.exports = router
