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
                    
                } catch (error :any) {
                    throw new Error(error)
                }
            }
        })
    ]
}