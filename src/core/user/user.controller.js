import UserRepository from './user.repository.js';
import jwt from "jsonwebtoken";

//========= a controller class contains methods for communicate between repository and userRoutes ====//
export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    //========= user signup controller =====//
    async signup(req, res, next) {
        try {

            //====== call userRepository by passing userData form req.body ===//
            const result = await this.userRepository.signup(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    }

    async confirmEmail(req, res, next) {
        try {

            //==== get jwtTorkn from req.params and call confirmEmail for confirmation of email for signup sucess===//
            const result = await this.userRepository.confirmEmail(req.params.token);
            res.status(200).json(result);
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    }


    //========= user signin controler =======//
    async signin(req,res,next){
        try{
            const userData = req.body;
            const result = await this.userRepository.signin(userData);
            if(result?.success){
                //==== generate jwtToken and send in response ====//
                const token = jwt.sign(
                    {email:result.user.email, userId:result.user._id},
                    process.env.JWT_SECRET,{expiresIn:"3h"});

                res.status(200).json({result, token});

            }

        }catch(error){
            next(error); // Pass the error to the next middleware
        }
    }

    //======= get user profile controller=======//
    async getUserProfile(req,res,next){
        try{
            //==== fetch userId from request ====//
            const userId = req.userId;
            console.log("userId in controller: ", userId);

            //==== call getUserProfile to get user
            const result = await this.userRepository.getUserProfile(userId);
            if(result.success){
                return res.status(200).json(result);
            }
        }catch(error){
            next(error); // Pass the error to the next middleware
        }
    }
}
