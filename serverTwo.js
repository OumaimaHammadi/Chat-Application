const express =require("express");
const path = require("path");
app=express();

const server = require("http").createServer(app)
const socketIO=require("socket.io")
const io = socketIO(server)
io.on('connection',socket => {
    console.log('new user connected')
    //console.log('event received')

    // socket.on('clientEvent',(data)=>{
    //     console.log('event received',data)

    //     socket.broadcast.emit("serverEvent",()=>{
    //         console.log('event send to Client')
    //     })
            

    // })
     socket.on('sendMSG',(p1,p2)=>{
        //socket.broadcast.to('MyRoom').emit("newMsg")
        io.to('MyRoom').emit("newMsg")
        console.log("sendEvent is received",p1,p2)

     })


     socket.on('joinEvent',()=>{
        socket.join('MyRoom')
        console.log("joinEvent is received")

     })


})


app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})

server.listen(4000,()=>{
    console.log("Server is 4000")
}
)