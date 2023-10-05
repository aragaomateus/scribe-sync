import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext';
import styles from '../styles/TopicInitiation.module.css';

function TopicInitiation() {
    const [topic, setTopic] = useState('');
    const [overview, setOverview] = useState('');
    const [content, setContent] = useState('');

    const [papers, setPapers] = useContext(DataContext);

    const handleSubmit = () => {
        const newPaper = {
            id: Date.now(),
            topic,
            overview,
            content,
            contributions: [],
            discussions: []
        };
        setPapers([...papers, newPaper]);
        setTopic('');
        setOverview('');
        setContent('');
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
            <button className={styles} onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TopicInitiation;
