module.exports = io =>{
io.on("connection",socket =>{



    socket.on('joinNotificationsRoom',id =>{
        socket.join(id)
        console.log("joined ",id)
    })


    socket.on('goOnline',id =>{
        io.onLineUsers[id] = true
        console.log('goOnline',io.onLineUsers)
        socket.on('disconnect',()=>{
            io.onLineUsers[id] = false
            console.log('disconnect init socket',io.onLineUsers)



        })
    })

})


    
}