const router = require('express').Router() 
const authGuard = require("./guards/auth.guard");

const check =require('express-validator').check

const friendController = require('../controllers/friend.controller');
const bodyParser =require('body-parser').urlencoded ({extended:true})
const multer =require('multer')




//router.post('/add',authGuard.isAuth,bodyParser,friendController.add) 

router.post('/cancel',authGuard.isAuth,bodyParser,friendController.cancel) 
router.post('/accept',authGuard.isAuth,bodyParser,friendController.accept) 
router.post('/reject',authGuard.isAuth,bodyParser,friendController.reject) 

router.post('/delete',authGuard.isAuth,bodyParser,friendController.delete) 
router.get('/',authGuard.isAuth,friendController.getFriends)

router.get('/CreateGroup',authGuard.isAuth,friendController.getCreateGroupe)

router.post('/CreateGroup',authGuard.isAuth,multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now() + "-" + file.originalname)
        }

    })
}).single('image')
,
// check('image').custom((value,{req})=>{
//     if(req.file) return true
//     else throw 'image is required'

// }),
// check('name')
// .not()
// .isEmpty()
// .withMessage('name is required'),
// check('price')
// .not()
// .isEmpty()
// .withMessage('price is required'),
// check('category')
// .not()
// .isEmpty()
// .withMessage('category is required'),
// check('description')
// .not()
// .isEmpty()
// .withMessage('description is required')


//,
friendController.postAdd)

module.exports = router
