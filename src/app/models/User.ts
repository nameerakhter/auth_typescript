import mongoose, { Schema } from 'mongoose'

export interface User extends Document {
    username: string,
    email:string,
    password: string,
    isVerified: boolean,
    isVerifiedToken: string,
    isVerifiedTokenExpiry: Date,
    isForgotPasswordToken: string,
    isForgotPasswordTokenExpiry: Date,
}



const UserSchema: Schema<User>= new Schema({
    username:{
        type:String,
        unique: true,
        required: [true, "Please proved a valid username"]
    },
    email:{
        type:String,
        unique: true,
        required: [true, "Email is required"],
        match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required: [true, "Please proved a valid password"]
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    isVerifiedToken:{
        type:String,
        unique: true,
        required: [true, "Please verify your email"]
    },
    isVerifiedTokenExpiry:{
        type:Date,
        unique: true,
        required: [true, "Verify code is expiry"]
    },
    isForgotPasswordToken:{
        type:String,
        unique: true,
        required: [true, "Provide a code to reset your password"]
    },
    isForgotPasswordTokenExpiry:{
        type:Date,
        unique: true,
        required: [true, "Code is expiry"]
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema))





