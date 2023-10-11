import React, { useState} from 'react';
import '../styles/common.css';

function ContributionProposal({ paperId }) {
    const [contribution, setContribution] = useState('');
    const [papers, setPapers] = useState([]);
    const handleSubmit = () => {
        const updatedPapers = papers.map(paper => {
            if (paper.id === paperId) {
                paper.contributions.push({
                    id: Date.now(),
                    content: contribution
                });
            }
            return paper;
        });
        setPapers(updatedPapers);
        setContribution('');
    };

    return (
        <div>
            <h3>Propose a Contribution</h3>
            <textarea 
                placeholder="Your contribution..." 
                value={contribution} 
                onChange={(e) => setContribution(e.target.value)} 
            />
            <button onClick={handleSubmit}>Submit Contribution</button>
        </div>
    );
}

export default ContributionProposal;
