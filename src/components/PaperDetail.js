import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PaperDetail.css';

function PaperDetail() {
    const { id } = useParams();
    const [paper, setPaper] = useState(null);

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

    return (
        <div className="paper-detail-container">
            <h2 className="paper-title">{paper.title}</h2>
            <div className="paper-content">
                <p>Summary: {paper.summary}</p>
                <p>Topics: {paper.topics.join(', ')}</p>
                <p>Contributions: {paper.contributions}</p>
            </div>
            <img className="paper-image" src={paper.imageUrl} alt="Paper Visual" />
            <p className="paper-author">Started by {paper.author}</p>
            <button className="contribute-button">Contribute</button>
        </div>
    );
}

export default PaperDetail;
