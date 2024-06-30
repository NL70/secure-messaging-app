"use client"

import "./page.css"
import { useFormStatus } from 'react-dom'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

function LoginButton() {
    const { pending } = useFormStatus()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (pending) {
         event.preventDefault()
        }
    }

    return (
        <button aria-disabled={pending} type="submit" className="primary-button" onClick={handleClick}>
        Log In
        </button>
    )
}

export default function Home() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        const user = {
            usernameOrEmail: usernameOrEmail,
            password: password
        };
        
        const response = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status == 404) {
            setErrorMessage("User does not exist")
        } else if (data.status == 401) {
            setErrorMessage("Incorrect credentials")
        } else if (data.status == 200) {
            router.push('/')
            alert("hi")
        }
    }

    return (
        <section>
            <div>
                <div className="greeting-section">
                    <h1>Welcome back</h1>
                    <p>Login to your account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="credential-field">
                        <div className="input-container">
                            <label>Username or Email</label>
                            <input placeholder="Enter username or email" id="username-email-input" onChange={(e) => setUsernameOrEmail(e.target.value)} required aria-required/>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" id="password-input" onChange={(e) => setPassword(e.target.value)} placeholder="•••••••••••••••"required aria-required/>
                        </div>
                    </div>
                    <LoginButton/>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <p>Don't have an account? <Link href="/signup">Sign up now.</Link></p>
                </form>
                
            </div>
            
        </section>   
  );
}
