/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';



const Login = () => {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const { mutateAsync } = useMutation({
        mutationFn: async (formValues: any) => {
            const { data } = await axios.post('/api/loginSession', {
                email: formValues.email,
                password: formValues.password
            })
            return data;
        }
    })




    const submit = async (e: any) => {
        e.preventDefault()


        if (!email || !password) {
            alert('Please fill in all required fields...')
            return;
        }

        try {



            const result = await mutateAsync({
                email,
                password,
            })



            if (result) {
                alert('Logged in successfully!')

                router.push('/components/dashboard')

                console.log(result)
            }



        } catch (error: any) {
            alert(error.response?.data?.error || 'Something went wrong')
        }


    }




    return (
        <form onSubmit={submit} className='bg-white h-screen w-full'>
            <div className='flex flex-col justify-center items-center h-full gap-2'>
                <h3 className='text-2xl'>Sign in</h3>
                <input onChange={(e) => {
                    setEmail(e.currentTarget.value)
                }} className='border-[1px] border-gray-200 rounded-sm px-2 py-2' type="text" placeholder='Email' />
                <input onChange={(e) => {
                    setPassword(e.currentTarget.value)
                }} className='border-[1px] border-gray-200 rounded-sm px-2 py-2' type="password" placeholder='Password' />
                <button type='submit' className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Login</button>
            </div>
        </form>
    );
}

export default Login