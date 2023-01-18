const express=require('express')
const { getAlluser, login, signup }= require ("../controllers/user-controller")
const router=express.Router();


router.get('/',getAlluser)
router.post("/signup",signup)
router.post("/login",login)
module.exports= router