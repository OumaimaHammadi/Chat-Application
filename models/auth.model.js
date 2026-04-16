const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const DB_URL='mongodb://127.0.0.1:27017/chat-app'

const User=require('./user.model').User


// exports.createNewUser = (username,email,password,image) =>{
//     return new Promise((resolve ,reject) =>{
//         mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
//             return User.findOne({email:email})
//         }).then(user =>{
//             if(user){
//             mongoose.disconnect()
            
//              reject ('email is used')
//         } else {
// return bcrypt.hash(password,10)
//         }

//     }).then(hashedpassword =>{
//         let user =new User ({
//             username: username,
//             email: email,
//             password: hashedpassword,
//    image: image 
//         })
//         return user.save()
//     }).then(()=>{
//         mongoose.disconnect()
//         resolve()
//     }).catch(err => 
//         {mongoose.disconnect() 
//             reject(err)    
//          }) 

//     })
 
// }


exports.createNewUser = (username,email,password,image) => {
    return mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=> User.findOne({email:email}))
    .then(user =>{
        if(user){
            throw new Error('email is used')
        }
        return bcrypt.hash(password,10)
    })
    .then(hashedpassword =>{
        let user = new User({
            username: username,
            email: email,
            password: hashedpassword,
            image: image
        })
        return user.save()
    })
}


exports.login =(email,password)=>{
    //check email
    //no ===> err
    // yes ===> check password
    // no ===> err
    //yes ===> set session

    return new Promise((resolve ,reject) =>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
            return User.findOne({email:email})
        }).then(user => {
            if(!user){
            mongoose.disconnect()
             reject ('there is no user matches this email')
        } else {
bcrypt.compare(password,user.password).then(same =>{ 
    if(!same){
        mongoose.disconnect()
        reject('password is incorrect')
    }
    else {
        mongoose.disconnect()
        resolve(user)

    }
    })
        }
    }).catch(err =>{
        mongoose.disconnect()
        reject(err)

    })

    })
}