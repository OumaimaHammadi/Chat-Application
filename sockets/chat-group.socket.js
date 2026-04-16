const { newMessageGroup } = require("../models/message.model")

module.exports = io =>{
    io.on('connection',socket=>{
        socket.on('joinChat',groupIdId=>{
            socket.join(groupIdId)
        })
        socket.on('sendMessageGroup',(msg,cb)=>{
            newMessageGroup(msg).then(()=>{
             
                io.to(msg.group).emit('newMessageGroup',msg)
                cb()

            })

           
        })
    })
}


//  socket.on('sendMessageGroup', async (data) => {

   
//            let message = new Message(data)
//              message.save()

//             let populatedMsg =  message.populate({
//                 path: 'sender',
//                 select: 'name image'
//             })
//     io.to(data.group).emit('newMessageGroup', populatedMsg)
//})