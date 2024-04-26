import { connect } from "@/dbConfig/db.config";
import { NextResponse, NextRequest } from "next/server";


connect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message:"logout sucessfully",
            success: true,
        })

        response.cookies.set("token","", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
        }, {status:500})
    }
}