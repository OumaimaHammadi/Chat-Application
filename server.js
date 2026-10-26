const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const app = express()

require("dotenv").config();
const port = process.env.PORT || 4001




const options={}
const server =require ('http').createServer(options,app)


const ProfileRouter = require('./routers/profile.route')


const authRouter = require('./routers/auth.route')
const friendRouter = require('./routers/friend.route')
const getFriendRequest =require('./models/user.model').getFriendRequest
const homeRouter=require('./routers/home.route')
const chatRouter=require('./routers/chat.route')

const groupRouter=require('./routers/group.route')

const https = require('https');




const session =require('express-session')
const StoreSession =require('connect-mongodb-session')(session)
const flash =require('connect-flash')

app.use(express.static(path.join(__dirname ,'stylesheets')))

app.use(express.static(path.join(__dirname ,'assetes')))
app.use(express.static(path.join(__dirname ,'images')))

app.use('/photos',express.static(path.join(__dirname ,'photos')))

app.use(flash())


const STORE = new StoreSession({
    uri:process.env.MONGO_URI,

  collection :'sessions'

})

app.use(session({
    // secret:'this is my secret to hash express session ....',
    
     secret: process.env.SESSION_SECRET,
    
    saveUninitialized :true,
    resave: false,
    store:STORE 
}))



const io = socketIO(server) //fct de socketIO dans le server


io.onLineUsers = {};




require('./sockets/friend.socket')(io)
require('./sockets/init.socket')(io)
require('./sockets/chat.socket')(io)
require('./sockets/chat-group.socket')(io)



io.on("connection",socket =>{
    // require('./sockets/init.socket')(socket)
    // console.log("new user connected")
})


app.use((req,res,next)=>{


    if(req.session.userId){
        getFriendRequest(req.session.userId).then(requests =>{
            req.friendRequests = requests
            next()
        }).catch(err => 
            res.redirect('/error')

            )
    } else{
        next()

    }
})

app.set('view engine','ejs')
// app.set('views','views') 
app.set('views', path.join(__dirname, 'views'));





app.use('/home', homeRouter)
app.use('/profile',ProfileRouter)

app.use('/', authRouter)

app.use('/friends',friendRouter)
app.use('/chat',chatRouter)
app.use('/groups',groupRouter)


// /* app.use((req,res,next)=>{
//     res.status(404)
//     res.render("friends",{

//         isUser: req.session.userId,
//         pageTitle:"not-found"

//     }) */



app.get('/error',(req,res)=>{

    res.render('error',{
        pageTitle:'Error',

        //isUser :true,
      isUser: req.session.userId,

        friendRequests :req.friendRequests ,
            UserName :req.session.name,
    UserImage :req.session.image
      

    })
})

app.get('/not-found',(req,res)=>{
    res.render('not-found',{
                  pageTitle:'Not-found',

                //isUser :true,

        friendRequests :req.friendRequests,
            UserName :req.session.name,
    UserImage :req.session.image

    })
})

app.use((req, res, next) => {
    UserName =req.session.name
    UserImage =req.session.image
    next()
})


 app.get('/',(req,res)=>{

    res.render('index',{
        pageTitle:'Home',

        isUser :true,
        friendRequests :req.friendRequests,
        
    UserName :req.session.name,
    UserImage :req.session.image
 
      
    })
     console.log('UserImage:',UserImage,'UserName:',UserName)

})





 app.get('/profile',(req,res)=>{

    res.render('profile',{
        isUser :true,
        pageTitle:'Profile',

        friendRequests :req.friendRequests,

    })
})




app.get('/groups',(req,res)=>{
    res.render('group',{
        isUser :true,
        pageTitle:'Groups',

        friendRequests :req.friendRequests,


    })
})

app.get('/friends',(req,res)=>{

    res.render('friends',{
          pageTitle:'Friends',

        isUser :true,
        friendRequests :req.friendRequests

    })
})

  

server.listen(port,(err)=>{

    console.log(`Server is ${port} okk`)

})

// module.exports = app;




