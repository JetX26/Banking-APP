/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const FetchAllUsers = () => {



    const fetchAllUsers = async () => {
        const response = await axios.get('/api/getAllUsers')

        console.log(response.data.data);
        return response.data.data;
    }

    const { data, isLoading, isFetched, error, refetch, isSuccess } = useQuery({
        queryKey: ['fetchAllUsers'],
        queryFn: fetchAllUsers,
        enabled: false
    })



    return (
        <div className="bg-white  rounded-sm p-12 flex flex-col items-center gap-4">
            <h1 className='text-2xl'>Fetch All Users</h1>
            <div className='flex flex-col items-center gap-3'>
                <button onClick={async () => {
                    await refetch()
                }} className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Fetch</button>
            </div >
            <div>
                {data && isSuccess && (
                    <div>
                        {data.map((item: any, id: any) => (
                            <div key={id}>
                                <p>{item.firstName} {item.lastName}:
                                </p>
                                {item.accounts && item.accounts.map((item: any, id: any) => (
                                    <p key={id}>Account Number: {item.accountNumber}</p>
                                ))}
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div >
    )

}

export default FetchAllUsers