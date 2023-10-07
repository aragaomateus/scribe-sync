import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PaperDetail() {
    const { id } = useParams();
    const [paper, setPaper] = useState(null);

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/papers/${id}`); // Replace with your backend endpoint
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
        <div>
            <h2>{paper.author}</h2>
            <img src={paper.imageUrl} alt="Random" />
            <p>Summary: {paper.summary}</p>
            <p>Topics: {paper.topics.join(', ')}</p>
            <p>Contributions: {paper.contributions}</p>
            {/* Add other features and details here */}
            <button>Contribute</button>
        </div>
    );
}

export default PaperDetail;
