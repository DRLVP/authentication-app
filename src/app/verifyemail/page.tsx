"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  // const router = useRouter();
  // console.log("my url token is::", token);
  
  const verifyUserEmail = async ()=>{
    try {
      await axios.post("/api/users/verifyemail", {token});
      setVerified(true);
      setError(false)
    } catch (error:any) {
      setError(true);
      throw new Error(error.response.data);
    }
  }


  useEffect(()=>{
    setError(false)
    const urlToken:any = window.location.search.split("=")[1]
    // console.log("here is the url token:: " + urlToken);
    
    setToken(urlToken || "");

    // using nextjs
    // const {query} = router; 
    // const urlToken:any = query.token 
    // setToken(urlToken || "");
  }, [token])

  useEffect(()=>{
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <section className='w-full min-h-screen'>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-4xl text-orange-500 font-bold mb-4'>verify email</h1>
        <h2 className='text-2xl text-white bg-blue-950 py-2 px-4'>
          {
            token ? `this is my token:: ${token}`: "no token"
          }
        </h2>
        {
          verified && (
            <div>
              <h2>user verified</h2>
              <Link href="/login">login</Link>
            </div>
          )
        }
        {
          error && (
            <div>
              <h2>{error}</h2>
            </div>
          )
        }
      </div>
    </section>
  )
}
