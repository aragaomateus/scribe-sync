import React from 'react';
import {database} from './db.js';
import { useParams } from 'react-router-dom';

function PaperDetail() {
    const { id } = useParams();
    const paper = database.papers.find(p => p.id === parseInt(id));
    console.log("ID from URL:", id);
    console.log("Fetched paper:", paper);


    if (!paper) {
        return <div>Paper not found.</div>;
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
