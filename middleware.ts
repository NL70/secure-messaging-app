import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const isAuthorised = false; //implement logic later
    if (request.nextUrl.pathname == '/' && !isAuthorised) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

