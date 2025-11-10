'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const WelcomePage = () => {

  const router = useRouter()

  const handleRouting = () => {
    router.push('/components/login')
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-2 text-center text-3xl'>Welcome!
        <button onClick={handleRouting} className='rounded-sm  bg-blue-400 text-xl text-white px-[5rem] py-1'>Login</button>
        <button className='rounded-sm bg-blue-400 text-white px-[2rem] py-1 text-xl'>Register</button>
      </div>
    </div>
  )
}

export default WelcomePage