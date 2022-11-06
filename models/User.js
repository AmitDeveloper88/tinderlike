const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// const userSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     phoneno:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

const userSchema = new mongoose.Schema({
    phoneno:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        
    },
    gender:{
        type: String,
        enum : ['men','women', ""],
    },

    First_Name:{
        type:String,
        
    },
    Last_Name:{
        type:String,
        
    },
    Date_Of_Birth:{
        type:String,
        
    },
    About_me:{
        type:String,
        
    },
    images: [],
    
    job_title:{
        type:String,
        
    },
    company:{
        type:String,
        
    },
    school:{
        type:String,
        
    },
    living_in:{
        type:String,
        
    },
    interests: [String],

    zodiac:{
        type:String,
        
    },
    personality: [String],
    pets:{
        type:Boolean,
        
    },
    enableNotification: {
        type: Boolean,
    },
    lastCompletedStep: {
        type: Number,
    }

   
})

// userSchema.pre('save',function(next){
//     const user = this;
//     if(!user.isModified('password')){
//         return next()
//     }
//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err){
//             return next(err)
//         }
//      bcrypt.hash(user.password,salt,(err,hash)=>{
//          if(err){
//              return next(err)
//          }
//          user.password = hash;
//          next()
//      })

//     })

// })


// userSchema.methods.comparePassword = function(candidatePassword) {
//     const user = this;
//     return new Promise((resolve,reject)=>{
//         bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
//             if(err){
//                 return reject(err)
//             }
//             if (!isMatch){
//                 return reject(err)
//             }
//             resolve(true)
//         })
//     })

// }

mongoose.model('User',userSchema);