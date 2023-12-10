const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/login');
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));


const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


const collection=new mongoose.model("Collection1",LoginSchema)

module.exports=collection