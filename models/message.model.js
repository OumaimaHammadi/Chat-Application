const mongoose =require('mongoose');

const DB_URL='mongodb://127.0.0.1:27017/chat-app'

const messageSchema =mongoose.Schema({
    chat:{type:mongoose.Schema.Types.ObjectId,ref:'chat'},
    group: { type: mongoose.Schema.Types.ObjectId,ref:'Group'},

    content:String,
sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
    timestamp:Number

})

const Message = mongoose.model('message',messageSchema);

exports.getMessages=async (chatId)=>{
        console.log("chatId reçu:", chatId)

    try{
        await mongoose.connect(DB_URL)

//         let newChat = new Message({
//     chat:"69c1cffa6aea8f7f1b39947c",
//     content:"welcome",
//     sender: "sds",
//     timestamp:1
//         })
//  await newChat.save()

        let messages = await Message.find({chat:chatId},null,{sort:{timestamp:1}}).populate({
            path:'chat',
            model:'chat',
           populate:{
               path:'users',
               model:'user',
               select:'username image'
            }

        })
        mongoose.disconnect()
        return messages
    }
    catch(error){
            mongoose.disconnect()
            throw new Error(error)
        

    }
}

exports.newMessage =async msg=>{
    try{
        await mongoose.connect(DB_URL)
        msg.timestamp = Date.now()
        let newMsg = new Message(msg)
        await newMsg.save()
        mongoose.disconnect()
    }
    catch(error){
        mongoose.disconnect()
        throw new Error (error)
    }
}




exports.getGroupMessages=async (groupId)=>{
        console.log("groupId reçu:", groupId)

    try{
        await mongoose.connect(DB_URL)

//         let newChat = new Message({
//     group:"69c1cffa6aea8f7f1b39947c",
//     content:"welcome from friend groups",
//     sender: "Oumaima",
//     timestamp:1
//         })
//  await newChat.save()

        // let messages = await Message.find({group:groupId},null,{sort:{timestamp:1}})
        // console.log('messages/sender',messages)
        // .populate('sender', 'username image')
        
        // .populate({
        //     path:'group',
        //     model:'group',
        //    populate:{
        //        path:'members',
        //        model:'user',
        //        select:'name image'
        //     }

        // })
        // mongoose.disconnect()
        // return messages

        let messages = await Message.find(
            { group: groupId },
            null,
            { sort: { timestamp: 1 } }
        )
        .populate('sender', 'username image')
        .populate({
            path: 'group',
            model: 'group',
            populate: {
                path: 'members',
                model: 'user',
                select: 'name image'
            }
        })

        console.log('messages/sender', messages)
         mongoose.disconnect()
        return messages

    }
    catch(error){
            mongoose.disconnect()
            throw new Error(error)
        

    }
}



exports.newMessageGroup =async msg=>{
    try{
        await mongoose.connect(DB_URL)
        msg.timestamp = Date.now()
        let newGroupMsg = new Message(msg)
        await newGroupMsg.save()
        mongoose.disconnect()
    }
    catch(error){
        mongoose.disconnect()
        throw new Error (error)
    }
}



exports.Message = Message;
