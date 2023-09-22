import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env);

const userNAme=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const clusterName=process.env.DB_CLUSTERNAME;
const dbName=process.env.DB_NAME;
const cloudMogoUrl=`mongodb+srv://${userNAme}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;
const localmongoUrl="mongodb://localhost:27017/mangosse";

const connectionToDb=async=>{
    try{
    const conn=mongoose.connect(cloudMogoUrl,
    {useNewUrlParser: true,});
    console.log("DB connected ");
}catch(err){
    console.log(err);
    process.exit(1);
}
}


export default connectionToDb;
