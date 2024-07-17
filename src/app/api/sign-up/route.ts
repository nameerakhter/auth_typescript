import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import UserModel from "../../models/User";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "../../helpers/sendVerificationEmail/route";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the feilds before signing up",
        },
        { status: 400 }
      );
    }
    // Check for unique username
    const isUsernameVerifiedExists = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (isUsernameVerifiedExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already taken, Please choose a different username",
        },
        { status: 400 }
      );
    }

    //  Check for unique email

    const isUserWithVerifiedEmailExists = await UserModel.findOne({
      email,
      isVerified: true,
    });
    const verifyCode = await Math.floor(100000 + Math.random() * 900000).toString()

    if (isUserWithVerifiedEmailExists) {
      if (isUserWithVerifiedEmailExists.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "email already taken, Please choose a different email",
          },
          { status: 400 }
        );
      }
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours()+1) 
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerifiedToken: verifyCode,
        isVerifiedTokenExpiry: expiryDate

      })
      
      await newUser.save()

    }
    //  Send Verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error signing up user",
      },
      { status: 500 }
    );
  }
}
