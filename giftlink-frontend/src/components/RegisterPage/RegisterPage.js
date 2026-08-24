import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './RegisterPage.css';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || 'Registration failed. Please try again.');
                return;
            }

            sessionStorage.setItem('bearer-token', data.authtoken);
            sessionStorage.setItem('name', data.firstName);
            sessionStorage.setItem('email', data.email);

            setUserName(data.firstName);
            setIsLoggedIn(true);
            navigate('/app');
        } catch (e) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container register-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Register</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
