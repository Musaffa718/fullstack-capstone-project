import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import './SearchPage.css';

const categories = ['Toys', 'Furniture', 'Sports', 'Books', 'Electronics', 'Other'];
const conditions = ['New', 'Like New', 'Good', 'Fair'];

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [ageRange, setAgeRange] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append('name', searchQuery);
            if (category) params.append('category', category);
            if (condition) params.append('condition', condition);
            if (ageRange) params.append('age_years', ageRange);

            const response = await fetch(`${urlConfig.backendUrl}/api/search?${params.toString()}`);
            const data = await response.json();
            setSearchResults(data);
            setSearched(true);
        } catch (e) {
            setSearchResults([]);
            setSearched(true);
        }
    };

    const goToDetails = (giftId) => {
        navigate(`/app/details/${giftId}`);
    };

    return (
        <div className="container search-page py-4">
            <h2 className="mb-4">Search Gifts</h2>

            <div className="row g-3 align-items-end mb-4 search-controls">
                <div className="col-md-4">
                    <label className="form-label">Search</label>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Any</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Condition</label>
                    <select className="form-select" value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="">Any</option>
                        {conditions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100 search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label className="form-label">Max Age (years): {ageRange}</label>
                <input
                    type="range"
                    className="form-range age-slider"
                    min="0"
                    max="20"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                />
            </div>

            <div className="row g-4">
                {searchResults.map((gift) => (
                    <div className="col-md-4" key={gift.id || gift._id}>
                        <div
                            className="card result-card h-100"
                            role="button"
                            onClick={() => goToDetails(gift.id || gift._id)}
                        >
                            {gift.image ? (
                                <img src={gift.image} className="card-img-top" alt={gift.name} />
                            ) : (
                                <div className="card-img-placeholder">No Image</div>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{gift.name}</h5>
                                <p className="card-text text-muted">{gift.category} &middot; {gift.condition}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {searched && searchResults.length === 0 && (
                <div className="alert alert-warning no-results-alert mt-3">
                    No products found matching your search criteria.
                </div>
            )}
        </div>
    );
}

export default SearchPage;
