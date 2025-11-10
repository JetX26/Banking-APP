'use client'

import NavigationMenu from "@/app/ui/NavigationMenu";
import { useState } from "react";

export default function Page() {
    const [activeItem, setActiveItem] = useState('');

    return <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem} />;
}