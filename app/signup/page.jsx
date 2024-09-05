"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
const Signup = () => {

  const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/register", user);
            console.log("Signup success", response.data);
            router.push("/sign-in");
            
        } catch (error) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


  return (
      <div className="flex flex-col items-center justify-between p-24">
        <div className="prompt_card p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              value={user.email}
              onChange={(e)=>setUser({...user,email: e.target.value})}
              placeholder="Email"
              required
            />
            <label htmlFor="password">Passwaord</label>
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              value={user.password}
              onChange={(e)=>setUser({...user,password: e.target.value})}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full black_btn"
              onClick={onSignup}
            >
             
              Register
            </button>
           
          
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/sign-in"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
};

export default Signup;