import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([
      {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedPassword123",
        topicsOfInterest: ["Machine Learning", "Quantum Physics"],
        contributions: ["contribution1", "contribution2"],
        papers: ["paper1"]
      },
      // ... other users
    ]);

    const [papers, setPapers] = useState([
      {
        id: "paper1",
        title: "Quantum Computing Basics",
        content: "Content of the paper...",
        author: "user1",
        contributors: ["user2", "user3"],
        // ... other paper details
      },
      // ... other papers
    ]);

    const [contributions, setContributions] = useState([
      {
        id: "contribution1",
        content: "Contribution content...",
        author: "user2",
        paper: "paper1",
        // ... other contribution details
      },
      // ... other contributions
    ]);

    return (
        <DataContext.Provider value={{ users, setUsers, papers, setPapers, contributions, setContributions }}>
            {children}
        </DataContext.Provider>
    );
};

