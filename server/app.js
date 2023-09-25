const express = require('express');
const cors=require('cors');


const app=express();


app.use(express.json());
app.use(cors({
    origin:"http://localhost:9000",
}));
//Routes Imports
const blog=require('./routes/blogRoute');

app.use('/api/v1',blog);


module.exports=app;

