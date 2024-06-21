import express from "express";
import UserController from "./user.controller.js";
import auth from "../../middleware/jwtAuth.middleware.js";

//======== router for handling user profile related request =====//
const userRouter = express.Router();
const userController = new UserController();


//======== receives request for signup and call user signup methods by passing req,res,next ======//
userRouter.post("/signup", (req, res, next) => {
    userController.signup(req, res, next);
});

//======== receives request for confirm and  call user confirmEmail receives token in request params ====//
userRouter.get("/confirm/:token", (req, res, next) => {
    userController.confirmEmail(req, res, next);
});


//======== receives request for signin can call signin in controller =======//
userRouter.post("/signin", (req,res,next)=>{
    userController.signin(req,res,next);
});


//======== get userprofile based on jwt token =========//
userRouter.get("/profile", auth, (req,res,next)=>{
   userController.getUserProfile(req,res,next);
})

export default userRouter;
