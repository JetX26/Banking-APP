import React, { useEffect } from 'react'
import Image from 'next/image'

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


export const menuIcons = [
    { name: 'Create Account', icon: userIcon },
    { name: 'Get Balance', icon: walletIcon },
    { name: 'Fetch Transfer History', icon: transferIcon },
    { name: 'Fetch All Users', icon: allUsers },
    { name: 'Fetch User', icon: fetchUser },
    { name: 'Transfer Funds', icon: transferFunds }
]

const NavigationMenu = ({ activeItem, setActiveItem }: NavigationMenuProps) => {

    useEffect(() => {
        console.log(activeItem)
    }, [activeItem])

    return (
        <div className='bg-white border-r-[1px] border-gray-100 flex flex-col px-12 py-4 gap-6 justify-center'>
            {menuIcons.map((item, id) => {
                return <span onClick={() => {
                    setActiveItem(item.name)
                }} key={id} className={`flex gap-2 px-4 py-2 rounded-sm hover:bg-blue-200 cursor-pointer ${activeItem === item.name && 'bg-blue-400 rounded-sm'}`}>
                    <Image src={item.icon} width={25} alt='' />
                    <button>{item.name}</button>
                </span>
            })}
        </div>
    )
}

export default NavigationMenu