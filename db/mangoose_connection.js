import mongoose from "mongoose";


const connectionToDb=async=>{
    try{
    const conn=mongoose.connect('mongodb://localhost:27017/mangosse',
    {useNewUrlParser: true,});
    console.log("DB connected ");
}catch(err){
    console.log(err);
    process.exit(1);
}
}


export default connectionToDb;
