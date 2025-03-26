import { resend } from "@/lib/resend";
import VerificationMail from "../../emails/verificationMail";
import { ApiResponse } from "@/types/apiresponse";



export async function sendVerificationMail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'RandomTxt Verfication Code ',
            react: VerificationMail({ username , otp: verifyCode }),
          });
        return{
            success:true,
            message:"Verification email sent"
        }
    } catch (error) {
        console.log("error sending email verification",error);
        return {
            success:false,
            message:"Failed to send verification email"
        }
    }
   
}