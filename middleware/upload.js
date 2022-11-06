const path = require('path')
const multer = require('multer')


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //let ext = path.extname(file.origination)
        let ext = ".png"
        cb(null, Date.now() + ext)
    }
})

let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            if (
                file.mimetype == "image/png"  
            ) {
                callback(null, true)
            } else {
                console.log("only png file suppported")
                callback(null, false)
            }
        },
        limits: {
            fileSize: 1024 * 1024 * 2
        }

    })


module.exports = upload