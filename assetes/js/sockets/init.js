const socket =io()
const btn =document.getElementById("friendRequestsDropdown")
let  myId =document.getElementById("userId").value




socket.on("connect",() =>{
    socket.emit('joinNotificationsRoom', myId)
    socket.emit('goOnline', myId)
    socket.emit('getOnlineFriends', myId)



    console.log("connect")
    console.log("myId:",myId)
    console.log('getOnlineFriends', myId)

})


socket.on("newFriendRequest",data =>{
    //console.log(data)
    const friendRequests = document.getElementById("friendRequests")
    friendRequests.innerHTML +=`<a class="dropdown-item" href="/profile/${data.id}">${data.name}</a>`

    const span =friendRequests.querySelector("span")
    if(span) span.remove()


    btn.classList.remove('btn-primary')
    btn.classList.add('btn-danger')    
})

btn.onclick=()=>{
    btn.classList.remove('btn-danger')
    btn.classList.add('btn-primary')

}



