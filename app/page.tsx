'use client'

import CreateAccount from "./components/CreateAccount";
import NavigationMenu from "./components/NavigationMenu";
import GetBalance from "./components/GetBalance";
import FetchTransferHistory from "./components/FetchTransferHistory";
import FetchAllUsers from "./components/FetchAllUsers";
import FetchUser from "./components/FetchUser";
import TransferFunds from "./components/TransferFunds";

import { menuIcons } from "./components/NavigationMenu";
import { useState, useEffect } from "react";





export default function Home() {


  const components = [
    { name: 'Create Account', component: CreateAccount },
    { name: 'Get Balance', component: GetBalance },
    { name: 'Fetch Transfer History', component: FetchTransferHistory },
    { name: 'Fetch All Users', component: FetchAllUsers },
    { name: 'Fetch User', component: FetchUser },
    { name: 'Transfer Funds', component: TransferFunds }
  ]



  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    console.log(menuIcons)
    console.log(activeItem)


  }, [])

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className=" flex">
        <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem}></NavigationMenu>
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
  );
}
