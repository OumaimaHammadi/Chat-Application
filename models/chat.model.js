const mongoose = require('mongoose')

require("dotenv").config();

const DB_URL = process.env.MONGO_URI;

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