import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";



export async function POST(req: NextRequest) {

    try {
        const { fromAccountNumber, toAccountNumber, amount } = await req.json()
        if (!fromAccountNumber || !toAccountNumber || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const fromAccount = await prisma.account.findUnique({
            where: {
                accountNumber: fromAccountNumber
            }
        })
        if (!fromAccount) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 })
        }

        const toAccount = await prisma.account.findUnique({
            where: {
                accountNumber: toAccountNumber
            }
        })
        if (!toAccount) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 })
        }

        const sender = await prisma.account.update({
            where: { accountNumber: fromAccountNumber },
            data: { balance: fromAccount.balance - amount }
        })
        if (sender.balance < amount) {
            return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 })
        }

        const receiver = await prisma.account.update({
            where: { accountNumber: toAccountNumber },
            data: { balance: toAccount.balance + amount }
        })
        if (!receiver) {
            await prisma.account.update({
                where: { accountNumber: fromAccountNumber },
                data: { balance: fromAccount.balance + amount }
            })
            return NextResponse.json({ error: 'Money did not go through' }, { status: 400 })
        }

        const transfer = await prisma.transfer.create({
            data: {
                fromAccountId: fromAccount.id,
                toAccountId: toAccount.id,
                amount,
            },
            include: {
                fromAccount: {
                    select: {
                        customer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                phone: true
                            }
                        }
                    }
                },
                toAccount: {
                    select: {
                        customer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                phone: true
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json({ success: true, sender, receiver, transfer }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'Transaction failed' }, { status: 400 })
    }
}