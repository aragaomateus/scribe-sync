import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            // Check if the response has a JSON content type
            if (response.headers.get("content-type")?.includes("application/json")) {
                const data = await response.json();
                console.log(data);
    
                if (response.status !== 200) {
                    alert(data.message);
                } else {
                    alert(data.message);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/feed');
                    window.dispatchEvent(new Event('storage')); // Force a storage event
                }
            } else {
                // If not JSON, get the response as text
                const text = await response.text();
                console.error("Unexpected server response:", text);
                alert("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("There was an error logging in:", error);
            alert("An error occurred while logging in. Please check the console for details.");
        }
    };
    
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;
