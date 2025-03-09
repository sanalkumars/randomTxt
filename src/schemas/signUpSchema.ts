import {z} from "zod"

export const  usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 Characters")
    .max(20,"Username must be no more than 20 Characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not include any Special Characters")


 export const signUpSchema = z.object({
    username: usernameValidation,
    email : z.string().email({message:"Invalid Email Address"}),
    password : z.string().min(6,{message:"Password should be atleat 6 characters"})
 })   