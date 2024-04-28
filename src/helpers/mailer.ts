import User from '@/models/users.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{ 
                $set:{
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000
                }});
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set:{
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }});
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "10b9aa3e537486",
              pass: "1319ffb0662f6e"
            }
          });
        
        const mailOptions = {
            from: "demo@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "verify your email":"reset your password" ,
            html: `<p>please verify your email address <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">click here</a> to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        console.log("failed to send email", error);
    }
}