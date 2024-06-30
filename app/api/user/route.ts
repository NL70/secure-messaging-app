"use server"

import prisma from '../../utils/prisma.mjs'
import crypto from 'crypto';
import argon2 from 'argon2';
import { NextRequest, NextResponse } from "next/server";

type UserData = {
    username: string;
    email: string;
    password: string;
  };

async function createUser(user: UserData) {
    const hashedPassword = await argon2.hash(user.password)
    await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
      }
    });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const user = {
      email: body.email,
      username: body.username,
      password: body.password
    }
    await createUser(user);
    return NextResponse.json({ status: 201 })
  } catch (error) {
    return NextResponse.json({ status: 400, message: error })
  }
}



