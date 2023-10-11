import React from 'react';
import TopicInitiation from './components/TopicInitiation';
import ContributionProposal from './components/ContributionProposal';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import PaperDetail from './components/PaperDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './components/Profile'
import './App.css';

function App() {
    return (
            <Router>
    <NavBar />
    <Routes>
        <Route path="/initiate" element={<TopicInitiation />} />
        <Route path="/contribute" element={<ContributionProposal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<MainPage />} />
        <Route path="/feed/paper/:id" element={<PaperDetail />} />
        <Route path="/profile" element={<Profile />} />



        {/* ... other routes */}
    </Routes>
</Router>
    );
}

export default App;


