"use client"
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("profile");

  const getUserDetails = async()=>{
    try {
      const response = await axios.get("/api/users/me");
      console.log("user data: " + response.data);
      // console.log(typeof response.data);
      setData(response.data.data._id);
      
    } catch (error:any) {
      console.log(error);
    }
  }

  const logout = async()=>{
    try {
      await axios.get("/api/users/logout");
      toast.success("logged out successfully");
      console.log("logged out successfully");
      
      router.push("/");
    } catch (error:any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  }
  return (
    <div>
      <h1>Profile page</h1>
      <div>
        {
          data && <span>
            {data}
          </span>
        }
      </div>
      <button onClick={logout} className='px-4 py-2'>
        logout
      </button>
      <button onClick={getUserDetails} className='px-4 py-2 bg-slate-700'>
        get user details
      </button>
    </div>
  )
}
