const mongoose=require('mongoose');

const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please Enter Blog Title"],
        
    },
    body:{
        type:String,
        required:[true, "Please Enter Blog body"]
    },
    userId:{
        type:Number,
        default:0
    }
});

module.exports=mongoose.model("Blog", blogSchema);