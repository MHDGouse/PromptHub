// import User from "@/models/User";
// import connect from "@/utils/database";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export const POST = async (request) => {
//   const { email, password } = await request.json();

//   await connect();

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return new NextResponse("Email is already in use", { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 5);
//   const newUser = new User({
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     return new NextResponse("user is registered", { status: 200 });
//   } catch (err) {
//     return new NextResponse(err, {
//       status: 500,
//     });
//   }
// };

import { connectToDB } from "@utils/database";
import User from "@models/User";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connectToDB()
export async function POST(request){
  try {
    const reqBody=await request.json()
    const {email,password}=reqBody
    const user = await User.findOne({email})

    if(user){
      return  NextResponse.json("Email is already in use", { status: 400 });
    }
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    })

   const savedUser= await newUser.save()
   return NextResponse.json({message:"user is registered",
    succes: true,
    saveUser
   });

  } catch (error) {
    return NextRequest.json({error}),
    {ststus:500}
  }
}