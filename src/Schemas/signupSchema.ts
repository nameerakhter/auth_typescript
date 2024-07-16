import { z } from "zod";

export const usernameValidation= z
.string()
.min(3,{message: "Username must be atleast 3 characters"})
.max(20,{message: "Username must not be more than 20 characters"})


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string(),
    password: z.string().min(6,{message:"Password must be atleast 6 characters"})
})