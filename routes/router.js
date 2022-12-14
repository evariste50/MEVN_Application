const express = require('express')

const router = express.Router()
const API = require("../controllers/api")

const multer = require("multer")


//multer middleware

let storages = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename :(req,file,cb)=>{
        cb(null,file.filename + "_" + Date.now()+"_" + file.originalname)
    }
})

let upload = multer({
    storage:storages
}).single("image")

router.get('/', API.fetchAllPost)
router.get('/:id', API.fetchPostById)
router.post('/',upload, API.CreatePost)
router.patch('/:id',upload, API.updatePost)
router.get('/:id', API.deletePost)

module.exports = router