import connectDB from "@/lib/dbconnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";


export  const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credential",
            name: "Credential",
            credentials:{
                email: { label: "Email", type: "text " },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any) :Promise <any>{
                await connectDB();
                try {
                    // finding the user from the db
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    });

                    if(!user){
                        throw new Error("No user Found With This Email")
                    }
                    if (!user.isVerified) {
                        throw new Error ("Please Verify Your Account First")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password);
                    if (!isPasswordCorrect) {
                        throw new Error ("Incorrect Password");
                    }else{
                        return user
                    }
                } catch (error :any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        async session({session,token}) {
            return session
        },
        async jwt({ token,user}) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage=user.isAcceptingMessage
                token.username=user.username
            }
            return token
        }
    },
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET,
  
}