const mongoose =require('mongoose');
const User = require('./user.model.js');

require("dotenv").config();

const DB_URL = process.env.MONGO_URI;

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "default-group.jpg"
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    // messages: [{
    //     sender: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     content: String,
    //     date: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }],

     messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Group = mongoose.model("group", groupSchema);





exports.editImage=(data)=>{
    return new Promise((resolve,reject) =>{

        mongoose.connect(DB_URL,
            { useNewUrlParser: true , useUnifiedTopology: true})
            .then(()=>{
       // Ajouter le créateur dans members
            if (!data.members.includes(data.admin)) {
                data.members.push(data.admin);
            }

        let group = new Group(data)
        return group.save()
    
    }).then(()=>{
            mongoose.disconnect()
            resolve()
    }).catch(err =>{
                mongoose.disconnect()
                reject(err)
        })
    })
}

exports.getGroup =(userId)=>{
 return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true})
         .then(() => {
                return Group.find({members: userId})

            })
        .then(groups=>{
                mongoose.disconnect()
                resolve(groups)
            }).catch(err => {
                mongoose.disconnect()

                reject(err)

            })
               
            

    })
}




exports.getchatGroup = async (groupId) => {
  try {
    await mongoose.connect(DB_URL)

    let chatGroup = await Group.findById(groupId)
    //.populate('members')

    await mongoose.disconnect()

    return chatGroup
  } catch (error) {
    console.log(error)
    await mongoose.disconnect()
    throw error
  }
}



