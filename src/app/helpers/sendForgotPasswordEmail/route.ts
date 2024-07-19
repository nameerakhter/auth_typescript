import type { NextApiRequest, NextApiResponse } from 'next';
import ForgotPasswordEmail from '@/src/components/ForgotPassword';
import { ApiResponse } from '@/src/types/ApiResponse';
import { Resend } from 'resend';
import dbConnect from '../../lib/dbConnect';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendForgotPassword(email: string, username: string, verifyCode: string):Promise<ApiResponse>{
    await dbConnect()

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:email,
            subject:'auth_typescript | ForgotPassword',
            react: ForgotPasswordEmail({username, otp: verifyCode}),
        })
        return{success: true, message:"Passowrd reset email sent"}
        
    } catch (emailerror) {
        console.log("error sending password reset email", emailerror)
        return{success: false, message:"error sending password reset email"}
    }
}
