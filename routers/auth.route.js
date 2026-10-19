const router =require('express').Router()
const bodyParser =require('body-parser')
const check = require('express-validator').check

const bodyParserMW = bodyParser.urlencoded ({extended:true})
const authguard =require('./guards/auth.guard')
    


const authController =require('../controllers/auth.controller')

 router.get('/signup',authguard.notAuth,authController.getSignup)
 const multer =require('multer')


 router.post('/signup',authguard.notAuth,bodyParserMW,multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now() + "-" + file.originalname)
        }

    })
})
.single('image'),
// check('image').custom((value,{req})=>{
//     if(req.file) return true
//     else throw 'image is required'

// }),
 
 check('username').not().isEmpty().withMessage('username is required'),

 
 check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),

 
 check('password').not().isEmpty().withMessage('password is required').isLength({min:6}).withMessage('password must be at least 6 characters') ,
 
 check('confirmPassword').custom((value,{req})=>{ //custom validator
     if(value === req.body.password){
      return true

     } 
     
     else  {throw 'Passwords dont equal'} 
   }),
   
   authController.postSignup)




 // (req,res,next)=>{   ///middleware
     // let value = req.body.password
    // return check('confirm password').equals(value)
 ///},
 



 router.get('/login',authguard.notAuth,authController.getLogin)
 router.post('/login',authguard.notAuth, bodyParserMW ,
            check('email')
            .not()
            .isEmpty().withMessage('email is required')
            .isEmail().withMessage('invalid email format') ,
            check('password')
            .not()
            .isEmpty()
            .withMessage('password is required')
            .isLength({min : 6})
            .withMessage('password must be at least 6 characters') ,


 authController.postlogin )

 router.all('/logout',authguard.isAuth,authController.logout)






module.exports=router