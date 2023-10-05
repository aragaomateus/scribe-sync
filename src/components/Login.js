import React, { useState } from 'react';
import { database } from './db'; // Adjust the path based on your directory structure
import { useNavigate } from 'react-router';

function Login() {

    const users = database.users; // Access the users array from the database object
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = users.find(u => u.email === email);

        if (!user) {
            alert('Email not found. Please register.');
            return;
        }

        if (user.password !== password) { // In a real-world scenario, compare hashed passwords
            alert('Incorrect password. Please try again.');
            return;
        }

        alert('Logged in successfully!');
        navigate('/feed');
        // Authenticate the user and redirect to the main feed page
    };

    return (
        <div>
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
