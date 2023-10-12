import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PaperDetail.css';
import '../styles/common.css';

function PaperDetail() {
    const { id } = useParams();
    const [paper, setPaper] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/papers/${id}`);
                const data = await response.json();
                setPaper(data);
            } catch (error) {
                console.error("Error fetching paper details:", error);
            }
        };

        fetchPaperDetails();
    }, [id]);

    if (!paper) {
        return <div>Loading paper details...</div>;
    }

    const handleContributeClick = () => {
        navigate(`/contribute/${id}`);
    };

    return (
        <div className="paper-detail-container">
            <div className="general-info">
                <img className="paper-image" src={paper.imageUrl} alt="Paper Visual" />
                <p className="paper-author">Started by {paper.author_name}</p>
                <div className="paper-summary">
                    <p><strong>Summary:</strong> {paper.summary}</p>
                    <p><strong>Topics:</strong> {paper.topics.join(', ')}</p>
                    <p><strong>Contributions:</strong> {paper.contributions}</p>
                </div>
                <button className="contribute-button" onClick={handleContributeClick}>Contribute</button>
                <button className="back-button" onClick={() => navigate('/feed')}>Back to Feed</button>
            </div>

            <div className="content-section">
                <h2 className="paper-title">{paper.title}</h2>
                <div className="paper-content">
                    <p>{paper.content}</p>
                </div>
            </div>
        </div>
    );
}

export default PaperDetail;
