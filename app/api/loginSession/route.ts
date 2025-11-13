import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
    try {

        const { email, password } = await req.json()


        const lookupUser = await prisma.customer.findFirst({
            where: { email }
        })


        if (!lookupUser) {

            return NextResponse.json({ success: false, message: 'Invalid Credentials' }, { status: 404 })

        }

        const validatePassword = await bcrypt.compare(password, lookupUser.password)
        if (!validatePassword) {
            return NextResponse.json({ success: false, message: 'Invalid Password' }, { status: 400 })
        }



        const response = NextResponse.json({ success: true, message: 'Login Successful!' }, { status: 200 })
        response.cookies.set('session', 'logged_in', { //1st argument is the name of the cookie session, 2nd argument is the value of the cookie.
            httpOnly: true, // The cookie can’t be accessed by JavaScript in the browser. This protects against XSS (cross-site scripting) attacks.
            path: '/', // Defines the URL path for which the cookies is valid. '/' means it's valid for your enite website.
            maxAge: 60 * 60 * 24, // The cookies will expire in 24 hours. After that, the browser deletes it automatically.
            sameSite: 'lax', // This means if a user visits the site via an external link they won't be logged in, only will be logged in if they visit site directly.
            secure: false
        })


        return response;



    } catch (error) {
        console.error('Login error', error)
        return NextResponse.json({ success: false, error: 'Failed to login' }, { status: 400 })
    }
}