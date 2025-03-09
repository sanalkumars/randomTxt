import mongoose,{ Schema , Document } from "mongoose"


export interface Message extends Document{
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


export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[];
}

export const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true, " Username is Required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        match : [/.+\@.+\..+/,'Please enter a valid Email Id']
    },
    password:{
        type:String,
        required:[true,"Email is Required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verified code is Required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verified code expiry is Required"],
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default: true,
    },
    messages:[MessageSchema]

})

// the below is for exporting the user model , before sending the user model , first cheks if the model already exists if it then returns it , else create a new one and return it
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export  default UserModel;