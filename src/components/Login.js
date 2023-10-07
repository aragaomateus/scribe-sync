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
            console.log(response.headers)
    
            const data = await response.json();
            console.log(data)
            if (response.status === 400) {
                alert(data);
            } 
            alert('Logged in successfully!');
            navigate('/feed')
        } catch (error) {
            console.error("There was an error logging in", error);
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
