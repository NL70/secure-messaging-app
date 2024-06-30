import { NextRequest, NextResponse } from "next/server";
import prisma from '../../utils/prisma.mjs'
import crypto from 'crypto';
import argon2 from 'argon2';
import { User } from "@prisma/client";
import { cookies } from "next/headers";


type UserData = {
    usernameOrEmail: string;
    password: string;
  };


async function generateSessionToken(user: User) {
    const currentTime = new Date(); // Get the current time as a Date object
    const sessionLength = 30 * 24 * 60 * 60 * 1000; // 30 minutes in milliseconds
    const expirationTime = new Date(currentTime.getTime() + sessionLength);
    const token = crypto.randomBytes(16).toString('hex')

    await prisma.sessions.create({
        data: {
            userId: user.id,
            createdAt: currentTime,
            expiresAt: expirationTime,
            token: token
        }
    })
    return token
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const input: UserData = {
        usernameOrEmail: body.usernameOrEmail,
        password: body.password
    }
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: input.usernameOrEmail },
                { email: input.usernameOrEmail }
            ],
        },
    });
    if (user == null) return NextResponse.json({ status: 404 });

    const match = await argon2.verify(user.password, input.password)
    if (!match) return NextResponse.json({ status: 401 });

    const token = await generateSessionToken(user)
    cookies().delete('token')
    cookies().set({
        name: 'token',
        value: token,
        httpOnly: false,
        secure: false, // cahnge this later 
        sameSite: 'lax',
    })

    return NextResponse.json({ status: 200 });

}

export async function GET(req: NextRequest) {
    const token = req.headers.get('token');

    if (!token) return NextResponse.json({status:400})
    const session = await prisma.sessions.findFirst({
        where: {
            token: token
        }
    })
    if (session == null) return NextResponse.json({ status: 401 });

    return NextResponse.json({status: 200, session: session})
}

