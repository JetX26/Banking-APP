/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'

const TransferFunds = () => {

    const [fromAccValue, setFromAccValue] = useState('')
    const [toAccValue, setToAccValue] = useState('')
    const [amount, setAmount] = useState<number>(0)

    const { data, mutateAsync } = useMutation({

        mutationFn: async (formValues: any) => {
            const { data } = await axios.post('/api/transferFunds', formValues)
            return data;
        }
    })

    const submit = async (e: any) => {
        e.preventDefault()

        if (!fromAccValue || !toAccValue || !amount) {
            return;
        }

        try {

            const result = await mutateAsync({
                fromAccountNumber: fromAccValue,
                toAccountNumber: toAccValue,
                amount
            })

            if (result) {
                alert('Transfer complete!')
            }

        } catch (error: any) {
            alert(error.response.data.error)
        }

    }

    return (
        <form onSubmit={submit} className="bg-white rounded-sm p-12 flex flex-col items-center gap-4 px-4 py-8 sm:px-6 md:p-12">
            <h1 className='text-2xl font-semibold'>Transfer Funds</h1>

            <div className='flex flex-col items-center gap-3'>
                <input
                    onChange={(e) => {
                        setFromAccValue(e.currentTarget.value)
                        console.log(fromAccValue)
                    }}
                    className='rounded-sm border-[1px] border-gray-200 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400'
                    type="text"
                    placeholder='From account number'
                />

                <input
                    onChange={(e) => {
                        setToAccValue(e.currentTarget.value)
                        console.log(toAccValue)
                    }}
                    className='rounded-sm border-[1px] border-gray-200 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400'
                    type="text"
                    placeholder='To account number'
                />

                <input
                    onChange={(e) => {
                        setAmount(Number(e.currentTarget.value))
                        console.log(amount)
                    }}
                    placeholder='Amount'
                    type="text"
                    className='rounded-sm border-[1px] border-gray-200 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400'
                />

                <button
                    type='submit'
                    onClick={() => console.log(data)}
                    className='rounded-sm bg-blue-400 text-white px-[2rem] py-1 hover:bg-blue-500 transition-colors'
                >
                    Transfer
                </button>
            </div>
        </form>
    )
}

export default TransferFunds