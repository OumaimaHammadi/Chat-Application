
const chatId =document.getElementById('chatId').value
const msg = document.getElementById('message')
const sendBtn =document.getElementById('sendBtn')
const callBtn =document.getElementById('callBtn')
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


let peer =new Peer()
let peerId =null
peer.on('open',id=>{
    console.log('my id',id)
    peerId =id
})

callBtn.onclick=()=>{
    socket.emit('requestPeerId',chatId)
}

socket.on('getPeerId',()=>{
    socket.emit('sendPeerId',{chatId:chatId,peerId:peerId})
})

socket.on('receivedPeerId',id=>{
    console.log('receivedPeerId',id)
    navigator.mediaDevices.getUserMedia({
        audio:true,video:true

    }).then(stream=>{
        let call = peer.call(id,stream)
        call.on('stream',showvideocall)


         

    }).catch(err=>{
        console.log(err)
    })
})

peer.on('call',call=>{
    navigator.mediaDevices.getUserMedia({
        audio:true,video:true

    }).then(stream=>{
        call.answer(stream)
        call.on('stream',showvideocall)
             

    }).catch(err=>{
        console.log(err)
    })

})
function showvideocall(stream){
    let video =document.createElement('video')
    video.srcObject=stream
    document.body.append(video)
    video.play()
}