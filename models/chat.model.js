const mongoose = require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/chat-app'

const chatSchema = mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'}]
})

const Chat = mongoose.model('chat', chatSchema)

exports.getChat = async chatId=>{
  try{
        await mongoose.connect(DB_URL)
        let chat = await Chat.findById(chatId).populate('users')
        mongoose.disconnect()
        return chat

  } catch(error){
            mongoose.disconnect()
            throw new Error(error)



  }
}

exports.Chat = Chat