/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';




const CreateAccount = () => {

    const inputs = ['First Name', 'Last Name', 'Email', 'Phone', 'Password', 'Amount']
    const accountTypes = ['Select Account Type', 'Checking', 'Savings']


    const [accountType, setAccountType] = useState('')
    const [balance, setBalance] = useState<number>(0)


    const { mutateAsync } = useMutation({
        mutationFn: async (formValues: any) => {
            const { data } = await axios.post('/api/createAccount', formValues)
            return data;
        }
    })




    const submit = async (e: any) => {
        e.preventDefault()


        const formData = new FormData(e.currentTarget)
        const firstName = formData.get('First Name')
        const lastName = formData.get('Last Name')
        const email = formData.get('Email')
        const phone = formData.get('Phone')
        const password = formData.get('Password')



        if (!firstName || !lastName || !email || !phone || !password) {
            alert('Please fill in all required fields...')
        }

        console.log(e.currentTarget.value)

        try {
            const result = await mutateAsync({
                firstName,
                lastName,
                email,
                phone,
                password,
                accountType,
                balance
            })



            if (result) {
                alert('Account created successfully!')
                console.log(result)
            }


        } catch (error: any) {
            alert(error.response?.data?.error || 'Something went wrong')
        }


    }




    return (

        <form
            onSubmit={submit}
            className="bg-white  rounded-sm p-12 flex flex-col items-center gap-4">
            <h1 className='text-2xl'>Create An Account</h1>
            <div className='flex flex-col items-center gap-3'>
                {inputs.map((item, id) => {
                    return <div key={id}>
                        {item === 'Amount' ? <input onChange={(e) => {
                            setBalance(Number(e.currentTarget.value))
                            console.log(balance)
                        }} placeholder={`${item}`} className='border-[1px] border-gray-200 rounded-sm px-2 py-2'></input> : <input name={item} type='text' className='border-[1px] border-gray-200 rounded-sm px-2 py-2' placeholder={item} />}
                    </div>
                })}
                <select onChange={(e) => {
                    setAccountType(e.target.value)
                }} className='pr-4 pl-1 w-full py-2 border-[1px] border-gray-200 rounded-sm'>
                    {accountTypes.map((item, id) => {
                        return <option key={id}>{item}</option>
                    })}
                </select>
                <button type='submit' className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Create Account</button>
            </div >
        </form >
    )


}

export default CreateAccount