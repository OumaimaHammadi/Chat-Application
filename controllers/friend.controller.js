const userModel = require('../models/user.model')




// exports.add =(req,res,next) => {
  

//     userModel.sendFriendRequest(req.body).then(() =>{
//         res.redirect('/profile/'+ req.body.friendId)

//     })

//     .catch(err =>{
//         res.redirect('/error')
//     })

    
// }


exports.accept =(req,res,next) => {
  

    userModel.acceptFriendRequest(req.body).then(() =>{
        res.redirect('/profile/'+req.body.friendId)

    })

    .catch(err =>{
        res.redirect('/error')
    })

    
}


exports.cancel =(req,res,next) => {
  

    userModel.cancelFriendRequest(req.body).then(() =>{
        res.redirect('/profile/'+req.body.friendId)

    })

    .catch(err =>{
        //res.redirect('/error')
        res.redirect('/')

    })

    
}


exports.reject =(req,res,next) => {
  

    userModel.rejectFriendRequest(req.body).then(() =>{
        res.redirect('/profile/'+req.body.friendId)

    })

    .catch(err =>{
        res.redirect('/')

    })

    
}


exports.delete =(req,res,next) => {
  

    userModel.deleteFriendRequest(req.body).then(() =>{
        res.redirect('/profile/'+req.body.friendId)

    })

    .catch(err =>{
        res.redirect('/')

    })

    
}

// exports.getFriends = (req, res, next) => {
//     userModel.getFriendsList(id)
//     .then((friends) => {
//         res.render('friends', {
//             friends:friends
//         })
//     })
//     console.log('friends list:',friends)
//     .catch(err => {
//         res.redirect('/error')
//     })
// }




exports.getFriends = (req, res, next) => {
    userModel.getFriends(req.session.userId)
    .then((friends) => {
         console.log('friends list',friends)
         console.log('UserName',UserName)

        res.render('friends', {
            pageTitle:'Friends',
            friends: friends,
            isUser: req.session.userId,
            friendRequests :req.friendRequests,
            UserName :req.session.name,
            UserImage :req.session.image
        })

    })
    .catch(err => {
        res.redirect('/error')
    })
}

exports.getCreateGroupe=(req,res,next)=>{
      userModel.getFriends(req.session.userId)
    .then((friends) => {
         console.log('friends list',friends)

    res.render('CreateGroup',{
        pageTitle:'Create Group',
        friends: friends,


    isUser: req.session.userId ,
    friendRequests :req.friendRequests,

    UserName :req.session.name,
    UserImage :req.session.image

    })
    })
    .catch(err => {
        res.redirect('/error')
    })
}



const groupModel = require('../models/group.model')



const validationResult =require('express-validator').validationResult




exports.postAdd=(req,res,next)=>{
    //console.log(validationResult(req).array())//
    //if(validationResult(req).isEmpty()){
        groupModel.editImage({
           name: req.body.name,
           members: req.body.members,
         admin: req.session.userId,
            image: req.file ? req.file.filename : "default-group.jpg",
        })
        .then(() => res.redirect('/groups')) 
        .catch(err =>{
            res.redirect('/error')
            next(err)
            
            console.log(err)
    
        } )
        
    // } else {
    // req.flash('validationErrors',
    // validationResult(req).array())
    // res.redirect('/friends/CreateGroup') 
    // }     
}