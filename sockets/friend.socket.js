const {sendFriendRequest,getFriends} = require('../models/user.model')





module.exports=(io)=>{
    io.on('connection',socket=>{
        socket.on('sendFriendRequest',data =>{
        
                            console.log("sendFriendRequest:", data);

            sendFriendRequest(data).then(()=>{
                socket.emit('requestSent')
                io.to(data.friendId).emit('newFriendRequest',{
                    name:data.myName,
                    id:data.myId


                })

            }).catch(err =>{
                socket.emit('request Failed')
            })
    
        })

        socket.on('getOnlineFriends', id => {
                //console.log("ID reçu côté serveur:", id);

                getFriends(id).then(friends => {

                    let onlineFriends = friends.filter(friend =>
                            io.onLineUsers[friend.id]

                       

                    );
                    //console.log("Friends:", friends)

                    //console.log("OnlineFriends", onlineFriends);

                    socket.emit('onlineFriends', onlineFriends);
                })
                .catch(err => {
                    console.log("Erreur getOnlineFriends:", err);
                });
            });




   



  



       })
}
