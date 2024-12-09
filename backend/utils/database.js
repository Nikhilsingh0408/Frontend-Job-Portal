import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

const databaseConnection = () => {
    //console.log(process.env.MONGO_URL);
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("mongoDB connected successfully");
    }).catch((error)=>{
        console.log(error);
    })
}

export default databaseConnection;