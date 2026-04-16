const chatId =document.getElementById('chatId').value
const msg = document.getElementById('message')
const sendBtn =document.getElementById('sendBtn')

const msgContainer =document.getElementById('messages-container')

socket.emit('joinChat',chatId)

sendBtn.onclick=()=>{

     let content = msg.value.trim()
    if (!content) return

    socket.emit('sendMessage',{
        chat:chatId,
        content:content,
        sender:myId

    },()=>{msg.value=''})
}


// socket.on('newMessage',msg=>{
//     msgContainer.innerHTML+=msg.content
//     console.log('msg :', msg)
// })

socket.on('newMessage', msg => {

    const isMe = msg.sender === myId

    msgContainer.innerHTML +=`
        <div class="msg ${isMe ? 'sent' : 'received'}">
            <div class="bubble">
                ${msg.content}
            </div>
        </div>
    `
    console.log('msg :', msg)
    console.log('isMe:',isMe)
    console.log('myId', myId)
    console.log('msgContainer ',msgContainer )
    console.log('msg.sender._id === myId',msg.sender._id === myId)


    msgContainer.scrollTop = msgContainer.scrollHeight
})