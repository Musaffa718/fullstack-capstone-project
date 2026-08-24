import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    useEffect(() => {
        const bearerToken = sessionStorage.getItem('bearer-token');
        if (bearerToken) {
            navigate('/app');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setIncorrect(data.error || 'Invalid email or password.');
                setPassword('');
                return;
            }

            sessionStorage.setItem('bearer-token', data.authtoken);
            sessionStorage.setItem('name', data.userName);
            sessionStorage.setItem('email', data.userEmail);

            setUserName(data.userName);
            setIsLoggedIn(true);
            navigate('/app');
        } catch (e) {
            setIncorrect('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="mb-4">Login</h2>
                    {incorrect && <div className="alert alert-danger">{incorrect}</div>}
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
                    <button className="btn btn-primary w-100" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
