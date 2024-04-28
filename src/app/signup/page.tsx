"use client";

import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function SignupPage() {
    const [user, setUSer] = useState({
      email: "",
      username: "",
      password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onSignup = async() => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("signup successful", response.data);
        toast.success("signup successful");
      } catch (error:any) {
        console.log("signup failed", error.message);
        toast.error(error.message);
        router.push("/login");
      }
    }

    useEffect(()=>{
      if (user.email.length > 4 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    }, [user])
  return (
    <section className='w-full flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center justify-center gap-2 border-[2px] border-cyan-400 px-12 py-8 rounded-sm shadow-md shadow-white'>
       <h1>{loading ? "loading" : "signup"}</h1>
       <hr />

       <label htmlFor="username" className='inline-block'>username:</label>
       <input 
       id='username'
       value={user.username}
       onChange={(e)=> setUSer({...user, username: e.target.value })}
       placeholder='username'
       type="text" 
       className='text-black w-full h-10 outline-none px-2 rounded-sm'
       />

       <label htmlFor="email">email:</label>
       <input 
       id='email'
       value={user.email}
       onChange={(e)=> setUSer({...user, email: e.target.value })}
       placeholder='email'
       type="email" 
       className='text-black w-full h-10 outline-none px-2 rounded-sm'
       />

       <label htmlFor="password">password:</label>
       <input 
       id='password'
       value={user.password}
       onChange={(e)=> setUSer({...user, password: e.target.value })}
       placeholder='password'
       type="password" 
       className='text-black w-full h-10 outline-none px-2 rounded-sm'
       />

       <button 
       className='bg-blue-500 py-2 px-4 rounded-sm hover:bg-blue-700 transition-all mt-4'
       onClick={onSignup}
       >
          {
            buttonDisabled?
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> please fill the form</span>
            :
            "signup"
          }
       </button>
       <Link href="/login" className='underline hover:text-blue-500'>
          already have an account & login
       </Link>
      </div>
    </section>
  )
}

