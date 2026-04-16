const mongoose =require('mongoose')
const DB_URL='mongodb://127.0.0.1:27017/chat-app'

const Chat =require('./chat.model').Chat





const userSchema =mongoose.Schema({
    username: String,
    email:String,
    password: String ,
    
    image:{type:String,default:"default-user-image.png"},
    isOnline:{type:Boolean,default:false},
    friends:{
      type: [{name:String,image:String,
        chatId:String,
  
        id:String}],
      default:[]},
      





  friendRequests:{
        type:[{id:String,name:String,image:String}],
        default:[]},


  sentRequests:{
    type:[{id:String,name:String,image:String}],
    default:[]},    
})

const User = mongoose.model('user',userSchema);


exports.getUserData = (id) => {
    //console.log(id)
    //connect db
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL ,{ useNewUrlParser: true , useUnifiedTopology: true})
        .then(()=>{
            return User.findById(id)
        })
        .then(data=>{
                mongoose.disconnect()
                resolve(data)
            }).catch(err => {
                mongoose.disconnect()

                reject(err)

            })
               
            

    })
   
    
}



exports.sendFriendRequest = async(data) => {
    //add me to friend friendRequests
    //add friend to me sendRequest
    try{

    await mongoose.connect(DB_URL)
    await User.updateOne({_id: data.friendId},
       {$push:{friendRequests:{
        name:data.myName,
        id:data.myId,
        image:data.myImage

    }}} 
     )
     await User.updateOne({_id: data.myId},
        {$push:{sentRequests:{
            name: data.friendName,
            id:data.friendId,
            image:data.friendImage
        }}
        } 
        )

    mongoose.disconnect()
    return;

} catch(error){
    mongoose.disconnect()
    throw new Error(error)
}

}


exports.cancelFriendRequest = async(data) => {
    //add me to friend friendRequests
    //add friend to me sendRequest
    try{
        await mongoose.connect(DB_URL)
        await User.updateOne({_id: data.friendId},{$pull:{
            friendRequests:{id:data.myId}}})


     await User.updateOne(
        {_id: data.myId},{$pull:{sentRequests:{id:data.friendId}}}        )

        

    mongoose.disconnect()
    return
}

    catch(error){
        mongoose.disconnect()
        throw new Error(error)
        }

    }

    
exports.acceptFriendRequest = async(data) => {
        //add me to friend friendRequests
        //add friend to me sendRequest
        try{

            await mongoose.connect(DB_URL)

            let newChat = new Chat({users:[data.myId,data.friendId]})
            let chatDoc =await newChat.save()

            await User.updateOne({_id: data.friendId},
               {$push:{friends:{
                name: data.myName,
                id:data.myId,
                image:data.myImage,
                chatId:chatDoc._id}}} 
             )
             await User.updateOne({_id: data.myId},
                {$push:{friends:{
                    name: data.friendName,
                    id:data.friendId,
                    image:data.friendImage,

                    chatId:chatDoc._id}}
                } 
                )
        
            mongoose.disconnect()
            return;
        
        } catch(error){
            mongoose.disconnect()
            throw new Error(error)
        }
    
        }
 
exports.rejectFriendRequest = async(data) => {
            //add me to friend friendRequests
            //add friend to me sendRequest
            try{
                await mongoose.connect(DB_URL)
                await User.updateOne({_id: data.friendId},{$pull:{friendRequests:{id:data.myId}}})
        
        
             await User.updateOne(
                {_id: data.myId},{$pull:{sentRequests:{id:data.friendId}}}        )
        
                
        
            mongoose.disconnect()
            return
        }
        
            catch(error){
                mongoose.disconnect()
                throw new Error(error)
                }
        
            }        
    
exports.deleteFriendRequest = async(data) => {
                //add me to friend friendRequests
                //add friend to me sendRequest
                try{
                    await mongoose.connect(DB_URL)
                    await User.updateOne({_id: data.friendId},{$pull:{friends:{id:data.myId}}})
            
            
                 await User.updateOne(
                    {_id: data.myId},{$pull:{friends:{id:data.friendId}}}        )
            
                    
            
                mongoose.disconnect()
                return
            }
            
                catch(error){
                    mongoose.disconnect()
                    throw new Error(error)
                    }
            
                }    


exports.getFriendRequest = async id =>{

    try{
        // console.log("ID reçu getFriendRequest:", id);

        await mongoose.connect(DB_URL);
        let data = await User.findById(id,{friendRequests:true})
        //
        console.log("getFriendRequest DATA",data);

        return data.friendRequests;

    } catch(error){
        mongoose.disconnect();
        throw new Error(error);

    }
}

exports.getFriends = async id =>{

    try{
        // console.log("ID reçu:", id); 


        await mongoose.connect(DB_URL);


        let data = await User.findById(id,{friends: true});
       
        mongoose.disconnect();
    

        return data.friends

    } catch(error){
         mongoose.disconnect();

        throw new Error(error);

    }
}















exports.User = User;

