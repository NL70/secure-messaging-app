'use server'

import prisma from '../../utils/prisma.mjs'
import argon2 from 'argon2';
import type { NextApiRequest, NextApiResponse } from 'next'


type UserData = {
    usernameOrEmail: string;
    password: string;
  };


export async function authenticate(input: UserData) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: input.usernameOrEmail },
                { email: input.usernameOrEmail }
            ],
        },
    });
    if (user == null) return false;
    const hashedPassword = await argon2.hash(input.password.concat(user.salt))
    return hashedPassword === user.password
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.status(200).json({ message: 'Hello from Next.js!' })
  }