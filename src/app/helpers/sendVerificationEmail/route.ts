import type { NextApiRequest, NextApiResponse } from 'next';
import  VerificationEmail  from '@/src/components/Verifyemail';
import { ApiResponse } from '@/src/types/ApiResponse';
import { Resend } from 'resend';
import dbConnect from '../../lib/dbConnect';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendVerificationEmail(email: string, username: string, verifyCode: string):Promise<ApiResponse>{
    await dbConnect()

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:email,
            subject:'auth_typescript | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        })
        return{success: true, message:"Veification email sent"}
        
    } catch (emailerror) {
        console.log("error sending Veification email", emailerror)
        return{success: false, message:"error sending Veification email"}
    }
}
