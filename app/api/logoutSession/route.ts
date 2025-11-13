import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST() {
    try {

        const cookieClear = await cookies()

        cookieClear.delete('session')

        return NextResponse.json({ success: true, message: 'Successful logout' }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: 'Logout un-successful' }, { status: 400 })
    }
}