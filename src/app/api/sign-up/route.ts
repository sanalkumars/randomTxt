import connectDB from "@/lib/dbconnect";
import UserModel from "@/models/User";

import { sendVerificationMail } from "@/helpers/sendEmailVerification";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await connectDB();

    try {
        // always use await for getting values from teh request in nextJS
        const { email, username, password } = await request.json();
        //    fits we check if the username + email already exists and is already verified

        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });
        if (existingVerifiedUserByUsername) {
            return Response.json({
                success: false,
                message: "User Name  Already Taken"
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({
            email
        });

        // creating the verifycode(OTP)
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            // todo to complete this later
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User alredy exists with this email"
                }, {
                    status: 400
                })
            }else{
                const hashedPass = await bcrypt.hash( password , 10);
                existingUserByEmail.password = hashedPass;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        } else {
            // this is where we will create the new user 
            const hashedPass = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            // the expiry time will be one hour 
            expiryDate.setHours(expiryDate.getHours() + 1);

            // creating new user
          const newUser =   new UserModel({
                username,
                email,
                password: hashedPass,
                verifyCode,
                verifyCodeExpiry:expiryDate ,
                isVerified : false,
                isAcceptingMessage: true,
                messages: [] 
            })
            await newUser.save();
        }

        const emailResponse = await sendVerificationMail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            })
        }
// if the mail is send successfully then below response is send
        return Response.json({
            success: true,
            message: "User Registered Successfully , Please verify your email"
        }, {
            status: 201
        })

    } catch (error) {
        console.log("error occured during signup", error);
        return Response.json({
            success: false,
            message: "Error registering User"
        }, {
            status: 500
        }
        )
    }

}
