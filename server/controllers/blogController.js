const Blog=require('../models/blogModel');

// Create Blog 
exports.createBlog= async(req,res)=>{
    const blog=await Blog.create(req.body)
    res.status(201).json({
        success:true,
        message:"Blog Post Created SuccessFully",
        blog
    })

};
//Get Blog details
exports.getBlogDetails=async(req,res)=>{
    let blog=await Blog.findById(req.params.id);
    if(!blog){
        res.status(500).json({success:false, message:"BLOG Not found"})
    }
    res.status(200).json({
        success:true,
        blog
    })

}

// Update Blog
exports.updateBlog=async(req,res)=>{
    let blog=await Blog.findById(req.params.id);
    if(!blog){
        res.status(500).json({success:false, message:"BLOG Not found"})
    }
    blog=await Blog.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        blog
    })
};

// delete blog
exports.deleteBlog=async(req,res)=>{
    let blog=await Blog.findById(req.params.id);
    if(!blog){
        res.status(500).json({success:false, message:"BLOG Not found"})
    }
    await blog.remove();
    res.status(200).json({
        success:true,
        message:"Blog deleted successfully"
    })

}

exports.getAllBlogs=async(req,res)=>{
    const blogs=await Blog.find()
    res.status(200).json({success:true,blogs})
}