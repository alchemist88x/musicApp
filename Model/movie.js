const mongoose=require('mongoose')
const schema=mongoose.Schema;

const movieSchema=new schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

})

module.exports=mongoose.model("Movies",movieSchema)