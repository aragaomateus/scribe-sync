import React from 'react';
import '../styles/Profile.css';
import '../styles/common.css';

function Profile() {
    const user = JSON.parse(localStorage.getItem('user')); // Get user details from local storage

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container">
            <h2>{user.name}'s Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Topics of Interest:</strong> {user.topicsOfInterest.join(', ')}</p>
            {/* You can add more user details here */}
        </div>
    );
}

export default Profile;
