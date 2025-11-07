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
        <div className="bg-white  rounded-sm p-12 flex flex-col items-center gap-4">
            <h1 className='text-2xl'>Fetch Transfers</h1>
            <div className='flex flex-col items-center gap-3'>
                <input onChange={(e) => {
                    setEmailInput(e.currentTarget.value)
                }} className='rounded-sm border-[1px] border-gray-200 px-2 py-2' type="text" placeholder='Email or phone number' />
                <button onClick={() => {
                    if (!emailInput) {
                        alert('Please enter a valid email')
                    } else if (typeof emailInput === 'string' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput)) {
                        refetch()
                    }
                    console.log(data)
                }} className='rounded-sm bg-blue-400 text-white px-[2rem] py-1'>Submit</button>
                <div>
                    {data && isSuccess && (
                        <div>
                            <p><strong>First Name: </strong>{data.user.firstName}</p>
                            <p><strong>Last Name: </strong>{data.user.lastName}</p>
                            <br />

                            {data.user.accounts.map((account: any, index: any) => {
                                console.log(index)

                                const mykey = account.id;

                                return (
                                    <>
                                        <h3 className='font-bold text-2xl'>Sent Transfers</h3>
                                        <div key={mykey}>
                                            <div>{account.sentTransfers.map((transfer: any, id: any) => {
                                                console.log(id)
                                                const mykey = id + '-sent'
                                                console.log(mykey)

                                                return (
                                                    <div key={mykey}>
                                                        <br />
                                                        <p><strong>Transfer ID: </strong>{transfer.id}</p>
                                                        <p><strong>Transer amount: </strong>{transfer.amount}</p>
                                                        <p><strong>Transfer to Account Number: {transfer.toAccount.accountNumber}</strong></p>
                                                    </div>
                                                )
                                            })}</div>
                                            <br />
                                            <h3 className='font-bold text-2xl'>Received Transfers</h3>
                                            <div>{account.receivedTransfers.map((transfer: any, id: any) => (
                                                <div key={id}>
                                                    <br />
                                                    <p><strong>Transfer ID: </strong>{transfer.id}</p>
                                                    <p><strong>Transer amount: </strong>{transfer.amount}</p>
                                                    <p><strong>Transfer from Account Number: {transfer.fromAccount.accountNumber}</strong></p>
                                                </div>
                                            ))}</div>
                                        </div>


                                    </>

                                )
                            })}
                        </div>
                    )}
                </div>
            </div >
        </div >
    )
}

export default FetchTransferHistory