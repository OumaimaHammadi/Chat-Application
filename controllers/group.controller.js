const groupModel = require('../models/group.model')
const messageModel= require('../models/message.model')



exports.getGroup = (req, res, next) => {
    groupModel.getGroup(req.session.userId)
    .then((groups) => {
         console.log('groups list',groups)

        res.render('group', {
            pageTitle:'Groups',
            groups: groups,
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
















// exports.getChatGroup = (req, res, next) => {

//   let groupId =req.params.id
//   messageModel.getGroupMessages(groupId)
//   .then(messages=>{
    

    
//     res.send(messages)
// })
// }


exports.getChatGroup = (req, res, next) => {
    let groupId = req.params.id;

     messageModel.getGroupMessages(groupId)
 .then(messages=>{
    

    
 groupModel.getchatGroup(groupId)
        .then(groupData => {

  
            res.render('chatGroupe', {
                pageTitle: groupData.name,
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                UserName: req.session.name,
                UserImage: req.session.image,
                messages: messages,
                groupData: groupData,
                groupId: groupId
            });

        });
        
         })

        

   
};