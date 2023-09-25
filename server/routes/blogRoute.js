const express=require('express');
const { getAllBlogs,createBlog, updateBlog, deleteBlog, getBlogDetails } = require('../controllers/blogController');

const router=express.Router();

router.route('/blogs').get(getAllBlogs);
router.route('/blog/new').post(createBlog);
router.route('/blog/:id').put(updateBlog).delete(deleteBlog).get(getBlogDetails)
module.exports=router;