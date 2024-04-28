"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LoginPage() {
    const [user, setUSer] = useState({
      email: "",
      password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onLogin = async() => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("login successful", response.data);
        toast.success("login successfully");
        router.push("/profile");
      } catch (error:any) {
        console.log("login failed", error.message);
        toast.error(error.message);
      }
    }

    useEffect(()=>{
      if (user.email.length > 4 && user.password.length > 0) {
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    }, [user])
  return (
    <section className='w-full flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center justify-center gap-2 border-[2px] border-cyan-400 px-12 py-8 rounded-sm shadow-md shadow-white'>
       <h1 className='text-2xl text-orange-500 font-bold'>{loading ? "loading" : "login"}</h1>
       <hr />
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
       onClick={onLogin}
       >
          {
            buttonDisabled?
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> please fill the form</span>
            :
            "login"
          }
       </button>
       <Link href="/signup" className='underline hover:text-blue-500'>
          don't have an account ? signup
       </Link>
      </div>
    </section>
  )
}

