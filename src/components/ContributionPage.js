import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/ContributionPage.css';
import { useParams } from 'react-router-dom'; // Import useParams

function ContributionPage() {
    const params= useParams(); // Extract paperId from route parameters
    const [content, setContent] = useState('Loading...');
    const [originalAuthor, setOriginalAuthor] = useState('Loading...');
    const paperId =params.id;

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
        // TODO: Implement logic to submit changes to the backend
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
