const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
//const PORT = 3000
const { mogoUrl } = require('./keys')
const port = process.env.PORT || 8003;


require('./models/User');
require('./models/userOtpVerification');

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(authRoutes)

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})



// app.get('/',requireToken,(req,res)=>{
//     res.send({phoneno:req.user.phoneno})
// })

app.get('/',(req,res)=>{
    res.send("<H1> Hello from TinderLike </H1>")
})

app.listen(port,()=>{
    console.log("server running "+port)
})