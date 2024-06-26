import { connect } from "@/dbConfig/db.config";
import User from "@/models/users.model";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/jwtToken";


connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        // console.log("here is the user in me", user);
        
        const response = NextResponse.json({
            message:"user found",
            data:user
        });
        // console.log("here is the response", response);
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:400});
    }
}