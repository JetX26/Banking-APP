'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import CreateAccount from "../components/create-account/page";
import GetBalance from "../components/get-balance/page";
import FetchTransferHistory from "../components/fetch-transfers/page";
import FetchAllUsers from "../components/fetch-users/page";
import FetchUser from "../components/fetch-user/page";
import TransferFunds from '../components/TransferFunds';

import userIcon from "../../public/assets/icons/user.png"
import walletIcon from "../../public/assets/icons/wallet.png"
import transferIcon from "../../public/assets/icons/transfer.png"
import allUsers from "../../public/assets/icons/all-users.png"
import fetchUser from '../../public/assets/icons/fetch-user.png'
import transferFunds from "../../public/assets/icons/transfer-funds.png"


interface NavigationMenuProps {
    activeItem: string,
    setActiveItem: (item: string) => void,
}

const components = [
    { name: 'Get Balance', component: GetBalance },
    { name: 'Fetch Transfer History', component: FetchTransferHistory },
    { name: 'Fetch All Users', component: FetchAllUsers },
    { name: 'Fetch User', component: FetchUser },
    { name: 'Transfer Funds', component: TransferFunds }
]

export const menuIcons = [
    { name: 'Get Balance', icon: walletIcon },
    { name: 'Fetch Transfer History', icon: transferIcon },
    { name: 'Fetch All Users', icon: allUsers },
    { name: 'Fetch User', icon: fetchUser },
    { name: 'Transfer Funds', icon: transferFunds }
]

const NavigationMenu = ({ activeItem, setActiveItem }: NavigationMenuProps) => {

    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const logoutButton = async () => {
        const response = await axios.post('/api/logoutSession')

        console.log(response.status)

        if (response.status === 200) {
            alert('Logging out ...')
            router.push('/')
        }

        return response;
    }

    useEffect(() => {
        console.log(activeItem)
    }, [activeItem])

    return (
        <div className='flex flex-col lg:flex-row h-screen bg-white'>
            {/* Desktop Navigation */}
            <div className='hidden lg:flex border-r-[1px] border-gray-100 flex-col items-center justify-start h-screen py-4 gap-6 w-64'>
                <div className='flex flex-col gap-2 w-full px-4'>
                    {menuIcons.map((item, id) => {
                        return (
                            <span
                                onClick={() => {
                                    setActiveItem(item.name)
                                }}
                                key={id}
                                className={`flex gap-2 px-4 py-3 rounded-sm hover:bg-blue-200 cursor-pointer transition-colors ${activeItem === item.name && 'bg-blue-400 text-white'
                                    }`}
                            >
                                <Image src={item.icon} width={25} alt={item.name} />
                                <button className='text-sm font-medium'>{item.name}</button>
                            </span>
                        )
                    })}
                </div>

                <div className='mt-auto w-full px-4'>
                    <button
                        onClick={() => { logoutButton() }}
                        className='w-full px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-sm font-medium transition-colors'
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className='lg:hidden flex flex-col w-full h-full'>
                {/* Mobile Header */}
                <div className='flex items-center justify-between border-b-[1px] border-gray-100 px-4 py-4 bg-white sticky top-0'>
                    <h1 className='text-lg font-semibold text-gray-800'>{activeItem}</h1>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='text-2xl font-bold text-gray-800'
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className='bg-white border-b-[1px] border-gray-100 p-4 flex flex-col gap-2'>
                        {menuIcons.map((item, id) => {
                            return (
                                <span
                                    onClick={() => {
                                        setActiveItem(item.name)
                                        setMobileMenuOpen(false)
                                    }}
                                    key={id}
                                    className={`flex gap-2 px-4 py-3 rounded-sm hover:bg-blue-200 cursor-pointer transition-colors ${activeItem === item.name && 'bg-blue-400 text-white'
                                        }`}
                                >
                                    <Image src={item.icon} width={25} alt={item.name} />
                                    <button className='text-sm font-medium'>{item.name}</button>
                                </span>
                            )
                        })}

                        <button
                            onClick={() => { logoutButton() }}
                            className='w-full px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-sm font-medium mt-2 transition-colors'
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Mobile Content Area */}
                <div className='flex-1 overflow-y-auto w-full'>
                    {components.map((item, id) => {
                        if (item.name === activeItem) {
                            const Component = item.component;
                            return <div key={id}>
                                <Component></Component>
                            </div>
                        }
                    })}
                </div>
            </div>

            {/* Desktop Content Area */}
            <div className='hidden lg:flex flex-1 overflow-y-auto'>
                {components.map((item, id) => {
                    if (item.name === activeItem) {
                        const Component = item.component;
                        return <div key={id} className='w-full'>
                            <Component></Component>
                        </div>
                    }
                })}
            </div>
        </div>
    )
}

export default NavigationMenu