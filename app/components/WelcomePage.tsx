'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const WelcomePage = () => {

    const router = useRouter()

    const handleRouting = () => {
        router.push('/components/login')
    }

    return (
        <div className='flex flex-col gap-2 text-center'>Welcome!
            <button onClick={handleRouting} className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Login</button>
            <button className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Register</button>
        </div>
    )
}

export default WelcomePage