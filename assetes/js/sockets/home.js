socket.emit('getOnlineFriends', myId)
 console.log("myId getOnlineFriends:", myId)


socket.on('onlineFriends', friends =>{
    console.log('friends:',friends)

   let div = document.getElementById('onlineFriends')
    if(friends.length ===0){
        div.innerHTML =
        ` <p class=" alert alert-danger "> No Online Friends</p>`

    }else{
        let html= `<h1>Online Friends</h1>

        <div class="row">`
        for(let friend of friends){
                console.log('friend.chatId',friend.chatId)

             html += `<div class="col col-12 col-md-6 col-lg-4">
             <img src="/${friend.image}">
             <div>

                    <a  href="/profile/${friend.id}"> <h3>${friend.name} </h3>
                    </a>

                    <a href="/chat/${friend.chatId}" class="btn"> Chat </a>

              </div>
              </div>`
        }
        html += `</div>`
        div.innerHTML =html



    }
})

