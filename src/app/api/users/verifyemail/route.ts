import { connect } from "@/dbConfig/db.config";
import User from "@/models/users.model";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("token from request body:"+ token);

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status:400});   
        }
        console.log("user from the database:: " + user);
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({
            message: "User verified successfully",
            success: true,
            user
        }, {status:500});

    } catch (error:any) {
        console.log("error in verify email method::", error);
        return NextResponse.json({error: error.message}, {status:500});
    }
}

