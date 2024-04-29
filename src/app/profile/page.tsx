"use client"
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async()=>{
    try {
      const response = await axios.get("/api/users/me");
      console.log("user data ahise: " + response.data.data);
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
      
      router.push("/login");
    } catch (error:any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  }
  return (
    <div className='w-full min-h-screen flex  flex-col justify-center items-center gap-4'>
      <h1 className='text-4xl font-bold mb-4'>Profile page</h1>
      <div>
        {
          data && <span>
            {data}
          </span>
        }
      </div>
      <button onClick={logout} className='px-4 py-2 bg-blue-500 rounded-sm hover:bg-blue-700 transition-all'>
        logout
      </button>
      <button onClick={getUserDetails} className='px-4 py-2 bg-blue-500 rounded-sm hover:bg-blue-700 transition-all'>
        get user details
      </button>
    </div>
  )
}
