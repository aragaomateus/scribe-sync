import React, { useState } from 'react';
import styles from '../styles/TopicInitiation.css';
import '../styles/common.css';

function TopicInitiation() {
    const [title, setTitle] = useState('');
    const [topics, setTopics] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');

    const userData = JSON.parse(localStorage.getItem('user')) || {}; // Get user data from local storage and provide a default empty object
    const userId = userData.id;
    const userName = userData.name;

    const handleSubmit = async () => {
        if (!userId) {
            alert('Please log in to initiate a topic.');
            return;
        }        

        const topicsArray = topics.split(',').map(topic => topic.trim());

        const newPaper = {
            title,
            author_id: userId,
            author_name: userName,
            summary,
            topics:topicsArray,
            content,
            contributions:[],
            imageUrl: 'https://picsum.photos/seed/picsum/200/300',
        };

        try {
            const response = await fetch('http://localhost:4000/papers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPaper)
            });

            console.log("Sending paper data:", newPaper);

            const data = await response.json();
            if (response.ok) {
                alert('Research paper successfully initiated!');
                setTitle('');
                setTopics('');
                setSummary('');
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
            <h2 className={styles.h2}>Start a New Scribe by {userName}</h2>
            <textarea 
                type="title" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
                type="text" 
                placeholder="Topic1, Topic2, Topic3...." 
                value={topics} 
                onChange={(e) => setTopics(e.target.value)} 
            />
            <textarea 
                placeholder="Brief Overview" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
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
