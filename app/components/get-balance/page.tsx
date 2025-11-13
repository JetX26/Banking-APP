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

    const { data, refetch, isSuccess, isLoading } = useQuery({
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
        <div className="bg-white w-full flex flex-col items-center gap-4 px-4 py-8 sm:px-6 md:p-12">
            <h1 className='text-xl sm:text-2xl md:text-2xl font-semibold'>Get Balance</h1>

            <div className='w-full max-w-md flex flex-col items-center gap-3'>
                <input
                    onChange={(e) => {
                        setAccountNumberInput(e.currentTarget.value)
                    }}
                    className='w-full rounded-sm border-[1px] border-gray-200 px-2 py-2 text-sm sm:text-base focus:outline-none'
                    placeholder='Account number'
                />

                <button
                    onClick={() => {
                        if (!accountNumberInput) {
                            alert('Please type in an account number...')
                            return;
                        }
                        refetch()
                        console.log(data)
                    }}
                    className='w-full rounded-sm bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 text-sm sm:text-base transition-colors'
                >
                    Submit
                </button>

                {isLoading && (
                    <div className='flex justify-center'>
                        <p className='text-sm sm:text-base'>Loading...</p>
                    </div>
                )}

                {data && isSuccess && (
                    <div className='w-full bg-gray-50 rounded-sm p-4 sm:p-6 border border-gray-200'>
                        <div className='space-y-3'>
                            <div>
                                <p className='text-xs sm:text-sm text-gray-600'><strong>First Name:</strong></p>
                                <p className='text-sm sm:text-base text-gray-800'>{data.response.customer.firstName}</p>
                            </div>

                            <div>
                                <p className='text-xs sm:text-sm text-gray-600'><strong>Last Name:</strong></p>
                                <p className='text-sm sm:text-base text-gray-800'>{data.response.customer.lastName}</p>
                            </div>

                            <div>
                                <p className='text-xs sm:text-sm text-gray-600'><strong>Account Number:</strong></p>
                                <p className='text-sm sm:text-base text-gray-800 break-all'>{data.response.accountNumber}</p>
                            </div>

                            <div>
                                <p className='text-xs sm:text-sm text-gray-600'><strong>Balance:</strong></p>
                                <p className='text-sm sm:text-base font-semibold text-green-600'>${data.response.balance}</p>
                            </div>

                            <div>
                                <p className='text-xs sm:text-sm text-gray-600'><strong>Account Type:</strong></p>
                                <p className='text-sm sm:text-base text-gray-800'>{data.response.accountType}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetBalance