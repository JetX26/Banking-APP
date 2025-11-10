'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'

const GetBalance = () => {

    const [accountNumberInput, setAccountNumberInput] = useState('')

    const getUserBalance = async (accountNumber: string) => {
        try {
            const response = await axios.get('/api/getBalance', { params: { accountNumber } })

            return response.data;
        } catch (error) {
            console.error(error)
            throw new Error('Failed to fetch user')
        }
    }

    const { data, refetch, isSuccess, error, isError, isLoading } = useQuery({
        queryKey: ['getUserBalance', accountNumberInput],
        queryFn: () => getUserBalance(accountNumberInput),
        enabled: false
    })


    const queryClient = useQueryClient()

    const cachedData = queryClient.getQueryData(['getUserBalance', accountNumberInput])


    useEffect(() => {
        console.log(accountNumberInput)
    }, [accountNumberInput])

    return (
        <div className="bg-white  rounded-sm p-12 flex flex-col items-center gap-4">
            <h1 className='text-2xl'>Get Balance</h1>
            <div className='flex flex-col items-center gap-3'>
                <input onChange={(e) => {
                    setAccountNumberInput(e.currentTarget.value)
                }} className='rounded-sm border-[1px] border-gray-200 px-2 py-2' type="text" placeholder='Account number' />
                <button onClick={() => {
                    refetch()
                    console.log(data)
                    // console.log(customerData[0])
                }} className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Submit</button>
                {data && isSuccess && (
                    <div>
                        <div>{data && isSuccess && (
                            <div>
                                <p><strong>First Name:</strong> {data.response.customer.firstName}</p>
                                <p><strong>Last Name:</strong> {data.response.customer.lastName}</p>
                                <p><strong>Account Number:</strong> {data.response.accountNumber}</p>
                                <p><strong>Balance:</strong> {data.response.balance}</p>
                                <p><strong>Account Type:</strong> {data.response.accountType}</p>
                            </div>
                        )}</div>
                    </div>
                )}
            </div >
        </div >
    )
}

export default GetBalance