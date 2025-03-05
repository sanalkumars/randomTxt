import mongoose,{ Schema , Document } from "mongoose"


export interface Message{
    content:string;
    createdAt:Date
}

const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
    }
})


export interface User{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    message:Message[];
}

export const UserSchema : Schema<User> = new Schema({
    
})