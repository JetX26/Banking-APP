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

    const { data, isLoading, error, refetch, isSuccess, isStale } = useQuery({
        queryKey: ['fetchUser', userData],
        queryFn: () => fetchUser(userData),
        enabled: false
    })

    const keys = ['First Name', 'Last Name', 'Email', 'Phone', 'Accounts']




    console.log(data)

    return (
        <div className="bg-white  rounded-sm p-12 flex flex-col items-center gap-4">
            <h1 className='text-2xl'>Fetch User By Email</h1>
            <div className='flex flex-col items-center gap-3'>
                <input type='email' onChange={(e) => {
                    setUserData(e.currentTarget.value)
                    console.log(userData)
                }} className='rounded-sm border-[1px] border-gray-200 px-2 py-2' required placeholder='Email' />
                <button onClick={() => {
                    if (typeof userData === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData)) {
                        refetch()
                    } else {
                        alert('Please enter a valid email address')
                    }
                }} className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Submit</button>
            </div >
            <div>
                <h2 className='text-3xl'>User Data</h2>
                {isLoading && !data && (
                    <div className='flex justify-center'>
                        <p>User not found</p>
                    </div>
                )}
                {data && isSuccess && (
                    <div>
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}: </strong>
                                {typeof value === 'object' && value !== null ? (
                                    <pre>
                                        {JSON.stringify(value, null, 2)}
                                    </pre>
                                ) : (
                                    <span>{String(value)}</span>
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