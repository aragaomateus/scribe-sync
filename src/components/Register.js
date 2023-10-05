import React, { useState } from 'react';
import {database} from './db'; // Adjust the path based on your directory structure

function Register() {
    const [users, setUsers] = useState(database.users);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [topics, setTopics] = useState([]);

    const handleRegister = () => {
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('Email already exists. Please login.');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // In a real-world scenario, hash the password
            topicsOfInterest: topics
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        alert('Registered successfully! Please login.');
        // Redirect to login page (using react-router's navigate function or another method)
    };

    return (
        <div>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
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
            <input 
                type="text" 
                placeholder="Topics of Interest (comma separated)" 
                value={topics} 
                onChange={(e) => setTopics(e.target.value.split(','))} 
            />
            {/* You can also use multi-select or checkboxes for topics of interest */}
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Register;
