import React, { useState } from 'react';
import { DataContext } from './DataContext';
import '../styles/MainPage.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { database } from './db';


function MainPage() {
        // Sample paper data, you can replace this with your actual data
        const navigate = useNavigate();
        const [searchTerm, setSearchTerm] = useState('');
        const { users, papers } = database;

        const filteredPapers = papers.filter(paper => 
        paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    );


        // const papers = [
        //     {
        //         id: 3,
        //         author: 'Alice Johnson',
        //         summary: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        //         topics: ['History', 'Culture'],
        //         contributions: 3,
        //         imageUrl: 'https://picsum.photos/200/305'

        //     },
        //     {
        //         id: 4,
        //         author: 'Bob Williams',
        //         summary: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        //         topics: ['Biology', 'Medicine'],
        //         contributions: 7,
        //         imageUrl: 'https://picsum.photos/200/304'

        //     },
        //     {
        //         id: 1,
        //         author: 'John Doe',
        //         summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        //         topics: ['Science', 'Technology'],
        //         contributions: 5,
        //         imageUrl: 'https://picsum.photos/200/303'

        //     },
        //     {
        //         id: 2,
        //         author: 'Jane Smith',
        //         summary: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        //         topics: ['Art', 'Design'],
        //         contributions: 8,
        //         imageUrl: 'https://picsum.photos/200/302'

        //     },
        //     // Add more paper data as needed]
        //     {
        //         id: 5,
        //         author: 'Charlie Brown',
        //         summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper placerat turpis at dapibus.',
        //         topics: ['Physics', 'Astronomy'],
        //         contributions: 4,
        //         imageUrl: 'https://picsum.photos/200/300'
        //     },
        //     {
        //         id: 6,
        //         author: 'Diana Prince',
        //         summary: 'Nullam scelerisque, quam vitae ullamcorper malesuada, enim est ornare nisi, nec consectetur massa dui id lorem. Duis a purus facilisis, mollis tellus vitae, blandit augue.',
        //         topics: ['Mythology', 'Culture'],
        //         contributions: 2,
        //         imageUrl: 'https://picsum.photos/200/300'
        //     },
        // ];

        const handleContributionProposal = (paperId) => {
            // Replace this with your actual logic for handling contribution proposals
            // For now, we'll just display an alert message
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
            {/* You can add more filters or options here */}
        </div>
                <div className="papersContainer">
                    {filteredPapers.map((paper) => (
                        <div key={paper.id} className="paper-card">
                            <Link to={`/feed/paper/${paper.id}`}> {/* Link to the paper's dedicated page */}
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
    };

export default MainPage;
