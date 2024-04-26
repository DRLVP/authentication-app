import { connect } from "@/dbConfig/db.config";
import User from "@/models/users.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log("here is the request body in login page::",reqBody);
        const {email, password} = reqBody;

        const user:any = await User.findOne({email});

        if (!user) {
            return NextResponse.json({error: "user not found"}, {status:400});      
        }

        console.log("user get sucessfully::", user);

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "incorrect password"}, {status:400});      
        }
        console.log("password is valid and the password is::", validPassword);
        
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRECT!, {expiresIn:"1d"});

        const response = NextResponse.json({
            message:"user login successfully",
            success:true
        })
        console.log("this is the response::", response);
        
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;
    } catch (error:any) {
        console.log("Error in login route:", error);
        return NextResponse.json({error: error.message}, {status:500});
    }
}