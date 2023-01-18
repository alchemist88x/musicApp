const express=require('express')
const { addMovies, getMovies }= require ('../controllers/movies-controller')
const movieRoute=express.Router()


movieRoute.get('/',getMovies)
movieRoute.post('/add_movie',addMovies)


module.exports= movieRoute;