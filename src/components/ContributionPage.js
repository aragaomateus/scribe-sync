import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/ContributionPage.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';



function ContributionPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('Loading...');
    const [originalAuthor, setOriginalAuthor] = useState('Loading...');
    const paperId = params.id;
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const userId = userData.id;

    function NotificationItem({ notification }) {
        const navigate = useNavigate();
    
        const handleClick = () => {
            if (notification.type === 'contributionRequest') {
                navigate(`/contribution/${notification.contributionId}`);
            } else if (notification.type === 'contributionOutcome') {
                navigate(`/papers/${notification.paperId}`);
            }
        };
    
        return (
            <li onClick={handleClick}>
                {notification.message}
            </li>
        );
    }

    
    useEffect(() => {
        if (!paperId) {
            console.error("paperId is undefined");
            return;
        }
        async function fetchPaperDetails() {
            try {
                const response = await fetch(`http://localhost:4000/papers/${paperId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setContent(data.content || 'No content available.');
                setOriginalAuthor(data.author_name || 'Unknown Author');
            } catch (error) {
                console.error("Error fetching paper details:", error);
                setContent('Failed to load content.');
                setOriginalAuthor('Unknown Author');
            }
        }
        fetchPaperDetails();
    }, [paperId]);

    const submitChanges = async () => {
        try {
            const response = await fetch(`http://localhost:4000/papers/${paperId}/contributions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    content
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Contribution submitted successfully!');
                navigate('/feed');
            } else {
                alert('Error submitting contribution: ' + data.message);
            }
        } catch (error) {
            console.error("Error submitting contribution:", error);
        }
    };
    

    return (
        <div className="contribution-container">
            <h2>Contribute to {originalAuthor}'s Paper</h2>
            <ReactQuill value={content} onChange={setContent} />
            <button onClick={submitChanges}>Submit Changes</button>
        </div>
    );
}

export default ContributionPage;
