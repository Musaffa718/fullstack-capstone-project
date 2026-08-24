import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import './DetailsPage.css';

function DetailsPage() {
    const { giftId } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const bearerToken = sessionStorage.getItem('bearer-token');
        if (!bearerToken) {
            navigate('/login');
            return;
        }

        window.scrollTo(0, 0);

        const fetchDetails = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${giftId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch gift details');
                }
                const data = await response.json();
                setGift(data);
            } catch (e) {
                setError('Could not load this gift right now. Please try again later.');
            }
        };

        fetchDetails();
    }, [giftId, navigate]);

    const goBack = () => navigate(-1);

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-secondary" onClick={goBack}>Back</button>
            </div>
        );
    }

    if (!gift) {
        return <div className="container py-4">Loading...</div>;
    }

    return (
        <div className="container py-4">
            <button className="btn btn-link mb-3" onClick={goBack}>&larr; Back</button>
            <div className="card details-card">
                <div className="card-header details-header">
                    <h3 className="details-title mb-0">{gift.name}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-5">
                            {gift.image ? (
                                <img src={gift.image} alt={gift.name} className="img-fluid details-image" />
                            ) : (
                                <div className="details-image-placeholder">No Image Available</div>
                            )}
                        </div>
                        <div className="col-md-7">
                            <p><strong>Category:</strong> {gift.category}</p>
                            <p><strong>Condition:</strong> {gift.condition}</p>
                            <p><strong>Description:</strong> {gift.description}</p>
                        </div>
                    </div>
                    <hr />
                    <h5>Comments</h5>
                    {gift.comments && gift.comments.length > 0 ? (
                        <ul className="comments-list">
                            {gift.comments.map((c, idx) => (
                                <li key={idx} className="comment-item">
                                    <strong>{c.user}: </strong>{c.text}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
