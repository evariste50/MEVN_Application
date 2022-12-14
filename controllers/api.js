const Post =  require('../models/posts')
const fs = require("fs")
module.exports = class API{

    //fetch all Post
    static async fetchAllPost(req,res){
        try {
             const posts = await Post.find()
             res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }

    //fetch post By Id
    static async fetchPostById(req,res){
        const id = req.params.id
        try {
            const post = await Post.findById(id)
            res.status(200).json(post)
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    }

    //create Post
    static async CreatePost(req,res){

        const post = req.body
        const imagename = req.file.filename;
        post.image = imagename
       try {
           await Post.create(post)
           res.status(201).json({message: "Post created Succesfully"})
       } catch (err) {
           res.status(400).json({message : err.message})         
        }
    }

    //update a Post
    static async updatePost(req,res){
       const id = req.params.id
       let new_image = ""
       if (req.file) {
            new_image = req.file.filename
            try {
                fs.unlinkSync("./uploads/"+req.body.old_image)
            } catch (err) {
                console.log(err);
            }
       }else{
        new_image = req.body.old_image
       }

       const newPost = req.body
       newPost.image = new_image

       try {
          await Post.findByIdAndUpdate(id,newPost)
          res.status(200).json({message :"Post Updated Succesfully"})
       } catch (err) {
        res.status(404).json({message:err.message})
       }
    }

     //delete a post
     static async deletePost(req,res){
        const id =  req.params.id
        console.log(id);
        try {
            const result = await Post.findByIdAndDelete(id)
            if(result.image !=''){
                try {
                    fs.unlinkSync("./uploads/"+result.image)
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({message:"Post Delete Succesfully"})
        } catch (err) {
            res.status(404).json({message:err.message})
        }
    }

}