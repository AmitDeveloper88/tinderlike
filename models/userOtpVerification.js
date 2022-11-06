const mongoose = require('mongoose');
const userOtpVerificationSchema = new mongoose.Schema({
    phoneno:{
        type: String,
        unique:true,
        required:true
    },
    otp:{
        type:String,
    },
    createdAt: Date,
    expiresAt: Date
})

mongoose.model('userOtpVerification',userOtpVerificationSchema);