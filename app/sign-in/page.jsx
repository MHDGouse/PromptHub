"use client";
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from 'next/navigation';


const SignIN = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

  
    useEffect(() => {
      (async () => {
        const res = await getProviders();
        setProviders(res);
      })();
    }, []);

    useEffect(() => {
        if (session) {
          router.push('/'); 
        }
      }, [session]);

  const [user,setUser]=React.useState({
    email:"",
    password:""
  })
  const login=async()=>{

  }
  return (
    <div>
          {/* Desktop Navigation */}
      <div className='sm:flex-col  space-y-4 '> <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                }}
                  className='black_btn w-full'
                >
                Sign in with {provider.name}
                </button>
                
                
              ))}
          </>
      </div>
 

      {/* Mobile Navigation */}
      <div className='hidden flex-col space-y-4 relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      <div>
       <span className='flex items-center justify-center mt-10'>- OR -</span>
        <div className="flex flex-col items-center justify-between p-5">
        <div className="prompt_card p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
          <label htmlFor="email">Email</label>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
              value={user.email}
              onChange={(e)=>setUser({...user,email: e.target.value})}
            />
            <label htmlFor="password">Password</label>
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
              onClick={login}
            >
             
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4"></p>
         
         
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/signup"
          >
            Register Here
          </Link>
        </div>
      </div>
      </div>
    </div>
   
  )
}

export default SignIN