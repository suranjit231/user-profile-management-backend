import mongoose from "mongoose";

//============ function for connect database using mongoose =====================//
const connectMongoDb = async()=>{
    try{

        const url = process.env.DB_URL+"userManagement" ;
        await mongoose.connect(url, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log("mongodb is connected...");

    }catch(error){
        console.log("falid to connect database!");
    }
   
};

export default connectMongoDb;