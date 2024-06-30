import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from "next/headers";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const allCookies = cookies().getAll()
    if (allCookies.length == 0) return NextResponse.redirect(new URL('/login', request.url))

    const token = allCookies[0].value 
    
    const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        headers: {
            'Token': `${token}`, // Assuming you want to use the token here
        },

    })
    const data = await response.json()
    if (data.status !== 200) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
}

export const config = {
  matcher: '/',
}