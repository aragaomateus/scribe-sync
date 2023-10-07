import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Register.css'; // Import the CSS file

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    topicsOfInterest: topics
                })
            });
    
            const data = await response.json();
            if (response.status === 400) {
                alert(data);
            } else {
                alert('Registered successfully! Please login.');
                // Redirect to login page
                navigate('/feed')
            }
        } catch (error) {
            console.error("There was an error registering the user", error);
        }
    };
    

    return (
        <div className="register-container">
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
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Register;
