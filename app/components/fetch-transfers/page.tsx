'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const FetchTransferHistory = () => {

    const [emailInput, setEmailInput] = useState('')

    const fetchTransfers = async (email: string) => {
        const response = await axios.get('/api/getTransferHistory', { params: { email } })

        if (!response) {
            console.log('No response received')
        }

        return response.data;
    }

    const { data, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['fetchTransfers', emailInput],
        queryFn: () => fetchTransfers(emailInput),
        enabled: false
    })

    return (
        <div className="bg-white w-full flex flex-col items-center gap-4 px-4 py-8 sm:px-6 md:p-12">
            <h1 className='text-xl sm:text-2xl md:text-2xl font-semibold'>Fetch Transfers</h1>

            <div className='w-full max-w-md flex flex-col items-center gap-3'>
                <input
                    onChange={(e) => {
                        setEmailInput(e.currentTarget.value)
                    }}
                    className='w-full rounded-sm border-[1px] border-gray-200 px-2 py-2 text-sm sm:text-base focus:outline-none'
                    type="text"
                    placeholder='Email or phone number'
                />

                <button
                    onClick={() => {
                        if (!emailInput) {
                            alert('Please enter a valid email')
                        } else if (typeof emailInput === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput)) {
                            refetch()
                        }
                    }}
                    className='w-full rounded-sm bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 text-sm sm:text-base transition-colors'
                >
                    Submit
                </button>

                {isLoading && (
                    <p className='text-center text-sm sm:text-base'>Loading...</p>
                )}

                {data && isSuccess && (
                    <div className='w-full max-w-md bg-gray-50 rounded-sm p-4 sm:p-6 overflow-y-auto max-h-[60vh]'>
                        <p className='text-sm sm:text-base mb-2'><strong>First Name: </strong>{data.user.firstName}</p>
                        <p className='text-sm sm:text-base mb-4'><strong>Last Name: </strong>{data.user.lastName}</p>

                        {data.user.accounts.map((account: any, index: any) => {
                            return (
                                <div key={index} className='mb-6'>
                                    <h3 className='font-bold text-lg sm:text-xl md:text-2xl mb-3'>Sent Transfers</h3>

                                    <div className='space-y-3 mb-6'>
                                        {account.sentTransfers.length > 0 ? (
                                            account.sentTransfers.map((transfer: any, id: any) => {
                                                return (
                                                    <div key={`${id}-sent`} className='bg-white p-3 sm:p-4 rounded-sm border border-gray-200'>
                                                        <p className='text-xs sm:text-sm mb-1'><strong>Transfer ID: </strong><span className='break-all'>{transfer.id}</span></p>
                                                        <p className='text-xs sm:text-sm mb-1'><strong>Amount: </strong>${transfer.amount}</p>
                                                        <p className='text-xs sm:text-sm'><strong>To Account: </strong>{transfer.toAccount.accountNumber}</p>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p className='text-xs sm:text-sm text-gray-500'>No sent transfers</p>
                                        )}
                                    </div>

                                    <h3 className='font-bold text-lg sm:text-xl md:text-2xl mb-3'>Received Transfers</h3>

                                    <div className='space-y-3'>
                                        {account.receivedTransfers.length > 0 ? (
                                            account.receivedTransfers.map((transfer: any, id: any) => (
                                                <div key={`${id}-received`} className='bg-white p-3 sm:p-4 rounded-sm border border-gray-200'>
                                                    <p className='text-xs sm:text-sm mb-1'><strong>Transfer ID: </strong><span className='break-all'>{transfer.id}</span></p>
                                                    <p className='text-xs sm:text-sm mb-1'><strong>Amount: </strong>${transfer.amount}</p>
                                                    <p className='text-xs sm:text-sm'><strong>From Account: </strong>{transfer.fromAccount.accountNumber}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className='text-xs sm:text-sm text-gray-500'>No received transfers</p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FetchTransferHistory