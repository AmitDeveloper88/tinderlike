const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const userOtpVerification = mongoose.model('userOtpVerification');
const upload = require('../middleware/upload')
const requireToken = require('../middleware/requireToken') 

// const otpFour = `${Math.floor(1000 + Math.random() * 9000)}`;

// router.post('/signup',async (req,res)=>{

//     const {email,password} = req.body;

//     try{
//       const user = new User({email,password});
//       await  user.save();
//       const token = jwt.sign({userId:user._id},jwtkey)
//       res.send({token})

//     }catch(err){
//       return res.status(422).send(err.message)
//     }


// })

router.post('/api/signup', async (req, res) => {

  const { phoneno } = req.body;

  if (!phoneno) {
    return res.status(422).send({ error: "must provide phone" })
  }

  const user = await User.findOne({ phoneno })

  if (user) {
    return res.status(422).send({ error: "User Already Exist Please Log In !" })
  } else {
  const otpFour = `${Math.floor(1000 + Math.random() * 9000)}`;
  const { phoneno } = req.body
  let obj = {
    "phoneno": phoneno,
    "otp": otpFour,
    "createdAt": Date.now(),
    "expiresAt": Date.now() + 60000,
    
  }
  if (!phoneno) {
    return res.status(422).send({ error: "must provide phone" })
  }
  const user = await userOtpVerification.findOne({ phoneno })

  if (user) {
    user.otp = otpFour
    user.createdAt = Date.now()
    user.expiresAt = Date.now() + 60000
    await user.save();
    return res.status(422).send(user)
  } else {
    const user = new userOtpVerification(obj);
    await user.save();
    return res.status(422).send(user)
  }
    // return res.status(422).send({ otp: "1234", error: "no error" })
  }

})

router.post('/api/verifyotp', async (req, res) => {
  const { phoneno, otp } = req.body;
  let obj = {
    "phoneno": phoneno,
    "email": "",
    "First_Name": "",
    "Last_Name": "",
    "gender": "",
    "image": [],
    "Date_Of_Birth": "",
    "About_me": "",
    "job_title": "",
    "company": "",
    "school": "",
    "living_in": "",
    "interests": [],
    "zodiac": "",
    "personality": [],
    "pets": true
  }

  const otpUser = await userOtpVerification.findOne({ phoneno })
  
  if (otpUser) {
          if (otp == otpUser.otp) {
          try {
            const user = await User.findOne({ phoneno })
                    if (user) {
                          const token = jwt.sign({ userId: user._id }, jwtkey)
                          return res.send({ token, user })
                        } else {
                            const user = new User(obj);
                            await user.save();
                            const token = jwt.sign({ userId: user._id }, jwtkey)
                            return res.send({ token, user })

                          }

                  } catch (err) {
                    return res.status(422).send({ error: "Something went wrong" })
                  }
        } else {
          return res.status(422).send({ error: "The OTP entered is incorrect." })
        }
  }
  
})

router.post('/api/resendOtp', async (req, res) => {
  const otpFour = `${Math.floor(1000 + Math.random() * 9000)}`;
  //console.warn("OTP", otpFour)
  const { phoneno } = req.body
  let obj = {
    "phoneno": phoneno,
    "otp": otpFour,
    "createdAt": Date.now(),
    "expiresAt": Date.now() + 60000,
    
  }
  if (!phoneno) {
    return res.status(422).send({ error: "must provide phone" })
  }
  const user = await userOtpVerification.findOne({ phoneno })

  if (user) {
    user.otp = otpFour
    user.createdAt = Date.now()
    user.expiresAt = Date.now() + 60000
    await user.save();
    return res.status(422).send(user)
  } else {
    const user = new userOtpVerification(obj);
    await user.save();
    return res.status(422).send(user)
  }

})



// router.post('/signin',async (req,res)=>{
//     const {email,password} = req.body
//     if(!email || !password){
//         return res.status(422).send({error :"must provide email or password"})
//     }
//     const user = await User.findOne({email})
//     if(!user){
//         return res.status(422).send({error :"must provide email or password"})
//     }
//     try{
//       await user.comparePassword(password);    
//       const token = jwt.sign({userId:user._id},jwtkey)
//       res.send({token})
//     }catch(err){
//         return res.status(422).send({error :"must provide email or password"})
//     }



// })



router.post('/api/signin', async (req, res) => {
  const otpFour = `${Math.floor(1000 + Math.random() * 9000)}`;
  const { phoneno } = req.body

  if (!phoneno) {
    return res.status(422).send({ error: "must provide phone" })
  }
  const user = await User.findOne({ phoneno })
  if (user) {
    const userOtp = await userOtpVerification.findOne({ phoneno })
    user.otp = otpFour
    user.createdAt = Date.now()
    user.expiresAt = Date.now() + 60000
    try {
      await userOtp.save();
      return res.send(userOtp)
    }catch(err){
       return res.status(422).send({error :"Something Went Wrong"})
    }
  } else {
    return res.status(422).send({ error: "Phone number not found please sign up?" })
  }

})

//update the document
router.post('/api/profileupdate', upload.single('images'), async (req, res) => {
  const {phoneno, email, gender, image, First_Name, Last_Name, Date_Of_Birth, About_me, job_title, company, school, living_in, interests, zodiac, personality, pets} = req.body;

  //const { phoneno, First_Name, Last_Name } = req.body;
  const user = await User.findOne({ phoneno })
  
  if (user) {
    try {
      if (req.body.First_Name) {
        user.First_Name = req.body.First_Name
      }
      if (req.body.Last_Name) {
        user.Last_Name = req.body.Last_Name
      }
      if (req.body.gender) {
        user.gender = req.body.gender
      }
      if (req.body.interests) {
        user.interests = req.body.interests
      }
      // if (req.body.images) {
      //   user.images = req.body.images
      // }
      if (req.file) {
        user.images = { "index": "0", "imagepath": req.file.path }
      }
      const result = await user.save()
      res.send(result)
    } catch (err) {
      res.status(404)
      res.send({ error: err.message })
    }
  } else {
    res.send({ error: "User doesn't exist!!!" })
  }

})

router.get('/api/getMyProfile', requireToken, (req, res) => {
    res.send( req.user)
})

router.post('/api/getOthersProfile', async (req, res) => {
  const { phoneno } = req.body;

  if (!phoneno) {
    return res.status(422).send({ error: "must provide phone" })
  }

  const user = await User.findOne({ phoneno })

  if (user) {
    return res.status(422).send(user)
  } else {
    return res.status(422).send({ error: "Something went wrong" })
  }
  

})


module.exports = router