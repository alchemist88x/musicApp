const express=require('express')
const { addBlogs, deleteBlog, gerAllBlogs, getById, getUserID, updateBlog } =require ("../controllers/blog-controller")
const blogrouter=express.Router();


blogrouter.get('/',gerAllBlogs)
blogrouter.post('/add',addBlogs) 
blogrouter.put('/update/:id',updateBlog) 
blogrouter.get('/:id',getById)
blogrouter.delete('/:id',deleteBlog)
blogrouter.get('/user/:id',getUserID)

module.exports= blogrouter