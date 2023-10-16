import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/common.css';

function MainPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [papers, setPapers] = useState([]);

    const [selectedTopic, setSelectedTopic] = useState(null); // State to track the selected topic

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

    const uniqueTopics = [...new Set(papers.flatMap(paper => paper.topics))]; // Get unique topics

    let filteredPapers = papers;

    // Filter by search term
    if (searchTerm) {
        filteredPapers = filteredPapers.filter(paper => 
            paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    // Filter by selected topic
    if (selectedTopic) {
        filteredPapers = filteredPapers.filter(paper => 
            paper.topics.includes(selectedTopic)
        );
    }

    // const handleContributionProposal = (paperId) => {
    //     alert(`Contribution Proposal for Paper ID ${paperId}`);
    //     navigate('/contribute');
    // };

    return (
        <div className="mainPage">
            <div className="searchBar">
                <input 
                    type="text" 
                    placeholder="Search by author or topic..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <div className="topicsContainer">
                    {uniqueTopics.map(topic => (
                        <button 
                            key={topic} 
                            className={`topicTag ${selectedTopic === topic ? 'selected' : ''}`} 
                            onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>
            <div className="papersContainer">
                {filteredPapers.map((paper) => (
                    <div key={paper.id} className="paper-card">
                        <Link to={`/feed/paper/${paper._id}`}>
                            <img src={paper.imageUrl} alt="Random" />
                            <h3>Author: {paper.author_name}</h3>
                            <p>Summary: {paper.summary}</p>
                            <p>Topics: {paper.topics.join(', ')}</p>
                            <p>Contributions: {paper.contributions.length}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
