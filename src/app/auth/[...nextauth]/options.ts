import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import dbConnect from "../../lib/dbConnect";
import UserModel from "../../models/User";



export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user =await UserModel.findOne({
                        $or:[
                           { email: credentials.identifier},
                           { password: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("Cannot find user with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account first")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Incorrect password")
                    }
                } catch (error:any) {
                    throw new Error(error)
                }

              }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: { scope: "profile email" }
            }
          })
    ],
    pages:{
        signIn: '/sign-in'
    },
    callbacks:{
        async session({ session, token }): Promise<any> {
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.username = token.username
          },
        async jwt({ token, user,}): Promise<any> {
            token._id = user._id?.toString()
            token.isVerified = user.isVerified
            token.username = user.username
          }
    },
    session:{
        strategy: "jwt"
    },
    secret:process.env.NEXT_AUTH_SECRET
}
