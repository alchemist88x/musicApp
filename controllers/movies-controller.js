const mongoose=require('mongoose')
const Movie=require ("../Model/movie")

 const getMovies=async(req,res,next)=>{
    let movies;

    try {
        movies=await Movie.find()
         return res.status(200).json({movies})
    } catch (error) {
        console.log(error)
    }
    if(!movies){
        return res.status(404).json({
            status:false,
            message:"no movies found"
        })
    }
   
}

const addMovies=async(req,res,next)=>{
    const {movie_name,movie_des}=req.body
    console.log(req.body)

    const movie=Movie({
        name:movie_name,
        description:movie_des
    })

    try {
        await movie.save()
        return res.status(200).json({
            status:true,
            data:movie
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }

}
module.exports={addMovies,getMovies}