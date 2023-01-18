const mongoose=require('mongoose')
const Blog=require('../Model/Blog')
const User=require('../Model/User')

const gerAllBlogs=async(req,res,next)=>{
    let blogs;

    try {
        blogs=await Blog.find()
    } catch (error) {
        console.log(error)
    }
    if(!blogs){
        return res.status(404).json({status:false,message:"no blog found"})
    }
    return res.status(200).json({blogs})

}

const addBlogs=async(req,res,next)=>{
    const {title,description,image,user}=req.body;

    console.log(req.body)
    let existinguser;
    try {
        existinguser=await User.findById(user)
    } catch (error) {
        return console.log(error)
    }

    if(!existinguser){
        res.status(400).json({message:"unable to Find user"})
    }

    const blog=Blog({
        title:title,
        description:description,
        image:image,
        user:user
    });
    try {
       
        const session=await mongoose.startSession();
        session.startTransaction();
        await  blog.save({session});
        existinguser.blogs.push(blog)
        await existinguser.save({session})
        await session.commitTransaction()
        
        return res.status(200).json({
            status:true,
            data:blog
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
   
}

 const updateBlog=async(req,res,next)=>{
    const {title,description}=req.body;
    const blogId=req.params.id;

    let blog;
    try {
      blog=await Blog.findByIdAndUpdate(blogId,{
            title:title,
            description:description, 
        })

    } catch (error) {
        console.log(error)
    }

    
    if(!blog){
        return res.status(500).json({message:"unable to update blog"})
    }
    return res.status(200).json({blog})
}

const getById=async(req,res,next)=>{
    const id=req.params.id;

    let blog;
    try {
      blog=await Blog.findById(id)

    } catch (error) {
        console.log(error)
    }

    if(!blog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blog})
}


const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;
    
    let blog;
    try {
        blog =await Blog.findByIdAndRemove(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        console.log(error)
    }
    if(!blog){
        return res.status(400).json({message:"unable to delete blog"})
    }
    return res.status(200).json({message:"successfully deleted"})
}

const getUserID=async(req,res,next)=>{
    const userId=req.params.id;
    let userBlog;
    try {
        userBlog =await User.findById(userId).populate('blogs')
    } catch (error) {
        console.log(error)
    }
    if(!userBlog){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blogs:userBlog})
}

module.exports={gerAllBlogs,addBlogs,updateBlog,getById,deleteBlog,getUserID}