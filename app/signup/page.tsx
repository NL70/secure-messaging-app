"use client"

import "./page.css"
import { useFormStatus } from 'react-dom'
import { useState } from "react";
import { useRouter } from 'next/navigation'

function LoginButton() {
    const { pending } = useFormStatus()

    const handleClick = (event) => {
        if (pending) {
        event.preventDefault()
        }
    }

    return (
        <button aria-disabled={pending} type="submit" className="primary-button" onClick={handleClick}>
        Sign up
        </button>
    )
}

export default function Home() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        const user = {
            email: email,
            username: username,
            password: password
        };
        
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status == 400) {
            setErrorMessage("Failed to add user. Code: ".concat(data.error.code))
        } else {
            router.push('/')
        }
        console.log(data)        
    }

    return (
        <section>
            <div>
                <div className="greeting-section">
                    <h1>Get started</h1>
                    <p>Create an account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="credential-field">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required aria-required/>
                        </div>
                        <div className="input-container">
                            <label>Username</label>
                            <input placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} required aria-required/>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="•••••••••••••••"required aria-required/>
                        </div>
                    </div>
                    <LoginButton/>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
                
            </div>
            
        </section>   
  );
}
