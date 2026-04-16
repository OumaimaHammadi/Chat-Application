const router = require('express').Router() //router level
const authguards = require('./guards/auth.guard')
const homeController = require('../controllers/home.controller')


router.get('/',authguards.isAuth,homeController.getHome)




module.exports = router
