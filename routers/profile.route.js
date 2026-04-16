const router = require('express').Router()
const profileController = require('../controllers/profile.controller')

const authGuard = require("./guards/auth.guard");

router.get('/',authGuard.isAuth,profileController.getProfile)


router.get('/:id',authGuard.isAuth,profileController.getProfile)





module.exports = router