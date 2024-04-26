// nextjs edge ot run hoi mane nijor usoror jitu computing resource ase tata run hoi ru iyar kebol function bur he deploy hoi ru haibabe jatiai databse logot jorito jikunu kam koribo loga hoi tatiai iyak protibarote database connect ase ne nai check koribo lage;

import { connect } from "@/dbConfig/db.config";
import User from "@/models/users.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {email, username, password} = reqBody;

        const user = await User.findOne({ email: email})
        if (user) {
            return NextResponse.json({error:"user is already registered"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPasword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPasword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        
        const userId = savedUser._id
        // send verification email
        await sendEmail({email, emailType: 'VERIFY', userId:savedUser._id}) 

        return NextResponse.json({message:"user registered successfully", success:true, savedUser});
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message}, { status:500})
    }
}