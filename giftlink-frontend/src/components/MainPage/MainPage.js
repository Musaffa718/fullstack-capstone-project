import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import './MainPage.css';

function formatDate(timestamp) {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch gifts');
                }
                const data = await response.json();
                setGifts(data);
            } catch (e) {
                setError('Could not load gifts. Please try again later.');
            }
        };
        fetchGifts();
    }, []);

    const goToDetails = (giftId) => {
        navigate(`/app/details/${giftId}`);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Available Gifts</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row g-4">
                {gifts.map((gift) => (
                    <div className="col-md-4" key={gift.id || gift._id}>
                        <div
                            className="card gift-card h-100"
                            onClick={() => goToDetails(gift.id || gift._id)}
                            role="button"
                        >
                            {gift.image ? (
                                <img src={gift.image} className="card-img-top" alt={gift.name} />
                            ) : (
                                <div className="card-img-placeholder">No Image</div>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{gift.name}</h5>
                                <p className="card-text text-muted">{formatDate(gift.date_added)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {gifts.length === 0 && !error && <p>No gifts available yet.</p>}
        </div>
    );
}

export default MainPage;
