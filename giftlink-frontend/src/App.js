import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './components/MainPage/MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
    return (
        <AppProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/app" element={<MainPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/app/details/:giftId" element={<DetailsPage />} />
                    <Route path="/app/search" element={<SearchPage />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;
