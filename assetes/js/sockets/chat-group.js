 const groupId =document.getElementById('groupId').value
 const msg = document.getElementById('message')
 const sendBtn =document.getElementById('sendBtn')

 const msgContainer =document.getElementById('messages-container')

 socket.emit('joinChat',groupId)




 sendBtn.onclick=()=>{

      let content = msg.value.trim()
     if (!content) return

     socket.emit('sendMessageGroup',{
         group:groupId,
         content:content,
         sender:myId

     },()=>{msg.value=''})
 }




//  socket.on('newMessageGroup', msg => {

//      const isMe = msg.sender === myId

//      msgContainer.innerHTML += `
//          <div class="msg ${isMe ? 'me' : 'friend'}">
//              <div class="bubble">
//                  ${msg.content}
//              </div>
//          </div>
//      `
//      console.log('msg :', msg)
//      console.log('isMe:',isMe)
//      console.log('myId', myId)
//      console.log('msgContainer ',msgContainer )


//      msgContainer.scrollTop = msgContainer.scrollHeight
//  })




socket.on('newMessageGroup', msg => {

    const isMe = msg.sender._id === myId

    msgContainer.innerHTML += `
        <div class="msg ${isMe ? 'me' : 'friend'}">
            
            ${!isMe ? `
                <div class="sender-info">
                    <img src="/${msg.sender.image}" class="avatar"/>
                    <span>${msg.sender.username}</span>
                </div>
            ` : ''}

            <div class="bubble">
                ${msg.content}
            </div>
        </div>
    `

    msgContainer.scrollTop = msgContainer.scrollHeight
})