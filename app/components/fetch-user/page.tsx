'use client'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const FetchUser = () => {

    const [userData, setUserData] = useState('')

    const fetchUser = async (email: string) => {
        try {
            const response = await axios.get('/api/getUser', { params: { email } })
            console.log(response)
            return response.data.data;
        } catch (error) {
            console.error(error)
            throw new Error('Failed to fetch user')
        }
    }

    const { data, isLoading, refetch, isSuccess } = useQuery({
        queryKey: ['fetchUser', userData],
        queryFn: () => fetchUser(userData),
        enabled: false
    })

    console.log(data)

    return (
        <div className="bg-white w-full flex flex-col items-center gap-4 px-4 py-8 sm:px-6 md:p-12">
            <h1 className='text-xl sm:text-2xl md:text-2xl font-semibold'>Fetch User By Email</h1>

            <div className='w-full max-w-md flex flex-col items-center gap-3'>
                <input
                    type='email'
                    onChange={(e) => {
                        setUserData(e.currentTarget.value)
                        console.log(userData)
                    }}
                    className='w-full rounded-sm border-[1px] border-gray-200 px-2 py-2 text-sm sm:text-base focus:outline-none'
                    required
                    placeholder='Email'
                />

                <button
                    onClick={() => {
                        if (typeof userData === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData)) {
                            refetch()
                        } else {
                            alert('Please enter a valid email address')
                        }
                    }}
                    className='w-full rounded-sm bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 text-sm sm:text-base transition-colors'
                >
                    Submit
                </button>
            </div>

            <div className='w-full max-w-md'>
                <h2 className='text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-center'>User Data</h2>

                {isLoading && !data && (
                    <div className='flex justify-center'>
                        <p className='text-sm sm:text-base'>Loading...</p>
                    </div>
                )}

                {!data && !isLoading && (
                    <div className='flex justify-center'>
                        <p className='text-sm sm:text-base text-gray-500'>User not found</p>
                    </div>
                )}

                {data && isSuccess && (
                    <div className='bg-gray-50 rounded-sm p-4 sm:p-6 space-y-3 overflow-y-auto max-h-[60vh]'>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key} className='bg-white p-3 sm:p-4 rounded-sm border border-gray-200'>
                                <strong className='text-sm sm:text-base block mb-2 capitalize'>{key}: </strong>
                                {typeof value === 'object' && value !== null ? (
                                    <pre className='bg-gray-100 p-2 sm:p-3 rounded text-xs sm:text-sm overflow-x-auto'>
                                        {JSON.stringify(value, null, 2)}
                                    </pre>
                                ) : (
                                    <span className='text-sm sm:text-base text-gray-700'>{String(value)}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FetchUser