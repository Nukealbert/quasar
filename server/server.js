const app=require('./app');
const connectData=require('./config/database');

// connecting database
connectData();

app.listen(8000, ()=>{
    console.log("Server is running on port 6000")
})