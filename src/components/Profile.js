import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import '../styles/common.css';
import { useNavigate } from 'react-router';

function Profile() {
    const [papers, setPapers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Get user details from local storage

    function NotificationItem({ notification }) {
        const navigate = useNavigate();
        
        const handleClick = () => {
            if (notification.type === 'contributionRequest') {
                navigate(`/contribution/${notification.contributionId}`);
            } else if (notification.type === 'contributionOutcome') {
                navigate(`/papers/${notification.paperId}`);
            }
        };
        
        return (
            <li onClick={handleClick}>
                {notification.message}
            </li>
        );
    }

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch(`http://localhost:4000/notifications/${user.id}`);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
        fetchNotifications();

        if (user && user.id) {
            fetch(`http://localhost:4000/papers/createdBy/${user.id}`)
                .then(response => response.json())
                .then(data => setPapers(data))
                .catch(error => console.error("Error fetching user's papers:", error));
        }
    }, [user]);

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }
    return (
        <div className="profile-container">
            <h2>{user.name}'s Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Topics of Interest:</strong> {user.topicsOfInterest.join(', ')}</p>
            
            <div className="notifications-section">
                <h3>Your Notifications</h3>
                <ul>
                    {notifications.map(notification => (
                        <NotificationItem key={notification._id} notification={notification} />
                    ))}
                </ul>
            </div>

            <h3>Your Papers</h3>
            {papers.map(paper => (
                <div key={paper.id} className="paper-box">
                    <img className="paper-image" src={paper.imageUrl} alt="Paper Visual" />
                    <div className="paper-details">
                        <div className="paper-title">{paper.title}</div>
                        <div><strong>Topics:</strong> {paper.topics.join(', ')}</div>    
                        <div className="summary">{`"${paper.summary}"`}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Profile;
