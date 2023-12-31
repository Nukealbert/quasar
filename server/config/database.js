const mongoose=require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/blogs',{useNewUrlParser:true,useUnifiedTopology:true,
        }).then((data)=>{
            console.log(`Mongodb Connected with server ${data.connection.host}`);
        }).catch((err)=>{
            console.log(err);
        });
};

module.exports=connectDatabase;