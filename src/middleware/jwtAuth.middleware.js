import jwt from "jsonwebtoken";
import { CustomError } from "../utils/errors.js";

//======= middleware to verify jwtToken and give authorization access ======//
export default async function auth(req, res, next) {
    try {

        //===== get token from request header
        const token = req.headers.authorization;
        //console.log("token", token);

        //===== if no authorization token then throw error
        if (!token) {
            throw new CustomError("Unauthorized! Token not found!", 401);
        }

        //===== verify toekn if there token
         jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                throw new CustomError("UnAuthorized access! invalid token", 404);
            }else{
                //=== set userId in request ====//
                req.userId = decoded.userId;
                next()
            }

        });
       
    } catch (error) {
        next(error);
       
    }
}
