import "next-auth";

declare module "next-auth"{
    interface User{
        _id?:string;
        username:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean;
    }
}