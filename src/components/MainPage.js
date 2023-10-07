import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await fetch('http://localhost:4000/papers'); // Replace with your backend endpoint
                const data = await response.json();
                setPapers(data);
            } catch (error) {
                console.error("Error fetching papers:", error);
            }
        };

        fetchPapers();
    }, []);

    const filteredPapers = papers.filter(paper => 
        paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleContributionProposal = (paperId) => {
        alert(`Contribution Proposal for Paper ID ${paperId}`);
        navigate('/contribute');
    };

    return (
        <div className="mainPage">
            <div className="searchBar">
                <input 
                    type="text" 
                    placeholder="Search by author or topic..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            <div className="papersContainer">
                {filteredPapers.map((paper) => (
                    <div key={paper.id} className="paper-card">
                        <Link to={`/feed/paper/${paper._id}`}>
                            <img src={paper.imageUrl} alt="Random" />
                            <h3>Author: {paper.author}</h3>
                            <p>Summary: {paper.summary}</p>
                            <p>Topics: {paper.topics.join(', ')}</p>
                            <p>Contributions: {paper.contributions}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
