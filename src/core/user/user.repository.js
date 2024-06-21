import mongoose from "mongoose";
import userModel from "./userSchema.js";
import sendConfirmationEmail from "../../utils/sendConfirmationMail.js";
import { handleErrors } from "../../utils/handleError.js";
import { CustomError } from "../../utils/errors.js";
import jwt from "jsonwebtoken";


//========== repository class for contains methods related to user database operation =========//
export default class UserRepository {

    //========== user signup methods ====================//
    async signup(userData) {
        try {
            if (!userData?.username || !userData?.email || !userData?.password) {
                throw new CustomError("User data can't be empty", 400);
            }

            const newUser = new userModel(userData);
            const savedUser = await newUser.save();

            //============= generate jwtToken for email confirmation and call send confirmation mail for rending email==//
            const token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const confirmationLink = `${process.env.CLIENT_URL}/api/users/confirm/${token}`;
            await sendConfirmationEmail(savedUser.email, savedUser.username, confirmationLink);

            //========= after sending email send response back to the controller ======//
            return { success: true, message: "User registered successfully. Please check your email for confirmation." };
        } catch (error) {
            //===== call error handler for assign appropriate error class =====//
            handleErrors(error);
        }
    }


    //============== methods for confirmation email for user signup =============//
    async confirmEmail(token) {
        try {

            //======= verify the jwt token and find the user ========//
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findOne({ email: decoded.email });

            if (!user) {
                throw new CustomError("Invalid token or user not found", 400);
            }

            //======= if user is found then update user confirmed status to true =======//
            user.confirmed = true;
            user.skipValidationOnSave(); //--- Skip validation on save
            await user.save({ validateBeforeSave: false }); //--- Pass validateBeforeSave: false pass the test case of password validation--//

            return { success: true, message: "Email confirmed successfully." };
        } catch (error) {
             //===== call error handler for assign appropriate error class =====//
           
            handleErrors(error);
        }
    }


    //===================== user signin function==================================//
    async signin(userData){
        try{
            if(!userData?.email){
                throw new CustomError("email is missing!", 400);
            }

            if(!userData?.password){
                throw new CustomError("Password is missing!", 400);
            }

            //======= find user through email ======//
            const user = await userModel.findOne({email:userData.email});
            if(!user){
                throw new CustomError("Invalid email ID!", 400);
            }

            //======= check is user password is correct and compared password is defined in user schema methds ===//
            const isCorrectPassword = await user.comparePassword(userData.password);
            if(isCorrectPassword){

                //==== sends sucess response with user after removing password ===//
                const userWithoutPassword = this.removePassword(user);
                return {success:true, message:"User login sucessful!", user:userWithoutPassword};
            }else{
                throw new CustomError("Invalid password!", 400);
            }

        }catch(error){
             //===== call error handler for assign appropriate error class =====//
            
            handleErrors(error);
        }
    }


    //========= get user profile based on user id ===========================//
   async getUserProfile(userId){
        try{
            const user = await userModel.findById(userId);
            if(!user){
                throw new CustomError("User not found!", 404);
            }
            
            return {success:true, message:"user profile fetch sucessfully!", user:this.removePassword(user)};

        }catch(error){
            handleErrors(error);
        }
    }

    //======== a utility function for removing password from user while sending user as a response ===//
    removePassword(user){
        const {password, ...userData} = user.toObject();

        return userData;
    }
}
