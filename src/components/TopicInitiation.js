import React, { useState } from 'react';
import styles from '../styles/TopicInitiation.module.css';

function TopicInitiation() {
    const [topic, setTopic] = useState('');
    const [overview, setOverview] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        const newPaper = {
            topic,
            overview,
            content,
            contributions: [],
            discussions: []
        };

        try {
            const response = await fetch('http://localhost:4000/api/papers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPaper)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Research paper successfully initiated!');
                setTopic('');
                setOverview('');
                setContent('');
            } else {
                alert('Error initiating research paper: ' + data.message);
            }
        } catch (error) {
            console.error("Error initiating research paper:", error);
        }
    };

    return (
        <div>
            <h2 className={styles.h2}>Start a New Research Paper</h2>
            <input 
                type="text" 
                placeholder="Topic" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
            />
            <textarea 
                placeholder="Brief Overview" 
                value={overview} 
                onChange={(e) => setOverview(e.target.value)} 
            />
            <textarea 
                className={styles.textarea}
                placeholder="Initial Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
            />
            <button className={styles.button} onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TopicInitiation;
