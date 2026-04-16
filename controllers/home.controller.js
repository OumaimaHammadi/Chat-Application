

exports.getHome = (req,res,next) => {

  res.render('index',{
      pageTitle:'Home',

    isUser: req.session.userId ,
    friendRequests :req.friendRequests,

    UserName :req.session.name,
    UserImage :req.session.image


     
   

    }) 

}  



  

    

    


 
