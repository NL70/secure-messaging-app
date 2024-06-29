import "./page.css"

export default function Home() {
  return (
    <section>
        <div>
            <div className="greeting-section">
                <h1>Welcome back</h1>
                <p>Sign in to your account</p>
            </div>
            <div className="credential-field">
                <div className="input-container">
                    <label>Username or email</label>
                    <input placeholder="Enter username or email"/>
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" placeholder="•••••••••••••••"/>
                </div>
            </div>
            <button className="primary-button">Sign In</button>
        </div>
        
    </section>   
  );
}
