import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-body">
            <div className="landing-pseudo" />
            <div className="landing-content text-center text-white">
                <h1 className="display-4 fw-bold">Welcome to GiftLink</h1>
                <h2 className="h4 mb-4">Give new life to items you no longer need</h2>
                <p className="lead">
                    "We make a living by what we get, but we make a life by what we give." — Winston Churchill
                </p>
                <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/app')}>
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
