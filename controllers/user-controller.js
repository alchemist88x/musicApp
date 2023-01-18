const User= require('../Model/User')
const bcrypt=require('bcryptjs')

const getAlluser=async(req,res,next)=>{
    let users;
    try {
        users=await User.find()
    } catch (error) {
        console.log(error)
    }
    if(!users){
        return res.status(404).json({message:"No users Found"})
    }
    res.status(200).json({users})
}

const signup=async(req,res,next)=>{
    const {user_name,email,password}=req.body
    console.log(req.body)
    let existinguser;
    try {
        existinguser=await User.findOne({email})
        if(existinguser){
        return res.status(400).json({message:"user already exisist"})
        }
    } catch (error) {
         console.log(error)
        return res.json({
            status: false,
            message: "Sorry Something went wrong"
        })
    }
    const handlePassword=bcrypt.hashSync(password)
    const user=new User({
        name:user_name,
        email:email,
        password:handlePassword,
        blogs:[],
    })
  
    try {
        await user.save()
        return res.json({
            status: true,
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: "Sorry Something went wrong"
        })
    }
}

const login=async(req,res,next)=>{
    const {email,password}=req.body
    let existinguser;
    try {
        existinguser=await User.findOne({email})
    } catch (error) {
        
    }
    if(!existinguser){
     return res.status(404).json({message:"Couldnt find user by this email"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existinguser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ status: false,message:"incorrect password"})
        }
        return res.status(200).json({ status: true,message:"Login Successfull"})
}

module.exports={getAlluser,signup,login}