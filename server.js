import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import connectMongoDb from './src/config/connectDatabase.js';
import userRouter from './src/core/user/user.routes.js';
import errorHandler from './src/middleware/errorHandler.js';
import swagger from "swagger-ui-express";
import apiDocs from './swagger.js';

//======= create server by invoking express ====//
const app = express();

//======= midddleware for parsing request body and data =====//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//============ swagger documentation api===============//
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//======== any routes start with /api/users redirect to the userRoutes for handling request =====//
app.use('/api/users', userRouter);

//========= listening request for default routes ============//
app.get("/", (req,res,next)=>{
    res.redirect("/api-docs");
});

//========= error response for invalid path ===================//
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Invalid path please refer our documentaion on localhost:3200/api-docs" });
});


//===== use errorHandler middleware for handling all type of error ====//
app.use(errorHandler); 


//===== define the port and listen for port ==========//
let PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    //===== call connectMongodb() for connect database when server start listening ====//
    connectMongoDb();
});
