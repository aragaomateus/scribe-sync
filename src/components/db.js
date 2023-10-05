// db.js
export const database = {
  users: [
      // Sample users
      {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: "password123", // Note: Never store plain-text passwords in a real application
          topicsOfInterest: ["science", "technology"]
      },
      // ... other users
  ],
  // ... other data structures you might need
  papers: [
    // Sample papers
    {
      id: 3,
      author: 'Alice Johnson',
      summary: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      topics: ['History', 'Culture'],
      contributions: 3,
      imageUrl: 'https://picsum.photos/200/305'

  },
  {
      id: 4,
      author: 'Bob Williams',
      summary: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      topics: ['Biology', 'Medicine'],
      contributions: 7,
      imageUrl: 'https://picsum.photos/200/304'

  },
  {
      id: 1,
      author: 'John Doe',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      topics: ['Science', 'Technology'],
      contributions: 5,
      imageUrl: 'https://picsum.photos/200/303'

  },
  {
      id: 2,
      author: 'Jane Smith',
      summary: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      topics: ['Art', 'Design'],
      contributions: 8,
      imageUrl: 'https://picsum.photos/200/302'

  },
  // Add more paper data as needed]
  {
      id: 5,
      author: 'Charlie Brown',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper placerat turpis at dapibus.',
      topics: ['Physics', 'Astronomy'],
      contributions: 4,
      imageUrl: 'https://picsum.photos/200/300'
  },
  {
      id: 6,
      author: 'Diana Prince',
      summary: 'Nullam scelerisque, quam vitae ullamcorper malesuada, enim est ornare nisi, nec consectetur massa dui id lorem. Duis a purus facilisis, mollis tellus vitae, blandit augue.',
      topics: ['Mythology', 'Culture'],
      contributions: 2,
      imageUrl: 'https://picsum.photos/200/300'
  }
    // ... more sample papers
]
};
